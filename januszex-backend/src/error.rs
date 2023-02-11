use rocket::serde::Serialize;


#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
#[serde(default)]
pub struct ErrorInfo {
    error_id: i32,
    msg: String,
    detail: String,
}

impl ErrorInfo {
    pub fn new(error_id: i32, msg: &str, detail: &str) -> Self {
        Self {
            error_id,
            msg: msg.to_string(),
            detail: detail.to_string(),
        }
    }

}

impl From<Error> for ErrorInfo {
    fn from(error: Error) -> Self {
        match error {
            Error::UsernameTaken => ErrorInfo::new(1, "Username already taken", ""),
            Error::WrongData => ErrorInfo::new(2, "Wrong data in json body", ""),
            Error::WrongCredentials => ErrorInfo::new(3, "Credentials didn't match any user in the database", ""),
            Error::WrongId => ErrorInfo::new(4, "ID didn't match any item in the table", ""),
            Error::NotLoggedIn => ErrorInfo::new(5, "Resource is only for users that logged in", ""),
            Error::InternalServerError(file, line) => ErrorInfo::new(6, "Oh sh*t, contact your backend guy", &format!("File: {}, Line: {}", file, line)),
            Error::MissingCredentials => ErrorInfo::new(7, "Missing credentials, cannot create user", ""),
        }
    }
}

pub enum Error {
    UsernameTaken,
    WrongData,
    WrongCredentials,
    WrongId,
    NotLoggedIn,
    InternalServerError(&'static str, u32),
    MissingCredentials
}