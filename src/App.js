import React from 'react';
import Info from './components/Info'
import Form from './components/Form'
import Weather from './components/Weather'
import './App.css'

const API_KEY = 'f92e12be5a8a4099250d7ba183b4a353';


class App extends React.Component {

  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    pressure: undefined,
    sunset: undefined,
    error: undefined,
  }

  gettingWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;


    if (city) {

      const api_url = await
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await api_url.json();

      const sunset = data.sys.sunset;
      const date = new Date();
      date.setTime(sunset);
      const sunset_date = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()

      this.setState({
        temp: data.main.temp,
        city: data.name,
        country: data.sys.country,
        pressure: data.main.pressure,
        sunset: sunset_date,
        error: undefined
      });
    }
    else {
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        pressure: undefined,
        sunset: undefined,
        error: 'Введите название города.'
      });

    }
  }

  render() {
    return (
      <div className='wrapper'>
        <Info />
        <Form weatherMethod={this.gettingWeather} />
        <Weather
          temp={this.state.temp}
          city={this.state.city}
          country={this.state.country}
          pressure={this.state.pressure}
          sunset={this.state.sunset}
          error={this.state.error}
        />
      </div>
    )
  }

}

export default App
