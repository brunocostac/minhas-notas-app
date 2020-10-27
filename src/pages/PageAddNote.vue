<template>
  <q-page>
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <div class="q-pb-xs q-pt-xs">
            <h5 class="text-h5 text-weight-bold on-right">{{ this.selectedFolder.name}}</h5>
            <q-editor v-model="editor"/>
            <q-footer bordered>
                <q-btn @click="submitNote" to="/note" class="absolute-bottom" unelevated size="12px" color="white" text-color="amber" label="Salvar"/>
            </q-footer>
        </div>
    </transition>
  </q-page>
</template>

<script>
import { mapActions, mapGetters} from 'vuex'

export default {
  data () {
    return {
      editor: '',
      folderId: ''
    }
  },
  computed: {
    ...mapGetters("folders", ["selectedFolder"])
  },
  methods: {
    ...mapActions("folders",["vuexSelectFolder"]),
    submitNote() {
      
    }
  },
  created() {
    this.folderId = this.$route.params.id
    this.vuexSelectFolder(this.folderId)
  }
}
</script>

