use rocket::{
    State,
    get,
    post,
    serde::json::Json,
};

use crate::{
    AnyId,
    GlobalState,
    users::UserId,
    models::{
        Car,
        DamageNew,
        Damage,
        FeedbackNew,
        Feedback
    },
    error::{
        ErrorInfo,
        Error
    },
};
use tokio::sync::Mutex;

#[get("/list_cars")]
pub async fn list_cars(state: &State<Mutex<GlobalState>>) -> Result<Json<Vec<Car>>, Json<ErrorInfo>> {
    let state = &mut state.lock().await;
    let cars = state.get_cars_list()?;

    Ok(Json::from(cars))
}

#[post("/get_car", format = "json", data = "<car_id>")]
pub async fn get_car(state: &State<Mutex<GlobalState>>, car_id: Json<AnyId>) -> Result<Json<Car>, Json<ErrorInfo>> {
    let state = &mut state.lock().await;
    let cars = state.get_car(car_id.id)?;

    Ok(Json::from(cars))
}

#[get("/reserved_cars")]
pub async fn reserved_cars(state: &State<Mutex<GlobalState>>, user_id: UserId) -> Result<Json<Vec<Car>>, Json<ErrorInfo>> {
    let state = &mut state.lock().await;
    let cars = state.get_reserved_cars(user_id.0)?;

    Ok(Json::from(cars))
}

#[get("/reserved_cars", rank = 1)]
pub async fn fail_reserved_cars() -> Json<ErrorInfo> {
    Json(Error::NotLoggedIn.into())
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
