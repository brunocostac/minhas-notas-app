<template>
    <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6 text-center">Renomear pasta</div>
          <div class="text-subtitle1 text-center">Digite um novo nome para esta pasta.</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input :value="id" outlined placeholder="Nome" dense autofocus/>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn @click="cancelButtonFired" flat label="Cancelar"/>
          <q-btn disable flat label="Salvar"/>
        </q-card-actions>
    </q-card>
</template>

<script>
export default {
    props: ['id'],
    methods: {
      cancelButtonFired() {
        this.$emit('reset')
      }
    }
}
</script>