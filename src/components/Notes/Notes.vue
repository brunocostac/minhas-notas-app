<template>
  <div>
    <div class="q-pb-xs q-pt-xs">
      <q-btn
        @click="showRadioButton = !showRadioButton"
        class="float-right on-left"
        dense
        unelevated
        size="12px"
        color="white"
        text-color="amber"
        label="Editar"
      />
    </div>
    <span class="hidden">{{ this.$route.params.id }}</span>
    <h5 class="text-h5 text-weight-bold on-right">
      {{ this.selectedFolder.name }}
    </h5>
    <q-list bordered separator>
      <q-slide-item
        right-color="red"
        v-for="note in folderNotes"
        :key="note.id"
      >
        <template v-slot:right>
          <q-icon name="delete" />
        </template>
        <q-item>
          <q-item-section side>
            <q-radio
              v-if="showRadioButton"
              v-model="radioButtonState"
              :val="note.id"
              color="amber"
            />
          </q-item-section>
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
import { mapGetters } from "vuex";
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
  mounted() {},
};
</script>