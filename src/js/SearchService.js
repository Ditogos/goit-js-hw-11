import { Notify } from 'notiflix/build/notiflix-notify-aio';
export { SearchService, Notify };
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '40248939-f712c7f983066a304da5b3485';

async function SearchService(currentPage, searchQuery) {
  const parameters = new URLSearchParams({
    key: API_KEY,
    image_type: `photo`,
    orientation: `horizontal`,
    safesearch: `true`,
    per_page: '40',
    q: searchQuery,
    page: currentPage,
  });

  try {
    const resp = await axios.get(`${BASE_URL}?${parameters}`);
    if (resp.status !== 200) {
      throw new Error(`HTTP Error! Status: ${resp.status}`);
    }
    return resp.data;
  } catch (error) {
    Notify.failure(
      `Unfortunately, there are no images matching your request. Please try again.`
    );
    throw error;
  }
}
