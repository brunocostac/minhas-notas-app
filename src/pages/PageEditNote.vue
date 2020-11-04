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
            :to="'/notes/'+this.selectedFolder.id"
            class="absolute-bottom"
            unelevated
            size="12px"
            color="white"
            text-color="amber"
            label="Editar"
          />
        </q-footer>
      </div>
    </transition>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
moment.locale("pt-br");

export default {
  data() {
    return {
      note: {},
      noteText: null,
    };
  },
  computed: {
    ...mapGetters("folders", ["selectedFolder"]),
    ...mapGetters("notes", ["selectedNote"]),
  },
  methods: {
    ...mapActions("notes", ["vuexSelectNote", "idbUpdateNote"]),
    submitNote() {
      let lines = this.noteText.split("\n"),
        title = lines[0],
        body = this.noteText.replace(title, "");

      let note = {
        noteTitle: title,
        noteBody: body,
        folderId: this.note.folderId,
        id: this.note.id,
        date: moment().format("L"),
        hour: moment().format("LTS"),
      };
      this.idbUpdateNote(note);
    },
  },
  created() {
    this.noteId = this.$route.params.id;
    this.vuexSelectNote(this.noteId);
  },
  mounted() {
    this.note = Object.assign({}, this.selectedNote);
    this.noteText = this.note.noteTitle + this.note.noteBody;
  },
};
</script>
