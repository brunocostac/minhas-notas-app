<template>
  <div>
    <div class="q-pa-sm fixed-top-right on-left">
      <q-btn
        @click="showRadioButtons = !showRadioButtons"
        dense
        unelevated
        size="12px"
        color="white"
        text-color="amber"
        label="Editar"
      />
    </div>
    <h5 class="text-h5 text-weight-bold on-right">Pastas</h5>
    <q-list bordered separator>
      <q-item v-for="folder in folders" :key="folder.id" tag="label" v-ripple>
        <q-item-section avatar>
          <q-radio
            v-model="folderValue"
            :val="folder.id"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ folder.name }} {{ folder.id }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <div class="q-pa-sm fixed-bottom-right on-left">
      <q-btn
        @click="showAddFolderModal = true"
        dense
        unelevated
        size="12px"
        color="white"
        text-color="amber"
        label="Nova pasta"
      />
    </div>
    <q-dialog v-model="showAddFolderModal" persistent>
      <add-folder-modal></add-folder-modal>
    </q-dialog>
    <q-dialog v-model="showEditFolderModal" persistent>
      <edit-folder-modal></edit-folder-modal>
    </q-dialog>
  </div>
</template>

<script>
import { db } from "boot/database";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    "add-folder-modal": require("components/Folders/Modals/AddFolder.vue")
      .default,
    "edit-folder-modal": require("components/Folders/Modals/EditFolder.vue")
      .default,
  },
  computed: {
    ...mapGetters("folders", ["folders"]),
  },
  data() {
    return {
      showRadioButtons: false,
      showAddFolderModal: false,
      showEditFolderModal: false,
      folderValue: null
    };
  },
  methods: {
    ...mapActions("folders", ["idbReadFolders"]),
  },
  mounted() {
    this.idbReadFolders();
  },
};
</script>