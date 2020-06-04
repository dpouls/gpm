create table users (
    user_id serial primary key,
    email varchar(200),
    username varchar(50),
    password varchar(350),
    isAdmin boolean
)
create table properties (
 property_id serial primary key,
 street_address varchar(200),
 city varchar(30),
 state varchar(30),
 occupied boolean,
 rental_price numeric,
 available boolean,
 thumbnail text,
 bedrooms integer,
 bathrooms integer
)