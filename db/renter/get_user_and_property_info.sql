select p.property_id, street_address, city, state, occupied, rental_price, 
available, bedrooms, bathrooms,
user_id, username, email, is_landlord, fn, ln, occupants, pet, phone 
from properties p 
join property_renter pr on pr.property_id = p.property_id
join users u on u.user_id = pr.renter_id
where user_id = $1