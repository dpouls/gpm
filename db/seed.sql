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
create table maintenance_requests (
    request_id serial primary key,
    user_id int references users(user_id),
    property_id int references properties(property_id),
    request_text_content VARCHAR(1000),
    emergency boolean,
    bathroom boolean,
    bedroom boolean,
    yard boolean,
    kitchen boolean,
    living_room boolean,
    exterior boolean,
    appliance boolean,
    plumbing boolean,
    electrical boolean,
    other boolean,
    image_one text,
    image_two text,
    image_three text
)

insert into maintenance_requests
(
    user_id,
    property_id,
    request_text_content,
    emergency,
    bathroom,
    bedroom,
    yard,
    kitchen,
    living_room,
    exterior,
    appliance,
    plumbing,
    electrical,
    other,
    image_one,
    image_two,
    image_three
) values (
    2,1,'test maintenance request text content this can be up to 1000 characters long for now',
false, true, false,false,false,false,false,false,false,false,false,'https://picsum.photos/id/824/200/300','https://picsum.photos/id/824/200/300','https://picsum.photos/id/824/200/300'
)