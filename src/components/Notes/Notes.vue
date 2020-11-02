<template>
  <div>
    <span class="hidden">{{ this.$route.params.id }}</span>
    <h5 class="text-h5 text-weight-bold on-right">
      {{ this.selectedFolder.name }}
    </h5>
    <q-list bordered separator>
      <q-slide-item
        @right="opt => onRight(opt, note.id)"
        right-color="red"
        v-for="note in folderNotes"
        :key="note.id"
      >
        <template v-slot:right>
          <q-icon name="delete" />
        </template>
        <q-item>
          <q-item-section>
            <q-item-label>{{ note.noteTitle }}</q-item-label>
            <q-item-label caption lines="2"> {{ note.noteBody }} </q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-item-label caption
              >{{ note.date }} às {{ note.hour }}</q-item-label
            >
          </q-item-section>
        </q-item>
      </q-slide-item>
    </q-list>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return { 
      showRadioButton: false,
      radioButtonState: ''
    }
  },
  computed: {
    ...mapGetters("notes", ["folderNotes"]),
    ...mapGetters("folders", ["selectedFolder"]),
  },
  methods: {
    ...mapActions("notes", ["idbDeleteNote"]),
   onRight ({reset}, id) {
      this.$q.dialog({
        title: 'Confirmação',
        message: 'Gostaria de deletar esta nota?',
        stackButtons: true,
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.idbDeleteNote(id)
        // console.log('>>>> OK')
      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      }).onCancel(() => {
        this.finalize(reset)
      })
    },
    finalize (reset) {
      this.timer = setTimeout(() => {
        reset()
      }, 500)
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  }
};
</script>