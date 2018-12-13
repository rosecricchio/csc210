import React, { Component } from 'react';
import 'whatwg-fetch';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import '../../styles/vendor/normalize.scss'
import '../../styles/home.scss'

class Preferences extends Component {
  constructor(props) {
    super(props);

    this.state = {
        cold: '',
        hot: '',
        coat: false,
        boots: false,
        raincoat: false,
        rainboots: false,
        umbrella: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleColdChange = this.handleColdChange.bind(this);
    this.handleHotChange = this.handleHotChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
      console.log('** in pref mount: user id: ', this.props.id);
  }

  handleChange = name => event => {
      this.setState({ [name]: event.target.checked}, () =>{
        console.log('items: ', name);
      });
  }

  handleColdChange = event => {
    this.setState({ cold: event.target.value }, () => {
        console.log('cold: ' + this.state.cold);
    });
  };

  handleHotChange = event => {
    this.setState({ hot: event.target.value }, () => {
        console.log('hot: ' + this.state.hot);
    });
  };

  onSubmit() {
      const {
          hot,
          cold,
          coat,
          boots,
          raincoat,
          rainboots,
          umbrella,
      } = this.state;

      //fetch-> pass user id and preferences, find user and set preferences in backend

      fetch('/api/account/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
       
        body: JSON.stringify({
          hot: hot,
          cold: cold,
          coat: coat,
          boots: boots,
          raincoat: raincoat, 
          rainboots: rainboots, 
          umbrella: umbrella,
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
              raincoat: raincoat, 
              rainboots: rainboots, 
              umbrella: umbrella,
            });
            this.props.onPref(hot, cold, coat, boots, raincoat, rainboots, umbrella);
            console.log('** in pref- submitted- ', hot);
          } 
        });
  }

  render() { 
    //   const {
    //     hot,
    //     cold,
    //     coat, 
    //     raincoat, 
    //     boots, 
    //     rainboots, 
    //     umbrella, 
    //   } = this.state;

      return (
          <div className="container">
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
              
            </FormGroup>
            </FormControl> <br />

            <Button 
              onClick={this.onSubmit}
              variant="contained"
              color="primary">
              Submit
            </Button>

        </div>
      );
  }
}

export default Preferences;
