import React, { Component } from 'react';
import 'whatwg-fetch';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import '../../styles/vendor/normalize.scss'
import '../../styles/home.scss'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.scss";
import WeatherScreen from '../WeatherScreen/WeatherScreen'
import Preferences from '../Preferences/Preferences'

import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      signUpEmail: '',
      signUpPassword: '',
      signUpFirstName: '',
      signUpLastName: '',
      prefCompleted: false,
      userId: '',
      cold: '',
      hot: '',
      coat: false,
      boots: false,
      raincoat: false,
      rainboots: false,
      umbrella: false,
    };

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this);
    this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this);

    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.logout = this.logout.bind(this);

    this.handlePreferences = this.handlePreferences.bind(this);
  }

  handlePreferences = (hot, cold, coat, boots, raincoat, rainboots, umbrella) => {
    this.setState({
      hot: hot, 
      cold: cold, 
      coat: coat, 
      boots: boots, 
      raincoat: raincoat, 
      rainboots: rainboots, 
      umbrella: umbrella,
    });
    console.log('**- in home handle pref- ', hot);
  }

  componentDidMount() {
    const obj = getFromStorage('Weather_App');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token
            });
          } 
        });
    } 
    this.setState({
      isLoading: false,
    });
    console.log('completed: ', this.prefCompleted);
  }

  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value,
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  }

  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value,
    });
  }

  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value,
    });
  }

  onTextboxChangeSignUpFirstName(event) {
    this.setState({
      signUpFirstName: event.target.value,
    });
  }

  onTextboxChangeSignUpLastName(event) {
    this.setState({
      signUpLastName: event.target.value,
    });
  }

  onSignUp() {
    // Grab state
    const {
      signUpEmail,
      signUpPassword,
      signUpFirstName,
      signUpLastName,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('/api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signUpEmail,
        password: signUpPassword,
        firstName: signUpFirstName,
        lastName: signUpLastName,
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpEmail: '',
            signUpPassword: '',
            signUpFirstName: '',
            signUpLastName: '',
          });
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false,
          });
        }
      });
  }

  onSignIn() {
    // Grab state
    const {
      signInEmail,
      signInPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          setInStorage('Weather_App', { token: json.token });
          this.setState({
            signInError: json.success == false ? json.message : '',
            isLoading: false,
            signInPassword: '',
            signInEmail: '',
            token: json.token,
            userId: json.userId,
            prefCompleted: json.completed,
          });
          console.log('**in signin: userId: ', json.userId);
          
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        }
      });
  }

  logout() {
    this.setState({
      isLoading: true,
    });
    const obj = getFromStorage('Weather_App');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: '',
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  render() {
    const {
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword,
      signUpEmail,
      signUpPassword,
      signUpFirstName,
      signUpLastName,
      signUpError,
      prefCompleted,
      userId,
    } = this.state;

    if (isLoading || userId == 'undefined') {
      return (<div><p>Loading...</p></div>);
    }

    // If user is not logged in display login screen
    else if (!token) {
      return (
        <div style={{display: 'flex', justifyContent:"center"}}>
            {
              (signInError) ? (
                <p>{signInError}</p>
              ) : (null)
            }

            <Tabs>
            <div className = "center" style ={{display: 'flex', justifyContent:"center"}}>
            <img src={require('../rsz_cloud.png')} />
            </div>
              <TabList>
                <Tab>Sign In</Tab>
                <Tab>Sign Up</Tab>
              </TabList>

            <TabPanel>
              
            <TextField
              label="Email"
              value={signInEmail}
              onChange={this.onTextboxChangeSignInEmail}
              margin="normal"
            /> <br />
            <TextField
              label="Password"
              type="password"
              value={signInPassword}
              onChange={this.onTextboxChangeSignInPassword}
              margin="normal"
            /> <br />
            <Button 
              onClick={this.onSignIn}
              variant="contained"
              color="primary">
              Sign In
            </Button>
            </TabPanel>
          <br />
          <br />
            {
              (signUpError) ? (
                <p>{signUpError}</p>
              ) : (null)
            }
            <TabPanel>
            <TextField
              label="First Name"
              value={signUpFirstName}
              onChange={this.onTextboxChangeSignUpFirstName}
              margin="normal"
            /> <br />
            <TextField
              label="Last Name"
              value={signUpLastName}
              onChange={this.onTextboxChangeSignUpLastName}
              margin="normal"
            /> <br />
            <TextField
              label="Email"
              value={signUpEmail}
              onChange={this.onTextboxChangeSignUpEmail}
              margin="normal"
            /> <br />
            <TextField
              label="Password"
              type="password"
              value={signUpPassword}
              onChange={this.onTextboxChangeSignUpPassword}
              margin="normal"
            /> <br />
            <Button 
              onClick={this.onSignUp}
              variant="contained"
              color="primary">
              Sign Up
            </Button>
            </TabPanel>
          </Tabs>
        </div>
      );
    }

    // If preferences not completed, display preferences screen
    else if (!prefCompleted && userId != 'undefined') {
          return (
            <div>
            <Preferences id={userId} onPref={this.handlePreferences}/>
            <Button 
              onClick={this.logout}
              variant="contained"
              color="primary">
              Logout
            </Button>
            
            </div>
          );
    }
    else if(prefCompleted && userId != 'undefined'){
      return (
        <div>
          <WeatherScreen />
          <Button 
            onClick={this.logout}
            variant="contained"
            color="primary">
            Logout
          </Button>
        </div>
      );
    }
  }
}

export default Home;