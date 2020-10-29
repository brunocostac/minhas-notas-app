<template>
  <q-list bordered separator>
    <q-slide-item right-color="red" v-for="note in folderNotes" :key="note.id">
      <template v-slot:right>
        <q-icon name="delete" />
      </template>
      <q-item>
        <q-item-section side>
          <q-radio
            v-if="showRadioButton"
            v-model="radioButtonState"
            color="amber"
            val="line"
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
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("notes", ["folderNotes"]),
  },
  mounted() {},
};
</script>