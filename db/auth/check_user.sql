select * 
from users u 
join passwords p on p.p_id = u.password
where u.username = $1;