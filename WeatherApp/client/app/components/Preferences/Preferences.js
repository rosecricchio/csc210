import React, { Component } from 'react';
import 'whatwg-fetch';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import '../../styles/vendor/normalize.scss'
import '../../styles/home.scss'
import { Grid } from '@material-ui/core';

class Preferences extends Component {
  constructor(props) {
    super(props);

    this.state = {
        cold: '',
        hot: '',
        coat: false,
        boots: false,
        hat: false,
        gloves: false,
        scarf: false,
        raincoat: false,
        rainboots: false,
        umbrella: false,
        sunglasses: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleColdChange = this.handleColdChange.bind(this);
    this.handleHotChange = this.handleHotChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange = name => event => {
      this.setState({ [name]: event.target.checked});
  }

  handleColdChange = event => {
    this.setState({ cold: event.target.value });
  };

  handleHotChange = event => {
    this.setState({ hot: event.target.value });
  };

  onSubmit() {
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
          umbrella,
          sunglasses,
      } = this.state;

      fetch('/api/account/set_preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
       
        body: JSON.stringify({
          hot: hot,
          cold: cold,
          coat: coat,
          boots: boots,
          hat: hat,
          gloves: gloves,
          scarf: scarf,
          raincoat: raincoat, 
          rainboots: rainboots, 
          umbrella: umbrella,
          sunglasses: sunglasses,
          userId: this.props.id,
        }),
      }).then(res => res.json())
        .then(json => {
          console.log('json', json);
          if (json.success) {
            this.setState({
                hot: hot,
                cold: cold,
                coat: coat,
                boots: boots,
                hat: hat,
                gloves: gloves,
                scarf: scarf,
                raincoat: raincoat, 
                rainboots: rainboots, 
                umbrella: umbrella,
                sunglasses: sunglasses,
            });
            this.props.onPref(hot, cold, coat, boots, hat, gloves, scarf, raincoat, rainboots, umbrella, sunglasses);
          } 
        });
  }

  render() { 
      return (
          <div >
              <Grid container spacing={24} direction="column">
            <Grid container item spacing={0} justify="center" alignItems ="center">
            <Grid item xs={3} >
            <p>User Preferences Survey</p>
           
           
            {/* Cold preference */}
           <FormControl component="fieldset">
            <FormLabel component="legend">How sensitive are you to the cold?</FormLabel>
            <RadioGroup
                aria-label="cold"
                name="cold" 
                value={this.state.cold}
                onChange={this.handleColdChange}
            >
                <FormControlLabel value="very" control={<Radio color="primary" />} label="Very" />
                <FormControlLabel value="somewhat" control={<Radio color="primary" />} label="Somewhat" />
                <FormControlLabel value="not" control={<Radio color="primary" />} label="Not at all" />
              
            </RadioGroup>
            </FormControl> <br />
            </Grid>
            </Grid>

            <Grid container item spacing={0} justify="center" alignItems ="center">
            <Grid item xs={3} >

            {/* Hot preferences */}
            <FormControl component="fieldset">
            <FormLabel component="legend">How sensitive are you to the heat?</FormLabel>
            <RadioGroup
                aria-label="hot"
                name="hot" 
                value={this.state.hot}
                onChange={this.handleHotChange}
            >
                <FormControlLabel value="very" control={<Radio color="secondary" />} label="Very" />
                <FormControlLabel value="somewhat" control={<Radio color="secondary" />} label="Somewhat" />
                <FormControlLabel value="not" control={<Radio color="secondary" />} label="Not at all" />
              
            </RadioGroup>
            </FormControl> <br />
            </Grid>
            </Grid>

            <Grid container item spacing={0} justify="center" alignItems ="center">
            <Grid item xs={3} >

             {/* Items owned */}
            <FormControl component="fieldset">
            <FormLabel component="legend">Check the items you own.</FormLabel>
            <FormGroup>
                <FormControlLabel 
                    control={
                        <Checkbox 
                        color="primary"
                        checked={this.state.coat}
                        onChange={this.handleChange('coat')}
                        value="coat"
                        />
                    } 
                    label="Heavy coat" />

                <FormControlLabel 
                    control={
                        <Checkbox 
                        color="primary"
                        checked={this.state.boots}
                        onChange={this.handleChange('boots')}
                        value="boots"
                        />
                    } 
                    label="Winter boots" />

                <FormControlLabel 
                    control={
                        <Checkbox 
                        color="primary"
                        checked={this.state.hat}
                        onChange={this.handleChange('hat')}
                        value="hat"
                        />
                    } 
                    label="Winter hat" /> 

                <FormControlLabel 
                    control={
                        <Checkbox 
                        color="primary"
                        checked={this.state.scarf}
                        onChange={this.handleChange('scarf')}
                        value="scarf"
                        />
                    } 
                    label="Winter scarf" />   

                <FormControlLabel 
                    control={
                        <Checkbox 
                        color="primary"
                        checked={this.state.gloves}
                        onChange={this.handleChange('gloves')}
                        value="gloves"
                        />
                    } 
                    label="Winter gloves" />     

                <FormControlLabel 
                    control={
                        <Checkbox 
                        color="primary"
                        checked={this.state.raincoat}
                        onChange={this.handleChange('raincoat')}
                        value="raincoat"
                        />
                    } 
                    label="Raincoat" />

                <FormControlLabel 
                    control={
                        <Checkbox 
                        color="primary"
                        checked={this.state.rainboots}
                        onChange={this.handleChange('rainboots')}
                        value="rainboots"
                        />
                    } 
                    label="Rain boots" />

                <FormControlLabel 
                    control={
                        <Checkbox 
                        color="primary"
                        checked={this.state.umbrella}
                        onChange={this.handleChange('umbrella')}
                        value="umbrella"
                        />
                    } 
                    label="Umbrella" />

                <FormControlLabel 
                    control={
                        <Checkbox 
                        color="primary"
                        checked={this.state.sunglasses}
                        onChange={this.handleChange('sunglasses')}
                        value="sunglasses"
                        />
                    } 
                    label="Sunglasses" />
              
            </FormGroup>
            </FormControl> <br />

            </Grid>
            </Grid>
            <Button 
              onClick={this.onSubmit}
              variant="contained"
              color="primary">
              Submit
            </Button>
            </Grid>
           
        </div>
      );
  }
}

export default Preferences;
