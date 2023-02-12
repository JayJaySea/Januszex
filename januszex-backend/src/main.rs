#[macro_use] 
extern crate rocket;

use rocket::routes;
use rocket::fs::FileServer;
use tokio::sync::Mutex;
use januszex_backend::{
    users,
    cars,
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
        ])
        .mount("/", FileServer::from("./static"))
}
