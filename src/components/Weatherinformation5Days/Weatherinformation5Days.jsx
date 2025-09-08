import "./Weatherinformation5Days.css";
import CeuLimpo from '../../assets/Ceu-Limpo.png'
import ChuvaForte from '../../assets/chuva-forte.png'
import ChuvaLeve from '../../assets/chuva-leve.png'
import Nublado from '../../assets/Nublado.png'
import NuvensDispersas from '../../assets/Nuvens-Dispersas.png'

function Weatherinformation5Days({ weather5Days }) {
  console.log(weather5Days);

  // Verificar se weather5Days existe
  if (!weather5Days || !weather5Days.list) {
    return null;
  }

  let dailyForecast = {};

  for (let forecast of weather5Days.list) {
    const date = new Date(forecast.dt * 1000).toLocaleDateString();

    if (!dailyForecast[date]) {
      dailyForecast[date] = forecast;
    }
  }

  const next5DaysForecast = Object.values(dailyForecast).slice(1, 6);

  function convertDate(date) {
    const newDate = new Date(date.dt * 1000).toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "2-digit",
    });

    return newDate;
  }

  // Função para mapear códigos de clima para imagens locais
  const getWeatherImage = (weatherCode) => {
    const code = weatherCode.toLowerCase();
    
    // Mapeamento baseado nos códigos da API OpenWeatherMap
    if (code.includes('01d') || code.includes('01n')) {
      return CeuLimpo; // Céu limpo
    } else if (code.includes('02d') || code.includes('02n') || code.includes('03d') || code.includes('03n')) {
      return NuvensDispersas; // Poucas nuvens / nuvens dispersas
    } else if (code.includes('04d') || code.includes('04n')) {
      return Nublado; // Nublado
    } else if (code.includes('09d') || code.includes('09n') || code.includes('10d') || code.includes('10n')) {
      return ChuvaLeve; // Chuva leve
    } else if (code.includes('11d') || code.includes('11n')) {
      return ChuvaForte; // Tempestade / chuva forte
    } else if (code.includes('13d') || code.includes('13n')) {
      return Nublado; // Neve (usando nublado como fallback)
    } else if (code.includes('50d') || code.includes('50n')) {
      return Nublado; // Névoa (usando nublado como fallback)
    } else {
      return CeuLimpo; // Imagem padrão
    }
  };

  return (
    <div className="weather-container">
      <h3>Previsão Próximos 5 Dias</h3>
      <div className="weather-list">
        {next5DaysForecast.map((forecast) => (
          <div key={forecast.dt} className="weather-item">
            <p className="forecast-day">{convertDate(forecast)}</p>
            <img
              src={getWeatherImage(forecast.weather[0].icon)}
              alt={forecast.weather[0].description}
            />
            <p className="forecast-description">
              {forecast.weather[0].description}
            </p>
            <p>
              {Math.round(forecast.main.temp_min)}°C min /{" "}
              {Math.round(forecast.main.temp_max)}°C máx
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Weatherinformation5Days;
