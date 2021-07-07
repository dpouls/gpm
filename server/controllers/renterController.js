const { restart } = require("nodemon")

module.exports = {
    getRenterInfo: (req,res) => {
        if(req.session.user){
            //GETS RENTER INFO AND PROPERTIES ASSOCIATED. SIMILAR TO WHAT IS BELOW.
        }
    },

    getUserInfo: (req,res) => {
        if (req.session.user){
            const db = req.app.get('db')
            db.user.get_user_and_property_info(req.session.user.user_id)
            .then(userInfo => { 
                if(userInfo[0]){
                    res.status(200).send(userInfo[0])
                }
                //if no property is assigned, then it will only return the users information and not the tied property information.
                else {
                    db.user.get_only_user_info(req.session.user.user_id).then(
                        userInfo => {
                          res.status(200).send(userInfo[0])
                        }
                    )
                }
                
            }).catch(err => {
                console.log(err)
                res.status(500).send(err)})
        } else {
            res.status(404).send('No user')
        }
    },


}