// @generated automatically by Diesel CLI.

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
        login -> Nullable<Text>,
        password -> Nullable<Text>,
        drivingLicense -> Text,
        role -> Nullable<Integer>,
    }
}

diesel::joinable!(users -> roles (role));

diesel::allow_tables_to_appear_in_same_query!(
    roles,
    users,
);
