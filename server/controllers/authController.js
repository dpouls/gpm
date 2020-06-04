const bcrypt = require('bcryptjs')
module.exports = {
    register: async(req,res) => {
        const {username,password} = req.body 
        const db = req.app.get('db')
        const {session} = req
        let user = await db.auth.check_user(username)
        user = user[0]
        if(user){
            return res.status(400).send('User already exists')
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password,salt)

        let newUser = await db.auth.register_user(username, hash)
        newUser = newUser[0]
        
        let sessionUser = newUser
        session.user = sessionUser
        res.status(201).send(session.user)
    },
    login: async(req, res) => {
        const {username, password} = req.body 
        const {session} = req
        const db = req.app.get('db')
        
        // console.log('body', req.body)
      
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