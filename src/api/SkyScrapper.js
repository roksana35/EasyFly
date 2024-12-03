import axios from 'axios';

const skyScrapperAPI = axios.create({
  baseURL: 'https://sky-scrapper.p.rapidapi.com/api/v2',
  headers: {
    'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
    
  },
});
console.log(process.env.REACT_APP_RAPIDAPI_KEY)

export default skyScrapperAPI;