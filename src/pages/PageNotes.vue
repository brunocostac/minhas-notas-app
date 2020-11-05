<template>
  <q-page>
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div>
        <h5 class="text-h5 text-weight-bold on-right">
          {{ this.selectedFolder.name }}
        </h5>
        <q-list v-if="Object.keys(folderNotes).length" bordered separator>
          <q-slide-item
            @right="(opt) => onRight(opt, note.id)"
            right-color="red"
            v-for="note in folderNotes"
            :key="note.id"
          >
            <template v-slot:right>
              <q-icon name="delete" />
            </template>
            <q-item :to="'/editnote/' + note.id">
              <q-item-section>
                <q-item-label>{{ note.noteTitle }}</q-item-label>
                <q-item-label caption lines="2">
                  {{ note.noteBody }}
                </q-item-label>
              </q-item-section>
              <q-item-section side top>
                <q-item-label caption
                  >{{ note.date }} às {{ note.hour }}</q-item-label
                >
              </q-item-section>
            </q-item>
          </q-slide-item>
        </q-list>
        <q-banner v-else class="absolute-center">
          <template v-slot:avatar>
            <q-icon name="sentiment_dissatisfied" color="primary" />
          </template>
          <span class="text-grey-9">Nenhuma nota na pasta</span>
        </q-banner>
        <q-footer align="justify" bordered class="bg-white text-primary">
          <q-btn
            class="float-left on-right text-grey-9"
            dense
            unelevated
            size="12px"
            color="white"
            text-color="amber"
            :label="Object.keys(folderNotes).length + ' notas'"
          />
          <q-btn
            :to="'/addnote/' + this.selectedFolder.id"
            class="float-right on-left"
            dense
            unelevated
            size="12px"
            color="white"
            text-color="amber"
            icon="add_comment"
          />
        </q-footer>
      </div>
    </transition>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters("folders", ["selectedFolder"]),
    ...mapGetters("notes", ["folderNotes"]),
  },
  methods: {
    ...mapActions("notes", ["idbDeleteNote", "idbReadNotes"]),
    onRight({ reset }, id) {
      this.$q
        .dialog({
          title: "Confirmação",
          message: "Gostaria de deletar esta nota?",
          stackButtons: true,
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.idbDeleteNote(id);
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
  beforeDestroy() {
    clearTimeout(this.timer);
  },
  mounted() {
    this.idbReadNotes();
  },
};
</script>