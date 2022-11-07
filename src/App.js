import React,{Component} from "react";
import Weather from "./components/Weather";
import Form from "./components/Form";


const API_KEY="943e421b040ba3d137f65faf4612851b";
class App extends Component{


  state={
      tempreature:'',
      country:'',
      city:'',
      humidity:'',
      description:'',
      error:''
  }

  getWeather= async (e)=>{
    const country=e.target.elements.country.value;
    const city=e.target.elements.city.value;
    e.preventDefault();
    const api =await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}%2C${country}&appid=${API_KEY}`);
    const data =await api.json();
    console.log(data);
    if(data.cod!="404"){
      this.setState({
        tempreature:data.main.temp,
        country:data.sys.country,
        city:data.name,
        humidity:data.main.humidity,
        description:data.weather[0].description,
        error:''
      })
    }else
    {
      this.setState({
        tempreature:'',
      country:'',
      city:'',
      humidity:'',
      description:'',
      error:'Does not found, re-enter the city'
      })
    }
    console.log(this.state.description,this.state.humidity,this.state.tempreature);
  }
  render(){
    return (
      <div className="Wrapper"> 
        <div className="container">
        <Form getWeather={this.getWeather}/>
        <Weather
        tempreature={this.state.tempreature}
        city={this.state.city}
        country={this.state.country}
        humidity={this.state.humidity}
        description={this.state.description}
        error={this.state.error}
        />
        </div>
      </div>
    );
  }
}

export default App;
