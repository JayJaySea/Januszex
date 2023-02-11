use diesel::{
    prelude::*,
    sqlite::SqliteConnection,
};
use dotenvy::dotenv;
use std::env;

use crate::{
    users::UserCredentials,
    models::{
        UserNew,
        User
    },
    error::{
        Error,
        ErrorInfo
    }
};

use argon2::{
    password_hash::{
        rand_core::OsRng,
        PasswordHash, PasswordHasher, PasswordVerifier, SaltString
    },
    Argon2
};

pub mod users;
pub mod models;
pub mod schema;
pub mod db;
pub mod error;


pub struct GlobalState {
    pub db_conn: SqliteConnection,
}

impl GlobalState {
    pub fn new() -> Self {
        GlobalState {
            db_conn: Self::establish_db_connection(),
        }
    }

    pub fn establish_db_connection() -> SqliteConnection {
        dotenv().ok();

        let database_url = env::var("DATABASE_URL")
            .expect("DATABASE_URL must be set!");

        SqliteConnection::establish(&database_url)
            .expect("Error connecting to {}")
    }

    fn check_if_user_exists(&mut self, user: &UserNew) -> Result<(), ErrorInfo> {
        use crate::schema::{
            users,
            users::login
        };

        let used: i64 = users::table
            .filter(login.eq(user.login))
            .count()
            .get_result(&mut self.db_conn)
            .map_err(|_| Error::WrongData)?;

        if used >= 1 {
            return Err(Error::UsernameTaken.into())
        }

        Ok(())
    }

    fn insert_user(&mut self, mut user: UserNew) -> Result<User, ErrorInfo> {
        use crate::schema::users;

        let salt = SaltString::generate(&mut OsRng);
        let argon2 = Argon2::default();

        user.password = argon2.hash_password(user.password.as_bytes(), &salt)
            .map_err(|_| Error::WrongData)?
            .to_string();

        diesel::insert_into(users::table)
            .values(user)
            .get_result::<User>(&mut self.db_conn)
            .map_err(|_| Error::WrongData.into())
    }

    fn user_from_credentials(&mut self, credentials: UserCredentials) -> Result<User, ErrorInfo> {
        use crate::schema::{
            users,
            users::login,
        };

        let registered = users::table
            .filter(login.eq(credentials.login))
            .load::<User>(&mut self.db_conn)
            .map_err(|_| Error::WrongData)?;

        if registered.len() == 1 {
            if let Some(hashed_password) = registered[0].password.clone() {
                let parsed_hash = PasswordHash::new(&hashed_password)
                    .map_err(|_| Error::InternalServerError(file!(), line!()))
                    ?;
                if Argon2::default().verify_password(credentials.password.as_bytes(), &parsed_hash).is_ok() {
                    Ok(registered[0].clone())
                }
                else {
                    Err(Error::WrongCredentials.into())
                }
            }
            else {
                Err(Error::WrongCredentials.into())
            }

        }
        else if registered.len() > 1 {
            Err(Error::InternalServerError(file!(), line!()).into())
        }
        else {
            Err(Error::WrongCredentials.into())
        }
    }

    pub fn user_from_id(&mut self, id: i32) -> Result<User, ErrorInfo> {
        use crate::schema::users;

        let user = users::table
            .find(id).first::<User>(&mut self.db_conn)
            .map_err(|_| Error::WrongId)?;

        Ok(user)
    }
}
