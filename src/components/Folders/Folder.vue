<template>
  <q-item tag="label" v-ripple>
    <q-item-section avatar>
      <q-radio @input="handleInput" v-model="folderValue" :val="folder.id"/>
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ folder.name }} {{ folder.id}}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { db } from "boot/database.js";
import { mapGetters } from "vuex";
export default {
  props: ["folder","showRadioButtons"],
  data() {
    return {
      folderValue: null,
      showEditFolderModal: false,
    };
  },
  methods: {
    handleInput(e) {
     this.folderValue = e
    }
  }
};
</script>