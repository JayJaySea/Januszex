use diesel::{
    prelude::*,
    sqlite::SqliteConnection,
};
use rocket::{
    State,
    get,
    serde::json::Json,
};

use crate::{
    GlobalState,
    models::Car,
    error::ErrorInfo,
};
use tokio::sync::Mutex;

#[get("/list_cars")]
pub async fn list_cars(state: &State<Mutex<GlobalState>>) -> Result<Json<Vec<Car>>, Json<ErrorInfo>> {
    let state = &mut state.lock().await;
    let tasks = state.get_cars_list()?;

    Ok(Json::from(tasks))
}
