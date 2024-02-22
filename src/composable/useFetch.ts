import { getData } from '../utils/api';
import { useAppStore } from '@/store/appStore';
import getRandomItemFromArray from '../utils/getRandomItemFromArray';

export function useFetch(options?: { search?: string }) {
  const store = useAppStore();

  store.setLoading(true);

  const { search } = options || {};
  const limit = 50;
  const offset = store.gifs.length;

  const endpoint = `/gifs/${search ? 'search' : 'trending' }/?api_key=${import.meta.env.VITE_GIPHY_API_KEY}&limit=${limit}&offset=${offset}${search ? `&q=${search}` : ''}`;
  const endpointNotFound = `/gifs/search/?api_key=${import.meta.env.VITE_GIPHY_API_KEY}&limit=${limit}&offset=${offset}&&q=not found`;

  getData(endpoint)
    .then(data => {
      if (!data.pagination.total_count) {
        getData(endpointNotFound)
          .then(data => {
            console.log(data.data);
            const randomNotFoundGifObject = getRandomItemFromArray(data.data);
            console.log(randomNotFoundGifObject);


            store.setGifNotFound(randomNotFoundGifObject);
            store.setLoading(false);
          });
      }

      store.setGifs(data.data);
      store.setTotalCount(data.pagination.total_count);
      store.setLoading(false);
    });
}
