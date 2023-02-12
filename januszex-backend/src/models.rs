#![allow(non_snake_case)]

use diesel::prelude::*;
use crate::schema::{
    users,
    roles
};

use chrono::{
    naive::NaiveDateTime,
    Utc,
};

use rocket::serde::{Serialize, Deserialize};


#[derive(Insertable, Deserialize, Default, Clone)]
#[diesel(table_name = users)]
#[serde(crate = "rocket::serde")]
#[serde(default)]
pub struct UserNew<'a> {
    pub name: &'a str,
    pub surname: &'a str,
    pub email: &'a str,
    pub login: &'a str,
    pub password: String,
    pub drivingLicense: &'a str,
    pub role: i32,
}

#[derive(Queryable, Serialize, Default, Clone)]
#[serde(crate = "rocket::serde")]
pub struct User {
    pub id: i32,
    pub name: String,
    pub surname: String,
    pub email: String,
    pub login: Option<String>,
    pub password: Option<String>,
    pub license: String,
    pub role: Option<i32>,
}

#[derive(Queryable, Serialize, Default, Clone)]
#[serde(crate = "rocket::serde")]
pub struct Car {
    pub id: i32,
    pub howManySeats: i32,
    pub color: String,
    pub distanceCovered: f32,
    pub comfortScale: String,
    pub brand: String,
    pub model: String,
    pub price: i32,
    pub isATruck: bool,
}

