<template>
    <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6 text-center">Renomear pasta</div>
          <div class="text-subtitle1 text-center">Digite um novo nome para esta pasta.</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input v-model="name" outlined placeholder="Nome" dense autofocus/>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn @click="cancelButtonFired" flat label="Cancelar"/>
          <q-btn @click="submitFolder" flat label="Salvar"/>
        </q-card-actions>
    </q-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    props: ['id'],
    data() {
      return {
       name: ''
      }
    },
    computed: {
      ...mapGetters("folders", ["selectedFolder"]),
    },
    methods: {
      ...mapActions('folders',['selectFolder', 'updateFolder']),
      cancelButtonFired() {
        this.$emit('reset')
      },
      submitFolder() {
        let folder = {
          'id': this.id,
          'name': this.name
        }
        this.updateFolder(folder)
        this.$emit('reset')
      }
    },
    mounted() {
      this.selectFolder(this.id)
      this.name = this.selectedFolder.name
    }
}
</script>