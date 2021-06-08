select u.fn, u.ln, p.street_address, p.city, m.emergency, m.content, m.mr_id, m.complete
from maintenance_requests m 
join users u on u.user_id = m.user_id
join properties p on p.property_id = m.property_id

