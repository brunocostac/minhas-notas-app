<template>
    <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6 text-center">Renomear pasta</div>
          <div class="text-subtitle1 text-center">Digite um novo nome para esta pasta.</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input outlined placeholder="Nome" dense autofocus/>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn @click.stop="resetFolderValue" flat label="Cancelar" v-close-popup />
          <q-btn disable flat label="Salvar" v-close-popup />
        </q-card-actions>
    </q-card>
</template>

<script>
export default {
    methods: {
        resetFolderValue() {
            this.$emit('reset')
        }
    }
}
</script>