insert into properties 
(street_address,
  city,
  state, 
  rental_price,
  bedrooms,
  bathrooms,
  occupied,
  available)
 values 
 (${street_address},
    ${city},
    ${state},
    ${rental_price},
    ${bedrooms},
    ${bathrooms},
    ${occupied},
    ${available})
returning property_id;