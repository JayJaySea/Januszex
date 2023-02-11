#[macro_use] 
extern crate rocket;

use januszex_backend::GlobalState;
use rocket_dyn_templates::{ Template, context};
use rocket::routes;
use rocket::fs::FileServer;
use tokio::sync::Mutex;
use januszex_backend::users;

#[launch]
fn rocket() -> _ {
    rocket::build()
        .manage(Mutex::new(GlobalState::new()))
        .mount("/", routes![index, users::register, users::login, users::profile, users::fail_profile])
        .mount("/public", FileServer::from("./static"))
        .attach(Template::fairing())
}

#[get("/", format = "text/html")]
fn index() -> Template {
    Template::render("index", context! {
        foo: 123,
    })
}
