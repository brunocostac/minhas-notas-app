<template>
  <q-page>
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
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
        <h5 class="text-h5 text-weight-bold on-right">{{ this.selectedFolder.name}}</h5>
        <q-list bordered separator>
          <q-slide-item right-color="red">
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
                <q-item-label>Estudar Javascript</q-item-label>
                <q-item-label caption lines="2"
                  >Preciso lembrar algumas coisas.</q-item-label
                >
              </q-item-section>
              <q-item-section side top>
                <q-item-label caption>10/10/2020 às 08:32:39</q-item-label>
              </q-item-section>
            </q-item>
          </q-slide-item>
        </q-list>
        <q-footer align="justify" bordered class="bg-white text-primary">
          <q-btn
            class="float-left on-right text-grey-9"
            dense
            unelevated
            size="12px"
            color="white"
            text-color="amber"
            label="3 notas"
          />
          <q-btn
            :to="'/addnote/' + folderId"
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
  computed: {
    ...mapGetters("folders", ["selectedFolder"])
  },
  methods: {
    ...mapActions("folders",["vuexSelectFolder"])
  },
  updated() {
    this.folderId = this.$route.params.id
    this.vuexSelectFolder(this.folderId)
  }
};
</script>