const User = require('../../models/User');
const UserSession = require('../../models/UserSession');
const UserPreferences = require('../../models/UserPreferences');


module.exports = (app) => {
  /*
   * User preferences
   * Setting values of pref object given form info
   */
  app.post('/api/account/preferences', (req, res, next) => {
    const { body } = req; 
    const {
      hot,
      cold,
      coat,
      boots,
      raincoat,
      rainboots,
      umbrella,
      userId,
    } = body; 

    if (!hot || !cold) {
      return res.send({
        success: false,
        message: 'Error: hot/cold be blank.'
      });
    }

    // Find this user's user pref object
    UserPreferences.findOne({prefId: userId}, (err, result) => {
      result.hot = hot; 
      result.cold = cold; 
      result.coat = coat; 
      result.boots = boots; 
      result.raincoat = raincoat;
      result.rainboots = rainboots; 
      result.umbrella = umbrella; 
      result.completed = true;
      result.save((err, pref) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: ' + err
          });
        }
        return res.send({
          success: true,
          message: 'Preferences set'
        });
      });
    });
  });

  /*
   * Sign up
   */
  app.post('/api/account/signup', (req, res, next) => {
    const { body } = req;
    const {
      password
    } = body;
    let {
      email,
      firstName,
      lastName,
    } = body;

    if (!firstName) {
      return res.send({
        success: false,
        message: 'Error: First name cannot be blank.'
      });
    }
    if (!lastName) {
      return res.send({
        success: false,
        message: 'Error: Last name cannot be blank.'
      });
    }
    if (!email) {
      return res.send({
        success: false,
        message: 'Error: Email cannot be blank.'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
    }

    email = email.toLowerCase();
    email = email.trim();

    // Steps:
    // 1. Verify email doesn't exist
    // 2. Save
    User.find({
      email: email
    }, (err, previousUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      } else if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: 'Error: Account already exists'
        });
      }

      // Save the new user
      const newUser = new User();

      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.email = email;
      newUser.password = newUser.generateHash(password);

      // Create new UserPreferences object with prefId = newUser._id
      const newPref = new UserPreferences();  
      newPref.prefId = newUser._id; 
      newPref.save();

      // //how to query user pref db
      // UserPreferences.findOne({hot: ""}, (err, result) => {
      //   console.log('*****', result.boots);
      // });

      newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }
        // When signed up send id back in json response 
        return res.send({
          success: true,
          message: 'Signed up!',
          id: newUser._id,
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
        message: 'Error: Email cannot be blank.'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
    }

    email = email.toLowerCase();
    email = email.trim();

    User.find({
      email: email
    }, (err, users) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: server error'
        });
      }
      if (users.length != 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      }

      const user = users[0];
      if (!user.validPassword(password)) {
        return res.send({
          success: false,
          message: 'Error: Invalid password'
        });
      }

      // Otherwise, user is correct
      const userSession = new UserSession();
      userSession.userId = user._id;

      // When user is logging in, check if they've completed user pref survey
      var isCompleted;
      UserPreferences.findOne({prefId: user._id}, (err, result) => {
        isCompleted = result.completed; 
      });

      UserPreferences.findOne
      userSession.save((err, doc) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: server error'
          });
        }

        return res.send({
          success: true,
          message: 'Valid sign in',
          token: doc._id,
          completed: isCompleted,
          userId: user._id,
        });
      });
    });
  });

  app.get('/api/account/verify', (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    // ?token=test

    // Verify the token is one of a kind and it's not deleted.
    UserSession.find({
      _id: token,
      isDeleted: false
    }, (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }

      if (sessions.length != 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      } else {
        return res.send({
          success: true,
          message: 'Good'
        });
      }
    });
  });

  app.get('/api/account/logout', (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    // ?token=test

    // Verify the token is one of a kind and it's not deleted.

    UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false
    }, {
      $set: {
        isDeleted:true
      }
    }, null, (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }

      return res.send({
        success: true,
        message: 'Good'
      });
    });
  });
};