insert into users (
    username,
    password
) values (
    $1,
    $2
)
returning user_id, username;