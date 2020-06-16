module.exports = {
    createRequest: async (req, res) => {
        if (req.session.user){
            const { 
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
                image_three} = req.body
            const db = req.app.get('db')
            db.requests.create_request([req.session.user.user_id, property_id, request_text_content,
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
                image_three ])
            .then(request => { 
                res.status(200).send(request[0])
            }).catch(err => res.status(500).send(err))

            // res.status(200).send(req.session.user)
        } else {
            res.sendStatus(404)
        }
    }
}