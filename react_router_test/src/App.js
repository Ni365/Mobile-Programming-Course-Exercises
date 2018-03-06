import React, { Component} from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {

const Navigator = () => (

  <div>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" />
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossOrigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossOrigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossOrigin="anonymous"></script>

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <Link class="navbar-brand" to ="/">React router test page</Link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
            <Link class="nav-item nav-link active" to="/" >Home</Link>
            <Link class="nav-item nav-link" to="/about">About</Link>
            <Link class="nav-item nav-link" to="/contact">Contact</Link>
        </div>
      </div>
    </nav>
  </div>

)



const Main = () => (
  <main>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/about' component={About}/>
        <Route path='/contact' component={Contact}/>
      </Switch>
  </main>
  )

const About = () => (
<div>
  <h1>This is the about page</h1>
</div>
)

const Contact = () => (
<div>
  <h1>This is the contact page</h1>
</div>
)

const Home = () => (
<div>
  <h1>This is the home page</h1>
</div>
)


const App = () => (
<div>
  <Navigator />
  <Main />
</div>
)
    return (


      <BrowserRouter>
        <div>
          <Navigator />
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
