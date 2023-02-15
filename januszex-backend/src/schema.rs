// @generated automatically by Diesel CLI.

diesel::table! {
    cars (id) {
        id -> Integer,
        howManySeats -> Integer,
        color -> Text,
        distanceCovered -> Float,
        comfortScale -> Text,
        brand -> Text,
        model -> Text,
        price -> Integer,
        isATruck -> Bool,
        pictureURL -> Text,
    }
}

diesel::table! {
    damages (id) {
        id -> Integer,
        description -> Text,
    }
}

diesel::table! {
    feedbacks (id) {
        id -> Integer,
        description -> Text,
    }
}

diesel::table! {
    reservations (id) {
        id -> Integer,
        rentDate -> Timestamp,
        returnDate -> Timestamp,
        deliveryAddress -> Text,
        valid -> Bool,
        carID -> Integer,
        userID -> Integer,
    }
}

diesel::table! {
    roles (id) {
        id -> Integer,
        name -> Text,
        canManageOwnAccount -> Bool,
        canViewHarmonogram -> Bool,
        canEditHarmonogram -> Bool,
        canViewCarsToRepair -> Bool,
        canViewBalance -> Bool,
        canGetCarTransporter -> Bool,
        canConfirmCarStatus -> Bool,
        canManageManagers -> Bool,
        canManageCars -> Bool,
        canManageReservations -> Bool,
        canGenerateBalance -> Bool,
        canManagePermissions -> Bool,
        salary -> Nullable<Float>,
    }
}

diesel::table! {
    users (id) {
        id -> Integer,
        name -> Text,
        surname -> Text,
        email -> Text,
        login -> Nullable<Text>,
        password -> Nullable<Text>,
        drivingLicense -> Text,
        licCategoryNumber -> Text,
        role -> Nullable<Integer>,
    }
}

diesel::joinable!(reservations -> cars (carID));
diesel::joinable!(reservations -> users (userID));
diesel::joinable!(users -> roles (role));

diesel::allow_tables_to_appear_in_same_query!(
    cars,
    damages,
    feedbacks,
    reservations,
    roles,
    users,
);
