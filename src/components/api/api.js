import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '19208174-4a8a1fc5d875fb3b1b47e04d4',
    q: '',
    page: '1',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: '12',
  },
});

export const searchResults = (q, page) => {
  return instance.get('/', {
    params: { ...instance.defaults.params, q, page },
  });
};
