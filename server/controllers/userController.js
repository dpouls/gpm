module.exports = {
    getUserInfo: (req,res) => {
        if (req.session.user){
            const db = req.app.get('db')
            db.user.get_user_info(req.session.user.user_id)
            .then(userInfo => { 
                res.status(200).send(userInfo[0])
            }).catch(err => res.status(500).send(err))
        } else {
            res.sendStatus(404)
        }
    }
}