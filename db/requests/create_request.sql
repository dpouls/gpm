insert into maintenance_requests (
    user_id,
    property_id,
    request_text_content,
    emergency,
    bathroom,
    bedroom,
    yard,
    kitchen,
    living_room,
    exterior,
    appliance,
    plumbing,
    electrical,
    other,
    image_one,
    image_two,
    image_three
) values (
    $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17
)
