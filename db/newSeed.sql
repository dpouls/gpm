CREATE TABLE PASSWORDS (
  P_ID serial primary key,
  PASSWORD VARCHAR(500)
);

CREATE TABLE USERS (
  USER_ID SERIAL PRIMARY KEY ,
  EMAIL VARCHAR(100),
  USERNAME VARCHAR(50),
  PASSWORD INT REFERENCES PASSWORDS(P_ID),
  IS_LANDLORD boolean DEFAULT false NOT NULL,
  FN VARCHAR(30),
  LN VARCHAR(30),
  OCCUPANTS INT,
  PET boolean DEFAULT false NOT NULL,
  PHONE VARCHAR(15)
);

CREATE TABLE PROPERTIES (
  PROPERTY_ID SERIAL PRIMARY KEY ,
  street_address VARCHAR(100) ,
  CITY VARCHAR(50) ,
  STATE VARCHAR(30) ,
  OCCUPIED boolean DEFAULT false NOT NULL,
  AVAILABLE boolean DEFAULT false NOT NULL,
  RENTAL_PRICE int DEFAULT 0 NOT NULL,
  BEDROOMS INT ,
  BATHROOMS INT 
);

CREATE TABLE P_IMAGES (
  IMG_ID SERIAL PRIMARY KEY ,
  IMG_URL VARCHAR(1000),
  PROPERTY_ID INT REFERENCES PROPERTIES(PROPERTY_ID)
);

CREATE TABLE LANDLORD_PROPERTIES (
  LP_ID SERIAL PRIMARY KEY ,
  PROPERTY_ID INT REFERENCES PROPERTIES(PROPERTY_ID),
  LANDLORD_ID INT REFERENCES USERS(USER_ID)
);

CREATE TABLE PROPERTY_RENTER (
  PR_ID SERIAL PRIMARY KEY ,
  RENTER_ID INT REFERENCES USERS(USER_ID),
  PROPERTY_ID INT REFERENCES PROPERTIES(PROPERTY_ID)
);

CREATE TABLE MR_TYPES (
  TYPE VARCHAR(30) PRIMARY KEY
);


CREATE TABLE MAINTENANCE_REQUESTS (
  MR_ID SERIAL PRIMARY KEY ,
  USER_ID INT REFERENCES USERS(USER_ID),
  PROPERTY_ID INT REFERENCES PROPERTIES(PROPERTY_ID),
  CONTENT VARCHAR(1000),
  EMERGENCY boolean default false,
  TYPE VARCHAR(30) REFERENCES MR_TYPES(TYPE),
  COMPLETE boolean default false
);

CREATE TABLE MR_IMAGES (
  IMG_ID SERIAL PRIMARY KEY ,
  IMG_URL VARCHAR(1000),
  MR_ID INT REFERENCES MAINTENANCE_REQUESTS(MR_ID)
);