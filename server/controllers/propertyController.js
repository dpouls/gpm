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
    }
}