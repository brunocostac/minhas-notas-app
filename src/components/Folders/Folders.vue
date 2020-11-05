<template>
  <div>
    <div class="q-pa-sm fixed-top-right on-left">
      <q-btn
        v-if="Object.keys(folders).length"
        @click="showRadioButtons = !showRadioButtons"
        dense
        unelevated
        size="12px"
        color="white"
        text-color="amber"
        :label="this.labelEditOrOk"
      />
    </div>
    <h5 class="text-h5 text-weight-bold on-right">Pastas</h5>
    <q-list v-if="Object.keys(folders).length" bordered separator>
      <q-slide-item
        @right="(opt) => onRight(opt, folder.id)"
        right-color="red"
        v-for="folder in folders"
        :key="folder.id"
      >
        <template v-slot:right>
          <q-icon name="delete" />
        </template>
        <q-item
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
      </q-slide-item>
    </q-list>
    <q-banner v-else class="absolute-center">
      <span class="text-grey-9">Nenhuma pasta</span>
    </q-banner>
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
    showEditFolderModal() {
      return this.folderValue ? true : false;
    },
    labelEditOrOk() {
      return this.showRadioButtons ? "Ok" : "Editar";
    },
    ...mapGetters("folders", ["folders", "selectedFolder"]),
  },
  methods: {
    ...mapActions("folders", ["idbReadFolders", "vuexSelectFolder"]),
    resetFolderValue() {
      this.folderValue = null;
    },
    onRight({ reset }, id) {
      this.$q
        .dialog({
          title: "Confirmação",
          message: "Gostaria de deletar esta pasta?",
          stackButtons: true,
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          //this.idbDeleteNote(id);
        })
        .onOk(() => {})
        .onCancel(() => {
          this.finalize(reset);
        });
    },
    finalize(reset) {
      this.timer = setTimeout(() => {
        reset();
      }, 500);
    },
  },
  created() {
    this.idbReadFolders();
  },
};
</script>