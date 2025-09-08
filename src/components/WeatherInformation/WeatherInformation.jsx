import './WeatherInformation.css'
import CeuLimpo from '../../assets/Ceu-Limpo.png'
import ChuvaForte from '../../assets/chuva-forte.png'
import ChuvaLeve from '../../assets/chuva-leve.png'
import Nublado from '../../assets/Nublado.png'
import NuvensDispersas from '../../assets/Nuvens-Dispersas.png'

function WeatherInformation({ weather }){

    // Verificar se weather existe e tem as propriedades necessárias
    if (!weather || !weather.weather || !weather.weather[0] || !weather.main) {
        return null;
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
        <div className='weather-container'>
            <h2 className='city-name'>{weather.name}</h2>
            <p className='temperature'>{Math.round(weather.main.temp)}°C</p>
            <div className='weather-icon'>
                <img 
                    src={getWeatherImage(weather.weather[0].icon)} 
                    alt={weather.weather[0].description}
                /> 
            </div>
            <p className='description'>{weather.weather[0].description}</p>
            <div className='details'>
               <p>Sensação térmica: {Math.round(weather.main.feels_like)}°C</p>
               <p>Umidade: {weather.main.humidity}%</p>
               <p>Pressão: {weather.main.pressure}</p>
            </div>
        </div>
    );

}

export default WeatherInformation


