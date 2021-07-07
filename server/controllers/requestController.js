module.exports = {
    //Both work with the new db as of July 2021
    createRequest: async (req, res) => {
        //not doing images yet.
        if(req.session.user){
            let {
                property_id,
                content,
                emergency,
                type,
                complete
            } = req.body;
            const db = req.app.get('db')
            db.requests.create_request([
                req.session.user.user_id, 
                property_id, 
                content,
                emergency,
                type,
                complete   
            ])
            .then(request => { 
                res.status(200).send(request[0])
            }).catch(err => res.status(500).send(err))
        }
    },
    
    
    getAllRequests: (req,res) => {
        if(req.session.user.is_landlord){
            const db = req.app.get('db')
        db.requests.get_all_requests()
        .then(requests => res.status(200).send(requests))
        .catch(err => res.status(500).send(err))
        }
        else {
            res.status(401).send("Unauthorized")
        }
        
    }
}