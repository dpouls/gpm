select property_id, street_address, city, state, occupied, rental_price, available, thumbnail, bedrooms, bathrooms, renter_id, user_id, username, email, isadmin, first_name, last_name, occupants, pet, phone_number from properties p 
join users u on u.user_id = p.renter_id
where renter_id = $1