module.exports = {
    getAllProperties: (req,res) => {
        if(req.session.user.isadmin){
            const db = req.app.get('db')
            db.property.getAllProperties()
            .then(properties => {
                res.status(200).send(properties)
            })
        }
        else {
            res.sendStatus(401)
        }
    },
    createProperty: (req,res) => {
        if(req.session.user.isadmin){
            const db = req.app.get('db')
            const {streetAddress, city, state, rentalPrice, bedrooms,bathrooms,occupied,available} = req.body;
            const street_address = streetAddress;
            const rental_price = rentalPrice;
            db.property.createProperty({street_address,city,state,rental_price,bedrooms,bathrooms,occupied,available})
            .then(res => res.sendStatus(200))
            .catch(err => {
                res.send(err)
                console.log(err)})
        } 
        else
        {
            res.sendStatus(401);
        }
    }
}