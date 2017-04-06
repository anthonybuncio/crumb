import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'

import LandingPage from './views/landingPage.js'
import SignupPage from './views/signupPage.js'
import LoginPage from './views/loginPage.js'
import HomePage from './views/homePage.js'
import MakeHousePage from './views/createHousePage.js'
import AddExpensePage from './views/addExpensePage.js'
import ProfilePage from './views/profilePage.js'

const app = function() {
  var Router = Backbone.Router.extend({
  	routes : {
  		"" : "showLanding",
      "home" : "showHome",
  		"signup" : "showSignup",
      "signup/:id" : "showSignup",
  		"login" : "showLogin",
      "createhouse" : "makeHouse",
      "addexpense" : "showExpenseForm",
      "myprofile" : "showProfile",
  		"*default" : "handleDefault"
  	},
  	showLanding: function() {
  		ReactDOM.render(<LandingPage />, document.querySelector('.container'))
  	},
    showHome: function() {
      ReactDOM.render(<HomePage />, document.querySelector('.container'))
    },
  	showSignup: function(id) {
  		ReactDOM.render(<SignupPage houseId = {id}/>, document.querySelector('.container'))
  	},
  	showLogin: function() {
  		ReactDOM.render(<LoginPage />, document.querySelector('.container'))
  	},
    makeHouse: function() {
      ReactDOM.render(<MakeHousePage />, document.querySelector('.container'))
    },
    showExpenseForm: function() {
      ReactDOM.render(<AddExpensePage />, document.querySelector('.container'))
    },
    showProfile: function() {
      ReactDOM.render(<ProfilePage />, document.querySelector('.container'))
    },
  	handleDefault: function() {
  		location.hash = ""
  	}
  })
  new Router
  Backbone.history.start()
}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..