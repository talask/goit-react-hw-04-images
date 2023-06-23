import axios from 'axios';
import objToStr from './objToString'

const KEY_API =  '35879532-6dafaab3c006917cb9578f9fc';
const URL = 'https://pixabay.com/api/';
export const options = {
  key: KEY_API,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 12,
  page: 1,
}

export const getPixabayAPI = async (value, page) => {
    options.page = page;
    options.q = value;
    const param = objToStr(options);
   
    const response = await axios.get(`${URL}?${param}`);
    
      return response.data;

}