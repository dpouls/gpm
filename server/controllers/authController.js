const bcrypt = require('bcryptjs')
module.exports = {
    register: async(req,res) => {
        const {username,password,email,isadmin,firstName,lastName, occupants, pet, phoneNumber} = req.body 
        const db = req.app.get('db')
        let user = await db.auth.check_user(username)
        user = user[0]
        if(user){
            return res.status(400).send('User already exists')
        }
        const parsedPhone = +phoneNumber
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password,salt)

        let newUser = await db.user.create_new_user(email,username, hash, isadmin, firstName, lastName, occupants, pet, parsedPhone)
        newUser = newUser[0]
        res.sendStatus(201)
    },
    login: async(req, res) => {
        const {username, password} = req.body 
        const {session} = req
        const db = req.app.get('db')   
        let user = await db.auth.check_user(username)
        user = user[0]
        if(!user){
            return res.status(400).send("User doesn't exist")
        }
        const authorized = bcrypt.compareSync(password,user.password)
        if(authorized){
            delete user.password;
            session.user = user
            res.status(202).send(session.user)
            
            console.log('session.user',session.user)
        } else {  
            res.status(401).send("Incorrect Password")
        }

    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
        console.log('Logged out')
    },
    currentUser: (req,res) => {
        console.log('currentuser hit')
        if (req.session.user){
            res.status(200).send(req.session.user)
        } else {
            res.sendStatus(404)
        }
    }
}