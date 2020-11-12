select u.first_name, u.last_name, p.street_address, p.city, m.emergency, m.request_text_content, m.request_id,m.phone_number, m.email,m.is_complete
from maintenance_requests m 
join users u on u.user_id = m.user_id
join properties p on p.property_id = m.property_id

