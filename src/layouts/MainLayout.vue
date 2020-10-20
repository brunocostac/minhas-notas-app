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
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Minhas notas
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <div class="q-pa-sm fixed-top-right on-left">
          <q-btn dense unelevated size="12px" color="white" text-color="amber" label="Editar" />
      </div>
      <h5 class="text-h5 text-weight-bold on-right">Pastas</h5>
      <q-scroll-area class="fit">
          <q-list bordered separator>
            <q-item clickable v-ripple>
              <q-item-section>Estudos</q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label>Churrasco</q-item-label>              
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label>Dentista</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
      </q-scroll-area>
      <div class="q-pa-sm fixed-bottom-right on-left">
          <q-btn dense unelevated size="12px" color="white" text-color="amber" label="Nova pasta" />
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>
