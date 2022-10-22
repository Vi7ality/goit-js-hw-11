import axios from 'axios';

axios.defaults.baseURL = `https://pixabay.com`;

const querystring = require('querystring');

export const searchParams = {
  key: '30692971-b147f9a702170160ab831dd90',
  image_type: 'photo',
  q: 'yellow+bird',
  orientation: 'horizontal',
  safesearch: 'true',
  page: 1,
  per_page: 40,
};

export const getImages = async searchQ => {
  searchParams.q = searchQ;
  searchParams.page = 1;
  const { data } = await axios.get(
    `/api/?${querystring.stringify(searchParams)}`
  );
  return data;
};

export const getMoreImages = async () => {
  searchParams.page += 1;
  const { data } = await axios.get(
    `/api/?${querystring.stringify(searchParams)}`
  );
  return data;
};
