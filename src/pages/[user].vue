<template>
  <v-container class="fill-height">
    <v-responsive class="align-start text-center fill-height">
      <v-app-bar color="blue-grey-darken-4" class="py-6" density="compact" flat>
        <v-row class="d-flex align-center justify-center">
          <v-col cols="10" md="7" lg="7" xl="7" class="px-xl-0">
            <v-row class="d-flex align-center justify-center">
              <v-col cols="3" class="pl-xl-0">
                <router-link :to="`/gifs/${store.selectedGif.slug}`">
                  <v-img height="50" src="@/assets/logo.png" />
                </router-link>
              </v-col>
              <v-col cols="9">
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-app-bar>

      <v-row class="align-start justify-center pt-16">
        <v-col cols="11" md="8">
          <v-row>
            <v-col cols="12" md="3">
              <v-btn
                prepend-icon="mdi-arrow-left"
                :to="`/gifs/${store.selectedGif.slug}`"
                class="mb-4"
              >Back to Gif</v-btn>
              <v-card
                class="d-flex align-content-start flex-wrap"
                link
                :href="store.selectedGif.user.profile_url" target="_blank" rel="noopener noreferrer"
              >
                <v-img
                  :src="store.selectedGif.user.avatar_url"
                  cover
                ></v-img>
              </v-card>
            </v-col>

            <v-col cols="12" md="9">
              <h1>{{ store.selectedGif.user.username }}</h1>

              <div class="d-flex justify-center mt-1">
                <a
                  :href="store.selectedGif.user.profile_url"
                  target="_blank" rel="noopener noreferrer"
                  color="red"
                  class="text-subtitle-1 font-weight-bold text-amber-accent-1"
                >
                  <span>User page on Giphy </span>
                </a>
                <v-icon
                  size="x-small"
                  color="amber-accent-1"
                  icon="mdi-open-in-new"
                  class="ml-1"
                ></v-icon>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script lang="ts" setup>
  import { useAppStore } from '@/store/appStore';

  const store = useAppStore();
</script>
