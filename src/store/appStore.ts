import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { Ref } from 'vue';
import { GifObject } from '../types/giphyObjectsTypes';

export const useAppStore = defineStore('app', () => {
  const gifs: Ref<GifObject[]> = ref([]);
  const gifNotFound: Ref<{}> = ref({});
  const search: Ref<string> = ref('');
  const selectedGif = ref({});
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

  function setSelectedGif(payload: object) {
    selectedGif.value = payload;
  }

  function setLoading(loading: boolean) {
    isLoading.value = loading;
  }

  function setGifNotFound(payload: GifObject) {
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
