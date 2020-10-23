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
          <q-btn @click="showRadioButtons = !showRadioButtons" dense unelevated size="12px" color="white" text-color="amber" label="Editar" />
      </div>
      <h5 class="text-h5 text-weight-bold on-right">Pastas</h5>
      <q-scroll-area class="fit">
          <q-list bordered separator>
              <folder
                v-for="(folder, key) in folders"
                :key="key"
                :folder="folder"
                :showRadioButtons="showRadioButtons"
                :id="key"></folder>
          </q-list>
      </q-scroll-area>
      <div class="q-pa-sm fixed-bottom-right on-left">
          <q-btn @click="showAddFolder = true" dense unelevated size="12px" color="white" text-color="amber" label="Nova pasta" />
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog v-model="showAddFolder" persistent>
        <add-folder-modal @add="addFolder"></add-folder-modal>
    </q-dialog>
   
    <q-dialog v-model="showEditFolder" persistent>
        <edit-folder-modal @reset="resetFolderValue"></edit-folder-modal>
    </q-dialog>
   
  </q-layout>
</template>

<script>
import { db } from 'boot/database.js'
export default {
  name: 'MainLayout',
  components: {
    'add-folder-modal' : require('components/Folders/Modals/AddFolder.vue').default,
    'edit-folder-modal': require('components/Folders/Modals/EditFolder.vue').default,
    'folder': require('components/Folders/Folder.vue').default
  },
  data () {
    return {
      leftDrawerOpen: false,
      showRadioButtons: false,
      showAddFolder: false,
      folderValue: '',
      folders: []
    }
  },
  computed: {
    showEditFolder() {
      return this.folderValue == '' ? false : true
    }
  },
  methods: {
   getFolders() {
      db.collection('folders').get().then(folders => {
        this.folders = folders
      })
    },
    resetFolderValue() {
      this.folderValue = ''
      this.showRadioButtons = false
    },
    addFolder(newFolder) {
      this.folders.push(newFolder)
    }
  },
  created() {
    this.getFolders()
  }
}
</script>
