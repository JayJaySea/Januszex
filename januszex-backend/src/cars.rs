use rocket::{
    State,
    get,
    post,
    serde::json::Json,
};

use crate::{
    GlobalState,
    models::{
        Car,
        DamageNew,
        Damage,
        FeedbackNew,
        Feedback
    },
    error::ErrorInfo,
};
use tokio::sync::Mutex;

#[get("/list_cars")]
pub async fn list_cars(state: &State<Mutex<GlobalState>>) -> Result<Json<Vec<Car>>, Json<ErrorInfo>> {
    let state = &mut state.lock().await;
    let cars = state.get_cars_list()?;

    Ok(Json::from(cars))
}

#[post("/report_damage", format = "json", data = "<damage>")]
pub async fn report_damage(state: &State<Mutex<GlobalState>>, damage: Json<DamageNew>) -> Result<Json<Damage>, Json<ErrorInfo>> {
    let state = &mut state.lock().await;
    let damage = state.add_damage_report(damage.into_inner())?;

    Ok(Json(damage))
}

#[post("/give_feedback", format = "json", data = "<feedback>")]
pub async fn give_feedback(state: &State<Mutex<GlobalState>>, feedback: Json<FeedbackNew>) -> Result<Json<Feedback>, Json<ErrorInfo>> {
    let state = &mut state.lock().await;
    let feedback = state.add_feedback(feedback.into_inner())?;

    Ok(Json(feedback))
}
