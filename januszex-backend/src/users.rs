use diesel::{
    prelude::*,
    sqlite::SqliteConnection,
};
use rocket::{
    State,
    get,
    post,
    put,
    delete,
    http::{Status, CookieJar, Cookie},
    serde::{json::Json, Deserialize},
    request::{self, Request, FromRequest},
    outcome::IntoOutcome
};

use crate::{
    GlobalState,
    models::{
        UserNew,
        User
    },
    error::{
        Error,
        ErrorInfo
    }
};
use tokio::sync::Mutex;

#[derive(Debug)]
pub struct UserId (i32);

#[rocket::async_trait]
impl<'r> FromRequest<'r> for UserId {
    type Error = std::convert::Infallible;

    async fn from_request(req: &'r Request<'_>) -> request::Outcome<Self, Self::Error> {
        req.cookies()
            .get_private("id")
            .map(|c| c.value().to_string().parse::<i32>().unwrap())
            .map(UserId)
            .or_forward(())
    }
}

#[derive(Deserialize, Default, Clone)]
#[serde(crate = "rocket::serde")]
#[serde(default)]
pub struct UserCredentials<'a> {
    pub login: &'a str,
    pub password: &'a str,
}

#[post("/register", format = "json", data = "<user>")]
pub async fn register(
    state: &State<Mutex<GlobalState>>,
    cookies: &CookieJar<'_>,
    user: Json<UserNew<'_>>
) -> Result<Json<User>, Json<ErrorInfo>> {

    let user = user.into_inner();
    check_user_data_valid(&user).await?;

    let state = &mut state.lock().await;
    state.check_if_user_exists(&user)?;
    let user = state.insert_user(user)?;
    cookies.add_private(Cookie::new("id", user.id.to_string()));

    Ok(Json::from(user))
}

async fn check_user_data_valid(user: &UserNew<'_>) -> Result<(), ErrorInfo> {
    if  user.name.trim().is_empty() ||
        user.surname.trim().is_empty() ||
        user.login.trim().is_empty() || 
        user.password.trim().is_empty() ||
        user.drivingLicense.trim().is_empty() 
    {
        return Err(Error::MissingCredentials.into());
    };

    Ok(())
}

#[post("/login", format = "json", data = "<credentials>")]
pub async fn login(
    state: &State<Mutex<GlobalState>>,
    cookies: &CookieJar<'_>,
    credentials: Json<UserCredentials<'_>>
) -> Result<Json<User>, Json<ErrorInfo>> {

    let state = &mut state.lock().await;
    let user = state.user_from_credentials(credentials.into_inner())?;

    cookies.add_private(Cookie::new("id", user.id.to_string()));
    Ok(Json::from(user))
}

#[get("/profile")]
pub async fn profile(
    state: &State<Mutex<GlobalState>>,
    id: UserId
) -> Result<Json<User>, Json<ErrorInfo>> {

    let state = &mut state.lock().await;
    let user = state.user_from_id(id.0)?;

    Ok(Json::from(user))
}

#[get("/profile", rank=1)]
pub async fn fail_profile() -> Json<ErrorInfo> {
    Json(Error::NotLoggedIn.into())
}
