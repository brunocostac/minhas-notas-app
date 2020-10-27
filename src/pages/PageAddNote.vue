<template>
  <q-page>
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <div class="q-pb-xs q-pt-xs">
            <h5 class="text-h5 text-weight-bold on-right">Estudos</h5>
            <q-editor v-model="editor"/>
            <q-footer bordered>
                <q-btn to="/note" class="absolute-bottom" unelevated size="12px" color="white" text-color="amber" label="Save"/>
            </q-footer>
        </div>
    </transition>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      editor: ''
    }
  }
}
</script>

