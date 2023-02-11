use diesel::prelude::*;
use crate::schema::{
    users,
    roles
};

use chrono::{
    naive::NaiveDateTime,
    Utc,
};

use rocket::serde::{Serialize, Deserialize};


#[derive(Insertable, Deserialize, Default, Clone)]
#[diesel(table_name = users)]
#[serde(crate = "rocket::serde")]
#[serde(default)]
pub struct UserNew<'a> {
    pub name: &'a str,
    pub surname: &'a str,
    pub login: &'a str,
    pub password: String,
    pub drivingLicense: &'a str,
    pub role: i32,
}

#[derive(Queryable, Serialize, Default, Clone)]
#[serde(crate = "rocket::serde")]
pub struct User {
    pub id: i32,
    pub name: String,
    pub surname: String,
    pub login: Option<String>,
    pub password: Option<String>,
    pub license: String,
    pub role: Option<i32>,
}

