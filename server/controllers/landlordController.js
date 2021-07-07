module.exports = {
    //this is old code.
    getAllRenters: (req,res) => {
        if(req.session.user.isadmin){
            const db = req.app.get('db')
            db.user.get_all_renters()
            .then((renters) => {
                res.status(200).send(renters)
            })
        }
        else {
            res.sendStatus(401)
        }
    }
}