import axios from 'axios';

axios.defaults.baseURL = `https://pixabay.com`;

const searchParams = new URLSearchParams({
  key: '30692971-b147f9a702170160ab831dd90',
  image_type: 'photo',
  q: 'yellow+flowers',
  orientation: 'horizontal',
  safesearch: 'true',
  page: 1,
  per_page: 10,
});

export const getImages = async () => {
  const { data } = await axios.get(`/api/?${searchParams}`);
  console.log(data);
  return data;
};
