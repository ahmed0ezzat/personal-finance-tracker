import axios from 'axios';

export const fetchExchangeRatesApi = async () => {
  try {
    const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/USD`);
    return response.data;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw error;
  }
};
