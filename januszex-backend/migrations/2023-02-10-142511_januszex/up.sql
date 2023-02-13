-- Your SQL goes here
PRAGMA foreign_keys = ON;

CREATE TABLE users (
	id		INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	name	 	TEXT NOT NULL,
	surname 	TEXT NOT NULL,
	email 	TEXT NOT NULL,
	login 	TEXT UNIQUE,
	password 	TEXT,
	drivingLicense 	TEXT NOT NULL,
	licCategoryNumber 	INTEGER NOT NULL,
	role		INTEGER default NULL,
	CONSTRAINT fk_role
		FOREIGN KEY (role) 
		REFERENCES roles(id)
		ON DELETE SET NULL
);

CREATE TABLE roles (
	id						INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	name	 				TEXT NOT NULL,
	canManageOwnAccount 	BOOLEAN NOT NULL,
	canViewHarmonogram 		BOOLEAN NOT NULL,
	canEditHarmonogram 		BOOLEAN NOT NULL,
	canViewCarsToRepair 	BOOLEAN NOT NULL,
	canViewBalance	 		BOOLEAN NOT NULL,
	canGetCarTransporter 	BOOLEAN NOT NULL,
	canConfirmCarStatus 	BOOLEAN NOT NULL,
	canManageManagers 		BOOLEAN NOT NULL,
	canManageCars 			BOOLEAN NOT NULL,
	canManageReservations 	BOOLEAN NOT NULL,
	canGenerateBalance 		BOOLEAN NOT NULL,
	canManagePermissions 	BOOLEAN NOT NULL,
	salary 					REAL
);

CREATE TABLE reservations (
	id						INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	rentDate				DATETIME NOT NULL,
	returnDate				DATETIME NOT NULL,
	deliveryAddress			TEXT NOT NULL,
	valid					BOOLEAN NOT NULL,
	carID					INTEGER NOT NULL
    REFERENCES cars(id)
    ON DELETE CASCADE,

	userID					INTEGER NOT NULL
	REFERENCES users(id)
	ON DELETE CASCADE
);

CREATE TABLE cars (
	id						INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	howManySeats			INTEGER NOT NULL,
	color					TEXT NOT NULL,
	distanceCovered			REAL NOT NULL,
	comfortScale			CHAR NOT NULL,
	brand					TEXT NOT NULL,
	model					TEXT NOT NULL,
	price					INTEGER NOT NULL,
	isATruck				BOOLEAN NOT NULL,
	pictureURL				TEXT NOT NULL
);

CREATE TABLE damages (
	id						INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	description				TEXT NOT NULL
);

CREATE TABLE feedbacks (
	id						INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	description				TEXT NOT NULL
);

insert into roles 
(name, canManageOwnAccount, canViewHarmonogram, canEditHarmonogram, canViewCarsToRepair, canViewBalance, canGetCarTransporter,
canConfirmCarStatus, canManageManagers, canManageCars, canManageReservations, canGenerateBalance, canManagePermissions, salary)
values
("user", true, false, false, false, false, false, false, false, false, false, false, false, 0.0);

insert into cars 
(howManySeats, color, distanceCovered, comfortScale, brand, model, price, isATruck, pictureURL)
values
(7, "blue", 1337.2, 'A', "Audi", "A4", 420, false, "abcd.com"),
(6, "black", 56900.4, 'H', "Honda", "B4", 1500190, false, "abcd.com"),
(2, "white", 123123.0, 'B', "Mercendes", "Benz", 10, true, "abcd.com"),
(5, "red", 1337.2, 'D', "Skoda", "Fabia", 420, false, "abcd.com")
