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
        if (Object.keys(store.gifNotFound).length) {
          store.gifNotFound = {
            type: '',
            id: '',
            title: '',
            slug: '',
            images: {
              original: {
                url: '',
                width: '',
                height: '',
                size: '',
                frames: '',
                mp4: '',
                mp4_size: '',
                webp: '',
                webp_size: '',
              }
            }
          };
        }
        getData(endpointNotFound)
          .then(data => {
            const randomNotFoundGifObject = getRandomItemFromArray(data.data);

            store.setGifNotFound(randomNotFoundGifObject);
            store.setLoading(false);
          });
      }

      store.setGifs(data.data);
      store.setTotalCount(data.pagination.total_count);
      store.setLoading(false);
    });
}
