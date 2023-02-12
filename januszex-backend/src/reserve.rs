use rocket::{
    State,
    get,
    post,
    serde::json::Json,
    http::{ CookieJar, Cookie},
};

use crate::{
    GlobalState,
    models::{
        ReserveNew,
        Reserve
    },
    error::ErrorInfo,
    users::UserId,
};
use tokio::sync::Mutex;

#[post("/reserve", format = "json", data = "<reserve>")]
pub async fn reserve_logged(
    state: &State<Mutex<GlobalState>>,
    id: UserId,
    reserve: Json<ReserveNew>
) -> Result<Json<Reserve>, Json<ErrorInfo>> {

    let mut reserve = reserve.into_inner();
    reserve.userID = id.0;

    let state = &mut state.lock().await;

    Ok(Json(state.add_reservation(reserve)?))
}

#[post("/reserve", format = "json", rank = 1)]
pub async fn reserve_guest() {

}
