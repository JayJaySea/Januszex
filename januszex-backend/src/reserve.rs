use rocket::{
    State,
    get,
    put,
    post,
    serde::{Deserialize, 
        json::Json,
    },
    http::{ CookieJar, Cookie},
};

use crate::{
    GlobalState,
    models::{
        ReserveNew,
        ReserveRequest,
        Reserve,
        UserNew,
    },
    error::{
        ErrorInfo,
        Error
    },
    users::UserId,
};
use tokio::sync::Mutex;

#[post("/reserve", format = "json", data = "<reserve>")]
pub async fn reserve_logged(
    state: &State<Mutex<GlobalState>>,
    id: UserId,
    reserve: Json<ReserveRequest>
) -> Result<Json<Reserve>, Json<ErrorInfo>> {

    let reserve = reserve.into_inner();

    let reserve = ReserveNew {
        rentDate: reserve.rentDate,
        returnDate: reserve.returnDate,
        deliveryAddress: reserve.deliveryAddress,
        valid: true,
        carID: reserve.carID,
        userID: id.0
    };

    let state = &mut state.lock().await;

    Ok(Json(state.add_reservation(reserve)?))
}

#[post("/reserve", format = "json", data = "<reserve_info>", rank = 1)]
pub async fn reserve_guest(
    state: &State<Mutex<GlobalState>>,
    reserve_info: Json<ReserveInfo>
    ) -> Result<Json<Reserve>, Json<ErrorInfo>> {

    let mut reserve_info = reserve_info.into_inner();
    check_guest_data_valid(&reserve_info.user).await?;
    reserve_info.user.role = None;

    let state = &mut state.lock().await;
    let user = state.insert_user(reserve_info.user)?;
    let reserve = reserve_info.reserve;

    let reserve = ReserveNew {
        rentDate: reserve.rentDate,
        returnDate: reserve.returnDate,
        deliveryAddress: reserve.deliveryAddress,
        valid: true,
        carID: reserve.carID,
        userID: user.id
    };

    Ok(Json(state.add_reservation(reserve)?))

}

pub async fn check_guest_data_valid(user: &UserNew) -> Result<(), ErrorInfo> {
    if  user.name.trim().is_empty() ||
        user.surname.trim().is_empty() ||
        user.email.trim().is_empty() ||
        user.drivingLicense.trim().is_empty() 
    {
        return Err(Error::MissingCredentials.into());
    };

    Ok(())
}

#[put("/cancel_reservation", format = "json", data = "<res_id>")]
pub async fn cancel_reservation(
    state: &State<Mutex<GlobalState>>,
    _user_id: UserId,
    res_id: Json<AnyId>
) -> Result<Json<Reserve>, Json<ErrorInfo>> {
    let state = &mut state.lock().await;

    Ok(Json(state.cancel_reservation(res_id.into_inner().id)?))
}


#[put("/cancel_reservation", rank = 1)]
pub async fn fail_cancel_reservation() -> Json<ErrorInfo> {
    Json(Error::NotLoggedIn.into())
}

#[derive(Deserialize, Default, Clone)]
#[serde(crate = "rocket::serde")]
#[serde(default)]
pub struct AnyId {
    pub id: i32,
}

#[derive(Deserialize, Default, Clone)]
#[serde(crate = "rocket::serde")]
#[serde(default)]
pub struct ReserveInfo {
    pub user: UserNew,
    pub reserve: ReserveRequest,
}
