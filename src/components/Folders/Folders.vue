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
      <q-item
        v-for="folder in folders"
        :key="folder.id"
        :to="'/notes/' + folder.id"
        @click="vuexSelectFolder(folder.id)"
        tag="label"
        v-ripple
        exact
        clickable
      >
        <q-item-section avatar>
          <q-radio
            v-if="showRadioButtons"
            v-model="folderValue"
            :val="folder.id"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ folder.name }}</q-item-label>
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
    <q-dialog v-model="showOptionsEditOrDelete" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
          repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis
          perferendis totam, ea at omnis vel numquam exercitationem aut, natus
          minima, porro labore.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="showAddFolderModal" persistent>
      <add-folder-modal></add-folder-modal>
    </q-dialog>
    <q-dialog v-model="showEditFolderModal" persistent>
      <edit-folder-modal
        @reset="resetFolderValue"
        :id="folderValue"
      ></edit-folder-modal>
    </q-dialog>
  </div>
</template>

<script>
import { db } from "boot/database";
import { mapActions, mapGetters } from "vuex";
import { routes } from "../../router/routes";
export default {
  components: {
    "add-folder-modal": require("components/Folders/Modals/AddFolder.vue")
      .default,
    "edit-folder-modal": require("components/Folders/Modals/EditFolder.vue")
      .default,
  },
  data() {
    return {
      showRadioButtons: false,
      showAddFolderModal: false,
      folderValue: null,
    };
  },
  computed: {
    showOptionsEditOrDelete() {
      return this.folderValue ? true : false;
    },
    ...mapGetters("folders", ["folders", "selectedFolder"]),
  },
  methods: {
    ...mapActions("folders", ["idbReadFolders", "vuexSelectFolder"]),
    resetFolderValue() {
      this.folderValue = null;
    },
  },
  created() {
    this.idbReadFolders();
    //this.vuexSelectFirstFolder()
    //this.$router.push({ path: `/notes/${selectedFolder}`})
  },
};
</script>