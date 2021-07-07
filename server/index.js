require('dotenv').config()
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      ac = require('./controllers/authController'),
      pc = require('./controllers/paymentController'),
      uc = require('./controllers/renterController'),
      rc = require('./controllers/requestController'),
      prc = require('./controllers/propertyController'),
      app = express();

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

app.use(express.json())

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60}
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db)
    console.log('db connected')
})


//AUTH ENDPOINTS 
app.post('/auth/login', ac.login)
app.post('/auth/register', ac.register)
app.post('/auth/logout', ac.logout)
app.get('/auth/currentuser')

//User Endpoints
app.get('/api/user', uc.getUserInfo)
app.get('/api/renters', uc.getAllRenters)
//Payment Endpoints
app.post('/api/charge', pc.processPayment)
//Property Endpoints 
app.get('/api/properties',prc.getAllProperties)
app.post('/api/property', prc.createProperty)
app.post('/api/property-renter', prc.linkPropertyRenter)
//Maintenance Request Endpoints
app.post('/api/request', rc.createRequest)
app.get('/api/requests',rc.getAllRequests)

app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`))