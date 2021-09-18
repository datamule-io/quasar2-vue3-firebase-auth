<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>
        <div>
          <q-btn-dropdown
            unelevated
            flat
            color="white"
            label="Account"
          >
            <q-list>
              <q-item class="bg-grey-3">
                <q-item-title>
                  Logged in as <br><b>{{email}}</b>
                </q-item-title>
              </q-item>
              <q-item clickable v-close-popup @click="logout">
                <q-item-section>
                  <q-item-label>Logout</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import router from '../router'
import { useQuasar } from "quasar";
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
];

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const email = ref('');
    const name = ref('');
    const $q = useQuasar();
    const auth = getAuth();
    // if we want to get the user details, this is how its done
    onAuthStateChanged(auth, (user) => {
      if (user) {
        email.value = user.email;
        name.value = user.displayName;
      }
    });
    const logout = () => {
      getAuth().signOut()
      router.push('/auth/login')
        .then(() => {
          $q.notify({message: 'Sign Out Success.'})
        })
        .catch(error =>  console.log('error',error))
    }
    return {
      essentialLinks: linksList,
      email,
      name,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      logout
    }
  }
})
</script>
