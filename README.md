# Previsão do Tempo

Uma aplicação web desenvolvida em React que consome a API do OpenWeatherMap para exibir informações meteorológicas em tempo real e previsão para os próximos 5 dias.

## Objetivo do Projeto

O principal objetivo deste projeto é demonstrar como consumir APIs externas em aplicações React, incluindo:

- Como fazer requisições HTTP para APIs
- Como tratar dados recebidos de APIs
- Como gerenciar estados de carregamento e erro
- Como integrar dados de API com componentes React
- Como implementar tratamento de erros em chamadas assíncronas

## Tecnologias Utilizadas

- **React 19.1.1** - Biblioteca para interface de usuário
- **Vite** - Build tool e servidor de desenvolvimento
- **Axios** - Cliente HTTP para requisições à API
- **CSS3** - Estilização da aplicação
- **OpenWeatherMap API** - Fonte de dados meteorológicos

## Funcionalidades

- Busca de previsão do tempo por cidade
- Exibição de informações meteorológicas atuais
- Previsão para os próximos 5 dias
- Imagens personalizadas para diferentes condições climáticas
- Interface responsiva e intuitiva
- Tratamento de erros para cidades não encontradas

## Como Usar

1. Digite o nome de uma cidade no campo de busca
2. Clique no botão "Buscar"
3. Visualize as informações meteorológicas e a previsão dos próximos dias

## Configuração da API

### OpenWeatherMap API

Este projeto utiliza a API do OpenWeatherMap para obter dados meteorológicos. Para usar a aplicação:

1. Acesse [OpenWeatherMap](https://openweathermap.org/api)
2. Crie uma conta gratuita
3. Obtenha sua chave de API (API Key)
4. Substitua a chave no arquivo `src/App.jsx`:

```javascript
const key = "SUA_CHAVE_AQUI";
```

### Endpoints Utilizados

- **Tempo Atual**: `https://api.openweathermap.org/data/2.5/weather`
- **Previsão 5 Dias**: `https://api.openweathermap.org/data/2.5/forecast`

### Parâmetros da API

- `q`: Nome da cidade
- `appid`: Chave da API
- `lang`: Idioma (pt_br para português)
- `units`: Unidade de temperatura (metric para Celsius)

## Estrutura do Projeto

```
src/
├── components/
│   ├── WeatherInformation/
│   │   ├── WeatherInformation.jsx
│   │   └── WeatherInformation.css
│   └── Weatherinformation5Days/
│       ├── Weatherinformation5Days.jsx
│       └── Weatherinformation5Days.css
├── assets/
│   ├── Ceu-Limpo.png
│   ├── chuva-forte.png
│   ├── chuva-leve.png
│   ├── Nublado.png
│   └── Nuvens-Dispersas.png
├── App.jsx
├── App.css
├── main.jsx
└── index.css
```

## Como Consumir APIs

### 1. Instalação do Axios

```bash
npm install axios
```

### 2. Importação e Uso

```javascript
import axios from 'axios';

async function fetchData() {
  try {
    const response = await axios.get('URL_DA_API');
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}
```

### 3. Tratamento de Erros

```javascript
try {
  const apiInfo = await axios.get(url);
  setWeather(apiInfo.data);
} catch (error) {
  console.error('Erro ao buscar dados:', error);
  alert('Erro ao buscar dados. Verifique se o nome da cidade está correto.');
}
```

### 4. Estados de Carregamento

```javascript
const [loading, setLoading] = useState(false);

async function searchCity() {
  setLoading(true);
  try {
    // Fazer requisição
  } catch (error) {
    // Tratar erro
  } finally {
    setLoading(false);
  }
}
```

## Estrutura de Dados da API

### Resposta do Tempo Atual

```javascript
{
  "name": "São Paulo",
  "main": {
    "temp": 25.5,
    "feels_like": 28.2,
    "humidity": 60,
    "pressure": 1013
  },
  "weather": [{
    "main": "Clear",
    "description": "céu limpo",
    "icon": "01d"
  }]
}
```

### Resposta da Previsão 5 Dias

```javascript
{
  "list": [
    {
      "dt": 1640995200,
      "main": {
        "temp_min": 20,
        "temp_max": 28
      },
      "weather": [{
        "description": "chuva leve",
        "icon": "10d"
      }]
    }
  ]
}
```

## Limitações

- Requer chave de API válida do OpenWeatherMap
- Dependente de conexão com internet
- Limitações de requisições da API gratuita (1000 requisições/dia)