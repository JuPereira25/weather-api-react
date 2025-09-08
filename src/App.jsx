import { useState, useRef } from "react";
import axios from "axios";
import "./App.css";
import WeatherInformation from "./components/WeatherInformation/WeatherInformation";
import Weatherinformation5Days from "./components/Weatherinformation5Days/Weatherinformation5Days";

function App() {
  const [weather, setWeather] = useState(null);
  const [weather5Days, setWeather5Days] = useState(null);

  const inputRef = useRef();

  async function searchCity() {
    const city = inputRef.current.value;

    if (!city.trim()) {
      alert("Por favor, digite o nome de uma cidade");
      return;
    }

    const key = "c65582f6ed81df0ed3e2e793ca1fd5fe";

    try {
      {
        /* chamada assincrona */
      }
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`;
      const url5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`;

      {
        /* requisição */
      }
      const apiInfo = await axios.get(url);
      const apiInfo5Days = await axios.get(url5Days);

      setWeather5Days(apiInfo5Days.data);
      setWeather(apiInfo.data);
    } catch (error) {
      console.error("Erro ao buscar dados do clima:", error);
      alert(
        "Erro ao buscar dados do clima. Verifique se o nome da cidade está correto."
      );
    }
  }

  return (
    <div className="container">
      <h1>Previsão do Tempo</h1>
      <input ref={inputRef} type="text" placeholder="Digite o nome da cidade" />
      <button onClick={searchCity}>Buscar</button>

      {weather && <WeatherInformation weather={weather} />}
      {weather5Days && <Weatherinformation5Days weather5Days={weather5Days} />}
    </div>
  );
}

export default App;
