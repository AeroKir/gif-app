<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-app-bar color="blue-grey-darken-4" class="py-6" density="compact" flat>
        <v-row class="d-flex align-center justify-center">
          <v-col cols="10" md="7" lg="7" xl="7" class="px-xl-0">
            <v-row class="d-flex align-center justify-center">
              <v-col cols="2" class="pl-xl-0">
                <router-link to="/">
                  <v-img src="@/assets/logo.png" />
                </router-link>
              </v-col>
              <v-col cols="10" class="pr-xl-0">
                <v-text-field
                  label="Search all the GIFs"
                  prepend-inner-icon="mdi-magnify"
                  hide-details="auto"
                  v-model="searchQuery"
                  @input="handleSearch()"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-app-bar>

      <v-progress-circular
        v-if="isLoading"
        indeterminate
        size="64"
        color="blue-grey-lighten-5"
        class="h-screen align-center justify-center"
      ></v-progress-circular>

      <v-row class="d-flex align-center justify-center pt-10">
        <v-col cols="11" md="11" lg="8" xl="8">
          <div v-if="Object.keys(gifNotFound).length && !totalCount" class="d-flex flex-column align-center justify-center">
            <p class="mb-2">OOPS! Nothing was found (:</p>
            <v-img
              :width="gifNotFound.images.original.width"
              :height="gifNotFound.images.original.height"
              :src="gifNotFound.images.original.url"
              cover
            >
            <template #sources>
              <source :srcset="gifNotFound.images.original.webp">
            </template>
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular
                  color="grey-lighten-4"
                  indeterminate
                ></v-progress-circular>
              </div>
            </template>
            </v-img>
          </div>

          <div class="container">
            <v-card
              v-for="item in gifs"
              :key="item.id"
              color="blue-grey-lighten-3"
              class="d-flex align-content-start flex-wrap mb-3"
              position="relative"
              link
              :to="`/gifs/${item.slug}`"
              @click="handleGifSelect(item.id)"
            >
              <v-btn
                position="absolute"
                :style="{'z-index': 100, top: '10px', right: '10px'}"
                variant="plain"
                color="green-lighten-5"
                density="compact"
                icon="mdi-link-variant"
                @click.prevent="handleShare(item.images.original.url, item.title)"
              ></v-btn>
              <v-img
                :src="item.images.fixed_height_downsampled.url"
                cover
              >
                <template #sources>
                  <source :srcset="item.images.fixed_height_downsampled.webp">
                </template>
                <template v-slot:placeholder>
                  <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular
                      color="grey-lighten-4"
                      indeterminate
                    ></v-progress-circular>
                  </div>
                </template>
              </v-img>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onBeforeUnmount, toRaw } from 'vue';
  import type { Ref } from 'vue';
  import { useAppStore } from '@/store/appStore';
  import { useFetch } from '@/composable/useFetch';
  import type { GifObject, GifNotFoundObject } from '@/types/giphyObjectsTypes';
  import throttle from '@/utils/throttle';
  import debounce from '@/utils/debounce';

  const store = useAppStore();
  const gifs = computed((): GifObject[] => store.getGifs.value);
  const totalCount = computed((): number => store.getTotalCount.value);
  const gifNotFound = computed((): GifNotFoundObject => store.getGifNotFound.value);
  const isLoading = computed((): boolean => store.isLoading);
  const searchQuery: Ref<string> = ref('');

  const handleSearch = debounce(() => {
    store.gifs = [];
    useFetch({search: searchQuery.value})
  }, 1000);

  function handleScroll() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const bodyHeight = document.body.offsetHeight;

    if (scrollY + windowHeight >= bodyHeight * 0.95) {
      useFetch();
    }
  }

  const throttledFetchData = throttle(handleScroll, 300);

  function handleGifSelect(gifId: string) {
    const rawGifs = toRaw(gifs.value);
    const selectedGif: GifObject = rawGifs.filter(gif => gif.id === gifId)[0];

    store.setSelectedGif(selectedGif)
  }

  function handleShare(itemUrl: string, itemTitle: string) {
    navigator.share({
      title: itemTitle,
      // text: 'Text to be shared',
      url: itemUrl
    })
  }

  onMounted(() => {
    useFetch();
    window.addEventListener('scroll', throttledFetchData);
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', throttledFetchData);
  })
</script>

<style>
  .container {
    column-count: 4;
    column-gap: 10px;
  }

  @media screen and (max-width: 600px) {
    .container {
      column-count: 2;
    }
  }
</style>
