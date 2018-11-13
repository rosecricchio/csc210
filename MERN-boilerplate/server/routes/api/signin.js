const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

module.exports = (app) => {
    app.post('/api/account/signup', (req, res, next) => {
        const { body } = req; 
        const {
            firstName,
            lastName, 
            password
        } = body;
        let {
            email
        } = body; 

        if (!firstName) {
            return res.send({
                success: false,
                message: 'Error: first name cannot be blank.'
            });
        }

        if (!lastName) {
            return res.send({
                success: false,
                message: 'Error: last name cannot be blank.'
            });
        }

        if (!email) {
            return res.send({
                success: false,
                message: 'Error: email cannot be blank.'
            });
        }

        if (!password) {
            return res.send({
                success: false,
                message: 'Error: password cannot be blank.'
            });
        }
        
        email = email.toLowerCase();
       
        // Verify email doesn't exist and save
        User.find({
            email: email
        }, (err, previousUsers) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: server error'
                });
            } else if (previousUsers.length > 0) {
                return res.send({
                    success: false, 
                    message: 'Error: account already exists'
                });
            } 
        
            const newUser = new User(); 
            newUser.email = email; 
            newUser.firstName = firstName; 
            newUser.lastName = lastName; 
            newUser.password = newUser.generateHash(password);
            newUser.save((err, user) => {
                if (err) {
                    return res.send({
                        success: false, 
                        message: 'Error: server error'
                    });
                }
                return res.send({
                    success: true,
                    message: 'Signed up'
                });
            });   
        });  
    });

    app.post('/api/account/signin', (req, res, next) => {
        const { body } = req; 
        const {
            password
        } = body;
        let {
            email
        } = body; 

        if (!email) {
            return res.send({
                success: false, 
                message: 'Error: email cannot be blank.'
            });
        }
        if (!password) {
            return res.send({
                success:false, 
                message: 'Error: password cannot be blank.'
            });
        }

        email = email.toLowerCase(); 

        User.find({
            email: email
        }, (err, users) => {
            if (err) {
                return res.send({
                    success: false, 
                    message: 'Error: server error'
                });
            }
            if (users.length != 1){
                return res.send({
                    success: false, 
                    message: 'Error: invalid'
                });
            }

            const user = users[0];
            if (!user.validPassword(password)) {
                return res.send({
                    success: false, 
                    message: 'Error: invalid password.'
                });
            }

            //Create user session
            const userSession = new UserSession(); 
            userSession.userId = user._id; 
            userSession.save((err, doc) => {
                if (err) {
                    return res.send({
                        success: false, 
                        message: 'Error: server error'
                    });
                }

                return res.send({
                    sucess: true, 
                    message: 'Valid sign-in',
                    token: doc._id
                });

            });
        });
    });

    app.get('/api/account/verify', (req, res, next) => {
        //Get token
        const { query } = req; 
        const { token } = query; 
        UserSession.find({
            _id: token, 
            isDeleted: false
        }, (err, sessions) => {
            if (err) {
                return res.send({
                    success: false, 
                    message: 'Error: server error'
                });
            }

            if (sessions.length != 1) {
                return res.send({
                    success: false, 
                    message: 'Error: invalid'
                });
            } else {
                return res.send({
                    success: true, 
                    message: 'Valid'
                });
            }

        });
        //Verify token is unique and not deleted
    });

    app.get('/api/account/verify', (req, res, next) => {
        
    });

    
};

//validate email (lodash?)