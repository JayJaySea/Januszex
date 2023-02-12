#[macro_use] 
extern crate rocket;

use rocket::{
    serde::json::Json,
    routes,
    Request
};
use rocket::fs::FileServer;
use tokio::sync::Mutex;
use januszex_backend::{
    error::{
        Error,
        ErrorInfo
    },
    users,
    cars,
    reserve,
    GlobalState,
};

#[launch]
fn rocket() -> _ {
    rocket::build()
        .manage(Mutex::new(GlobalState::new()))
        .mount("/", routes![
            users::register,
            users::login,
            users::profile,
            users::fail_profile,
            users::logout,
            users::fail_logout,

            cars::list_cars,
            cars::give_feedback,
            cars::report_damage,

            reserve::reserve_logged,
            reserve::reserve_guest,
        ])
        .mount("/", FileServer::from("./static"))
        .register("/", catchers![internal_error, not_found, wrong_data])
}

#[catch(500)]
fn internal_error() -> Json<ErrorInfo> {
    Json(Error::InternalServerError(file!(), line!()).into())
}

#[catch(404)]
fn not_found(req: &Request) -> Json<ErrorInfo> {
    Json(Error::NotFound(req.uri().to_string()).into())
}

#[catch(422)]
fn wrong_data() -> Json<ErrorInfo> {
    Json(Error::WrongData.into())
}
