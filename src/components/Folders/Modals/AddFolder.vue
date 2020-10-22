<template>
    <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6 text-center">Nova pasta</div>
          <div class="text-subtitle1 text-center">Digite um nome para esta pasta.</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input v-model="folderName" outlined placeholder="Nome" dense autofocus/>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn @click.stop="addFolder()" disable flat label="Salvar" v-close-popup />
        </q-card-actions>
    </q-card>
</template>

<script>
export default {
    data() {
        return {
            folderName: ''
        }
    },
    methods: {
        addFolder() {

        }
    }
}
</script>