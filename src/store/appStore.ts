import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { Ref } from 'vue';
import { GifObject, SelectedGifObject, GifNotFoundObject } from '../types/giphyObjectsTypes';

export const useAppStore = defineStore('app', () => {
  const gifs: Ref<GifObject[]> = ref([]);
  const gifNotFound: Ref<GifNotFoundObject> = ref({
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
  });
  const search: Ref<string> = ref('');
  const selectedGif: Ref<SelectedGifObject> = ref({
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
      },
      user: {
        avatar_url: '',
        banner_url: '',
        profile_url: '',
        username: '',
        display_name: '',
      }
  });
  const totalCount: Ref<number> = ref(0);
  const isLoading: Ref<boolean> = ref(false);

  const getGifs = computed(() => gifs);
  const getGifNotFound = computed(() => gifNotFound);
  const getTotalCount = computed(() => totalCount);
  const getSelectedGif = computed(() => selectedGif);
  const getSearch = computed(() => search);

  function setGifs(payload: GifObject[]) {
    gifs.value.push(...payload);
  }

  function setTotalCount(count: number) {
    totalCount.value = count;
  }

  function setSelectedGif(payload: SelectedGifObject) {
    selectedGif.value = payload;
  }

  function setLoading(loading: boolean) {
    isLoading.value = loading;
  }

  function setGifNotFound(payload: GifNotFoundObject) {
    gifNotFound.value = payload;
  }

  function setSearch(payload: string) {
    search.value = payload;
  }

  return {
    gifs,
    gifNotFound,
    selectedGif,
    getGifs,
    getGifNotFound,
    getTotalCount,
    getSelectedGif,
    isLoading,
    getSearch,
    setGifs,
    setTotalCount,
    setSelectedGif,
    setLoading,
    setGifNotFound,
    setSearch,
  };
});
