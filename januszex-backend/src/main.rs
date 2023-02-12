#[macro_use] 
extern crate rocket;

use januszex_backend::GlobalState;
use rocket::routes;
use rocket::fs::FileServer;
use tokio::sync::Mutex;
use januszex_backend::users;

#[launch]
fn rocket() -> _ {
    rocket::build()
        .manage(Mutex::new(GlobalState::new()))
        .mount("/", routes![users::register, users::login, users::profile, users::fail_profile, users::logout, users::fail_logout])
        .mount("/", FileServer::from("./static"))
}
