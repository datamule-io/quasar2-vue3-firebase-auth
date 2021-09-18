<template>
  <q-page class="flex q-pa-md justify-center items-center">
    <q-card style="width:100%; max-width:500px;" class="">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey-7 bg-grey-3"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        switch-indicator
        active-bg-color="white"
      >
        <q-tab name="login" label="Sign in" />
        <q-tab name="register" label="Sign up" />
      </q-tabs>


      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="login" class="q-pa-none">
          <AuthComponent :tab="tab" />
        </q-tab-panel>

        <q-tab-panel name="register" class="q-pa-none">
          <AuthComponent :tab="tab"/>
          <div class="q-ma-sm">
            <b>Note:</b> By signing up you agree to our terms of use and privacy policy
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import AuthComponent from "components/AuthComponent";
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Auth',
  components: { AuthComponent },
  setup () {
    const tab = ref('login');
    return {
      tab
    }
  }
});
</script>
