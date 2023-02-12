-- Your SQL goes here
CREATE TABLE "users" (
	"id"		INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"name"	 	TEXT NOT NULL,
	"surname" 	TEXT NOT NULL,
	"email" 	TEXT NOT NULL,
	"login" 	TEXT,
	"password" 	TEXT,
	"drivingLicense" 	TEXT NOT NULL,
	"role"		INTEGER default 0,
	CONSTRAINT fk_role
		FOREIGN KEY ("role") 
		REFERENCES roles("id")
		ON DELETE SET NULL
);

CREATE TABLE "roles" (
	"id"					INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"name"	 				TEXT NOT NULL,
	"canManageOwnAccount" 	BOOLEAN NOT NULL,
	"canViewHarmonogram" 	BOOLEAN NOT NULL,
	"canEditHarmonogram" 	BOOLEAN NOT NULL,
	"canViewCarsToRepair" 	BOOLEAN NOT NULL,
	"canViewBalance"	 	BOOLEAN NOT NULL,
	"canGetCarTransporter" 	BOOLEAN NOT NULL,
	"canConfirmCarStatus" 	BOOLEAN NOT NULL,
	"canManageManagers" 	BOOLEAN NOT NULL,
	"canManageCars" 		BOOLEAN NOT NULL,
	"canManageReservations" BOOLEAN NOT NULL,
	"canGenerateBalance" 	BOOLEAN NOT NULL,
	"canManagePermissions" 	BOOLEAN NOT NULL,
	"salary" 				REAL
);

CREATE TABLE "reservations" (
	"id"					INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"rentDate"				DATETIME NOT NULL,
	"returnDate"			DATETIME NOT NULL,
	"carID"					INTEGER NOT NULL,
	"userID"				INTEGER NOT NULL,
	CONSTRAINT fk_car
		FOREIGN KEY ("carID") 
		REFERENCES cars("id")
		ON DELETE CASCADE,
	CONSTRAINT fk_user
		FOREIGN KEY ("userID") 
		REFERENCES users("id")
		ON DELETE CASCADE
);

CREATE TABLE "cars" (
	"id"					INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"howManySeats"			INTEGER NOT NULL,
	"color"					TEXT NOT NULL,
	"distanceCovered"		REAL NOT NULL,
	"comfortScale"			CHAR NOT NULL,
	"brand"					TEXT NOT NULL,
	"model"					TEXT NOT NULL,
	"price"					INTEGER NOT NULL,
	"isATruck"				BOOLEAN NOT NULL
);

insert into roles 
(name, canManageOwnAccount, canViewHarmonogram, canEditHarmonogram, canViewCarsToRepair, canViewBalance, canGetCarTransporter,
canConfirmCarStatus, canManageManagers, canManageCars, canManageReservations, canGenerateBalance, canManagePermissions, salary)
values
("user", true, false, false, false, false, false, false, false, false, false, false, false, 0.0);
