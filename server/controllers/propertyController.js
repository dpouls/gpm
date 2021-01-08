module.exports = {
    getAllProperties: (req,res) => {
        if(req.session.user.is_landlord){
            const db = req.app.get('db')
            db.property.get_all_properties()
            .then(properties => {
                res.status(200).send(properties)
            })
        }
        else {
            res.sendStatus(401)
        }
    },
    createProperty: async (req,res) => {
        if(req.session.user.is_landlord){
            console.log('hit')
            let newPropertyId;
            const landlordId = req.session.user.user_id
            const db = req.app.get('db')
            const {streetAddress, city, state, rentalPrice, bedrooms,bathrooms,occupied,available} = req.body;
            const street_address = streetAddress;
            const rental_price = rentalPrice;
            await db.property.create_property({street_address,city,state,rental_price,bedrooms,bathrooms,occupied,available})
            .then(id => {
                newPropertyId = id[0].property_id
                console.log(newPropertyId)
            })
            .catch(err => {
                res.send(err)
                console.log(err)})
                console.log('newpropertyid',newPropertyId)
                db.property.insert_landlord_property(newPropertyId, landlordId)
                .then(data => res.status(200).send('Property connected to landlord') )
                .catch( err => {
                    res.send(err)
                    console.log(err)
                })
            } 
        else
        {
            res.sendStatus(401);
        }
    }
}