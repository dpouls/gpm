select user_id, username, email, is_landlord, fn, ln, occupants, pet, phone
from users
where user_id = $1;