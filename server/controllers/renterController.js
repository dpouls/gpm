const { restart } = require("nodemon")

module.exports = {
    getRenterInfo: (req,res) => {
        if(req.session.user){
            //GETS RENTER INFO AND PROPERTIES ASSOCIATED. SIMILAR TO WHAT IS BELOW.
            const db = req.app.get('db')
            db.renter.check_renter_property(req.session.user.user_id).then(
                (renterProperty => {
                    if(renterProperty[0]){
                       db.renter.get_renter_and_property_info(req.session.user.user_id)
                       .then(info => res.status(200).send(info[0]))
                       .catch(err => res.status(500).send(err));
                    } else {
                        db.renter.get_only_renter_info(req.session.user.user_id)
                        .then(info => res.status(200).send(info[0]))
                        .catch(err => {
                            console.log(err)
                            res.status(500).send(err)
                        })
                    }
                })
                ).catch( err => {
                    console.log(err);
                    res.status(500).send(err);
                })
            }
    }


}