<template>
  <v-app-bar v-if="isShown" color="blue-grey-darken-4" class="pt-4" flat>
    <v-row class="d-flex align-center justify-center">
      <v-col cols="12">
        <v-banner
          bg-color="green-lighten-3"
          lines="one"
          color="deep-purple-accent-4"
          class="d-flex align-center justify-center"
        >
          <template v-slot:prepend>
            <v-avatar
              color="green-darken-2"
              icon="mdi-download-box"
            ></v-avatar>
          </template>

          <div class="d-flex flex-column align-center justify-center">
            <v-banner-text class="mb-2">
              This site can be installed as an application.
            </v-banner-text>

            <v-banner-actions class="pb-4 ma-auto ml-0">
              <v-btn
                color="light-blue-darken-4"
                variant="elevated"
                class="mr-4"
                @click="installPWA"
              >Install!</v-btn>

              <v-btn
                color="blue-grey-darken-1"
                variant="elevated"
                @click="dismissPrompt"
              >No, thanks</v-btn>
            </v-banner-actions>
          </div>
        </v-banner>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script setup lang="ts">
  import { ref, onBeforeMount } from 'vue';
  import type { Ref } from 'vue';

  let installEvent: any = ref(undefined);
  const isShown: Ref<boolean> = ref(false);

  onBeforeMount(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      installEvent.value = e
      isShown.value = true
    })
  })

  function dismissPrompt() {
    isShown.value = false;
  }

  function installPWA() {
    installEvent.value.prompt()
    installEvent.value.userChoice.then((choice: any) => {
      dismissPrompt();
      if (choice.outcome === 'accepted') {
        console.log('User accepted');

      } else {
        console.log('User denied');
      }
    })
  }
</script>

<style scoped>

</style>
