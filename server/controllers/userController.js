module.exports = {
    getUserInfo: (req,res) => {
        if (req.session.user){
            res.status(200).send(req.session.user)
        } else {
            res.sendStatus(404)
        }
    }
}