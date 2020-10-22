select user_id, username, email, isadmin, first_name, last_name, occupants, pet 
from users
where user_id = $1;