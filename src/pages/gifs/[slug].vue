<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-app-bar color="blue-grey-darken-4" class="py-6" density="compact" flat>
        <v-row class="d-flex align-center justify-center">
          <v-col cols="10" md="7" lg="7" xl="7" class="px-xl-0">
            <v-row class="d-flex align-center justify-center">
              <v-col cols="3" class="pl-xl-0">
                <router-link to="/">
                  <v-img height="50" src="@/assets/logo.png" />
                </router-link>
              </v-col>
              <v-col cols="9" class="pr-xl-0">
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-app-bar>

      <v-row class="d-flex align-center justify-center pt-10">
        <v-col cols="12" md="8">
          <v-row class="mb-8">
            <v-col cols="12" md="3">
              <v-card
                v-if="isUserNameExist"
                class="d-flex align-content-start flex-wrap pl-0"
                variant="plain"
                link
                :to="`/${store.selectedGif.user.username}`"
                :title="store.selectedGif.user.username"
              >
                <template v-slot:prepend>
                  <v-avatar color="blue-darken-2">
                    <v-img
                      width="50"
                      height="50"
                      :src="store.selectedGif.user.avatar_url"
                    >
                    <template v-slot:placeholder>
                      <div class="d-flex align-center justify-center fill-height">
                        <v-progress-circular
                          color="grey-lighten-4"
                          indeterminate
                        ></v-progress-circular>
                      </div>
                    </template>
                    </v-img>
                  </v-avatar>
                </template>
              </v-card>
            </v-col>
            <v-col cols="12" md="9" class="d-flex flex-column align-center justify-center">
              <h1 class="mb-1">{{ store.selectedGif.title }}</h1>

              <v-img
                :width="store.selectedGif.images.original.width"
                :height="store.selectedGif.images.original.height"
                max-height="500"
                :src="store.selectedGif.images.original.url"
              >
                <template #sources>
                  <source :srcset="store.selectedGif.images.original.webp">
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
            </v-col>
          </v-row>

          <v-slide-group
            v-model="store.gifs"
            class="pa-0"
            selected-class="bg-success"
            show-arrows
          >
            <v-slide-group-item
              v-for="item in gifs"
              :key="item.id"
            >
              <v-card
                color="blue-grey-lighten-3"

                class="d-flex align-content-start flex-wrap ma-2"
                position="relative"
                link
                :to="`/gifs/${item.slug}`"
                @click="handleGifSelect(item.id)"
              >
                <v-btn
                  position="absolute"
                  :style="{'z-index': 100, top: '5px', right: '5px'}"
                  variant="plain"
                  color="green-lighten-5"
                  density="compact"
                  icon="mdi-link-variant"

                ></v-btn>
                <v-img
                  width="250"
                  :height="item.images.fixed_height_downsampled.height"
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
            </v-slide-group-item>
          </v-slide-group>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script lang="ts" setup>
  import { onMounted, computed, toRaw } from 'vue';
  import type { GifObject } from '@/types/giphyObjectsTypes';
  import { useFetch } from '@/composable/useFetch';
  import { useAppStore } from '@/store/appStore';

  const store = useAppStore();
  const gifs = computed((): GifObject[] => store.getGifs.value);

  const isUserNameExist = Object.hasOwn(store.selectedGif, 'user');

  function handleGifSelect(gifId: string) {
    store.selectedGif = {};
    const rawGifs = toRaw(gifs.value);
    const selectedGif = rawGifs.filter(gif => gif.id === gifId)[0];
    store.setSelectedGif(selectedGif)
  }

  onMounted(() => {
    store.gifs = [];
    useFetch();
  })
</script>
