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
      if(result && result.completed){
        return res.send({
          success: true,
          message: 'User prefs found',
          hot: result.hot, 
          cold: result.cold, 
          coat: result.coat, 
          boots: result.boots, 
          hat: result.hat,
          scarf: result.scarf,
          gloves: result.gloves,
          lightCoat: result.lightCoat,
          raincoat: result.raincoat, 
          rainboots: result.rainboots,
          sunglasses: result.sunglasses,
          lightClothes: result.lightClothes,
          sandals: result.sandals, 
          sunhat: result.sunhat,
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
      hat,
      scarf,
      gloves,
      raincoat,
      rainboots,
      lightCoat,
      umbrella,
      sunglasses,
      lightClothes,
      sandals,
      sunhat,
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
      result.hat = hat; 
      result.gloves = gloves;
      result.scarf = scarf;
      result.raincoat = raincoat;
      result.rainboots = rainboots; 
      result.lightCoat = lightCoat;
      result.umbrella = umbrella; 
      result.sunglasses = sunglasses;
      result.lightClothes = lightClothes; 
      result.sunhat = sunhat; 
      result.sandals = sandals; 
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