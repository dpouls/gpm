const bcrypt = require('bcryptjs')
//All these work with the new db schema as of June 2021
module.exports = {
    register: async(req,res) => {
        const {username,password,email,isLandlord,firstName,lastName, occupants, pet, phoneNumber} = req.body 
        const db = req.app.get('db')
        let user = await db.auth.check_user(username)
        user = user[0]
        if(user){
            return res.status(400).send('User already exists')
        }
        const parsedPhone = +phoneNumber
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password,salt)
        let passwordID = await db.auth.insert_password(hash);
        passwordID = passwordID[0].p_id
        console.log(passwordID)
        let newUser = await db.user.create_new_user(email,username, passwordID, isLandlord, firstName, lastName, occupants, pet, parsedPhone)
        newUser = newUser[0]
        res.sendStatus(201)
    },
    login: async(req, res) => {
        const {username, password} = req.body 
        const {session} = req
        const db = req.app.get('db')   
        let user = await db.auth.check_user(username)
        user = user[0]
        console.log("user",user)
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
        if (req.session.user){
            res.status(200).send(req.session.user)
        } else {
            res.sendStatus(404)
        }
    }
}