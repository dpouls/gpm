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
            const {streetAddress, city, state, rentalPrice, bedrooms,bathrooms,occupied,available} = req.body;
            const street_address = streetAddress;
            const rental_price = rentalPrice;
            const db = req.app.get('db')
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
                .then(data => res.status(200).send('Property created and connected to landlord') )
                .catch( err => {
                    res.send(err)
                    console.log(err)
                })
            } 
        else
        {
            res.sendStatus(401);
        }
    },
    linkPropertyRenter: (req,res) => {
        if(req.session.user.is_landlord){
            const {renterId,propertyId} = req.body;
            const db = req.app.get('db')
            db.property.link_property_renter(renterId,propertyId)
            .then(response => res.status(201).send("Link created."))
            .catch(err => {
                console.log(err)
                res.send(err)
            })

        }
        else {
            res.sendStatus(401)
        }

        
    }
}