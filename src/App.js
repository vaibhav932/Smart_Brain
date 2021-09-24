import { Component } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

const app = new Clarifai.App({
  apiKey: 'eff0a0d2ea2a44bab093b45adc3b8738'
});

const particlesOptions = {
  particles: {
    number: {
      value : 60,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box:{},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }



  calculateFaceLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
    
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) =>{
    this.setState({input: event.target.value});
  }
  onButtonChange = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
      .then(response => {
        console.log('hi', response)
        if (response) {
          const putMethod = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id:this.state.user.id
            })
          }
          fetch('http://localhost:3000/image', putMethod)
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })

        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route==='signout'){
      this.setState({isSignedIn: false})
    } else if(route==='home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }


  render(){
  return (
    <div className="App">

<Particles className="particles"
              params={particlesOptions}
              
            />


     <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
     {this.state.route === 'home' 
     ?<div><Logo />
     <Rank name={this.state.user.name} entries = {this.state.user.entries}/>
     <ImageLinkForm onInputChange = {this.onInputChange} onButtonChange = {this.onButtonChange} />
     <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
    </div>
    :(this.state.route === 'signin'
    ?<SignIn loadUser={this.loadUser} onRouteChange = {this.onRouteChange} />
    :<Register loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>)
    }
    </div>
  );
}
}
export default App;
