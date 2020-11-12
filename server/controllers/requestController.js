module.exports = {
    
    createRequest: async (req, res) => {
        console.log('createRequest hit')
        if (req.session.user){
            let { 
                property_id,
                requestDetails,
                emergency,
                phoneNumber,
                email,
                problemAreaArray
            } = req.body;
            let  
            bathroom = false,
            bedroom = false,
            yard = false,
            kitchen = false,
            living_room = false,
            exterior = false,
            appliance = false,
            plumbing = false,
            electrical = false,
            other = false,
            image_one = '',
            image_two = '',
            image_three = '',
            is_complete = false;

            console.log('reqbody', req.body)
            let problemAreas = [
                "bathroom",
                "bedroom",
                "yard",
                "kitchen",
                "living room",
                "exterior",
                "appliance",
                "plumbing",
                "electrical",
                "other",
              ]
            await problemAreaArray.map((currentProblem) => {
                if(problemAreas.includes(currentProblem)){
                    switch(currentProblem){
                        case 'emergency':
                            emergency = true;
                        break;
                        case 'bathroom':
                            bathroom = true;
                        break;
                        case 'bedroom':
                            bedroom = true;
                        break;
                        case 'yard':
                            yard = true;
                        break;
                        case 'kitchen':
                            kitchen = true;
                        break;
                        case 'living room':
                            living_room = true;
                        break;
                        case 'exterior':
                            exterior = true;
                        break;
                        case 'appliance':
                            appliance = true;
                        break;
                        case 'plumbing':
                            plumbing = true;
                        break;
                        case 'electrical':
                            electrical = true;
                        break;
                        case 'other':
                            other = true;
                        break;
                        default:
                            console.log('No problem area received.')
                    }
                    
                }
            });
            let phone_number = phoneNumber;
            let request_text_content = requestDetails
            const db = req.app.get('db')
            db.requests.create_request([
                req.session.user.user_id, 
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
                image_three,
                phone_number,
                email,
                is_complete
            ])
            .then(request => { 
                console.log('res',res)
                res.status(200).send(request[0])
            }).catch(err => res.status(500).send(err))

        } else {
            res.sendStatus(404)
        }
    },
    getAllRequests: (req,res) => {
        const db = req.app.get('db')
        db.requests.get_all_requests()
        .then(requests => res.status(200).send(requests))
        .catch(err => res.status(500).send(err))
    }
}