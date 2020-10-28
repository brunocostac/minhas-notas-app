<template>
  <q-page>
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div class="q-pa-md q-gutter-sm">
        <h5 class="text-h5 text-weight-bold on-right">
          {{ this.selectedFolder.name }}
        </h5>
        <q-input v-model="noteText" square outlined type="textarea" />
        <q-footer bordered>
          <q-btn
            @click="submitNote"
            to="/note"
            class="absolute-bottom"
            unelevated
            size="12px"
            color="white"
            text-color="amber"
            label="Salvar"
          />
        </q-footer>
      </div>
    </transition>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from 'moment'
moment.locale('pt-br');

export default {
  data() {
    return {
      noteText: "",
      folderId: "",
    };
  },
  computed: {
    ...mapGetters("folders", ["selectedFolder"]),
  },
  methods: {
    ...mapActions("folders", ["vuexSelectFolder"]),
    ...mapActions('notes', ["idbAddNote"]),
    submitNote() {
      let lines = this.noteText.split('\n'),
          title = lines[0],
          body = this.noteText.replace(title, '')

      let note = {
        noteTitle: title,
        noteBody: body,
        folderId: this.folderId,
        id: Date.now(),
        date: moment().format('L'),
        hour: moment().format('LTS')
      };
      this.idbAddNote(note)
    },
  },
  created() {
    this.folderId = this.$route.params.id;
    this.vuexSelectFolder(this.folderId);
  },
};
</script>

