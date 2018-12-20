This project completed by team BRAJ.

Github: https://github.com/rosecricchio/csc210

Technologies used: 

React, Node, Express, MongoDB, Mongoose, MaterialUI

The purpose of this project is to obtain weather data and certain user preferences and make recommendations based on this data.

We used a third party API called Darky Sky to get weather data: https://darksky.net/dev

MERN boilerplate code and tutorial from:  

https://github.com/keithweaver/MERN-boilerplate  

https://medium.com/@Keithweaver_/building-a-log-in-system-for-a-mern-stack-39411e9513bd  

This tutorial was used to set up the basic user login system using a MERN (MongoDB, Express, React, Node) stack. 

New users will first see a signin/signup screen. After successfully signing up they may log in. At first login, they will be met with a user preferences survey. Once this is completed they will be taken to the weather screen. Local storage is utilized to keep users logged in. If the survey has been completed, when logging in the user will be taken directly to the weather screen.

In the server folder are models of User, UserPreference, and UserSession objects, to be created and stored in the database when needed. In this folder is also signin.js, containing all the post requests necessary for signing up/in, and preferences.js, containing the post requests for setting and getting user preferences. 

In the client folder are all of the React components for the webpages. Home.js renders the signin screen, preferences screen, or weather screen based on the values of certain variables (we test to see if preferences have been completed or not, if the user has a token and can be automatically logged in or not). Preferences.js contains the functions and render method relevant to the preferences survey, and WeatherScreen.js functions similarly. 

MongoDB, and specifically Mongoose, a library for Node.js and MongoDB, is used for the database component. User, UserPreference, and UserSession objects are stored. 

Requirements:  

-A MongoDB database is used to persists the app's data using the User, UserPreference, and UserSession models. 

-get/post requests are used to put data into and get data from the database.  

-The frontend displays data based on the results from the third party api and the user-entered preferences.

