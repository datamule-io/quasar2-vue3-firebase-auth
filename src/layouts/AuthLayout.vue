<template>
  <q-layout view="lHh Lpr fff" class="bg-grey-1 main-layout">
    <!--<q-header class="bg-grey-1 text-grey-8" height-hint="64">-->
    <!--<img class="logo" src="statics/charttt-logo.svg">-->
    <!--</q-header>-->
    <q-page-container class="page-container full-height">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AuthLayout',

  setup () {
    return {
    }
  }
})
</script>
