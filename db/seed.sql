create table users (
    user_id serial primary key,
    email varchar(200),
    username varchar(50),
    password varchar(350),
    isAdmin boolean
)