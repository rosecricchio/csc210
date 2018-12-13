const User = require('../../models/User');
const UserSession = require('../../models/UserSession');
const UserPreferences = require('../../models/UserPreferences');

module.exports = (app) => {

  /*
   * Getting user preference info from db
   */
  app.post('/api/account/get_preferences', (req, res, next) => {
    const { body } = req; 
    const {
      userId,
    } = body; 

    // Find user's pref object
    UserPreferences.findOne({prefId: userId}, (err, result) => {
      if(result.completed){
        return res.send({
          success: true,
          message: 'User prefs found',
          hot: result.hot, 
          cold: result.cold, 
          coat: result.coat, 
          boots: result.boots, 
          raincoat: result.raincoat, 
          rainboots: result.rainboots,
          completed: true,
        });
      }
      else {
        return res.send({
          success: true, 
          message: 'No user prefs found',
          completed: false,
        })
      }
    });
  });

  /*
   * Setting user preferences given form info
   */
  app.post('/api/account/set_preferences', (req, res, next) => {
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
}