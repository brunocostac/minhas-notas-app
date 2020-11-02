<template>
  <q-page>
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div>
        <notes></notes>
        <q-footer align="justify" bordered class="bg-white text-primary">
          <q-btn
            class="float-left on-right text-grey-9"
            dense
            unelevated
            size="12px"
            color="white"
            text-color="amber"
            :label="Object.keys(folderNotes).length+' notas'"
          />
          <q-btn
            :to="'/addnote/'+this.selectedFolder.id"
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
    return {
      showRadioButton: false,
      radioButtonState: false,
      folderId: null
    };
  },
  components: {
    notes: require("components/Notes/NoteS.vue").default
  },
  computed: {
    ...mapGetters("folders", ["selectedFolder"]),
    ...mapGetters("notes", ["folderNotes"]),
  },
  methods: {
    ...mapActions("notes", ["idbReadNotes"])
  },
  mounted() {
    this.folderId = this.$route.params.id
    this.idbReadNotes()
  }
};
</script>