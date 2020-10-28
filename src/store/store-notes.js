import Vue from 'vue'
import { db } from 'boot/database'

const state = {
    notes: {
    }
}

const mutations = {
    addNotes(state, payload) {
        for (var i = 0; i < payload.length; i++) {
            Vue.set(state.notes, payload[i].id, payload[i])
        }
    },
    clearNotes(state) {
        state.notes = {}
    },
}

const actions = {
    idbAddNote({ dispatch }, payload) {
        db.collection('notes').add(payload).then(response => {
            dispatch('idbReadNotes')
        })
    },
    idbReadNotes({ dispatch }) {
        db.collection("notes").get().then((payload) => {
            dispatch('vuexUpdateNotes', payload)
        });
    },
    vuexUpdateNotes({ commit }, payload) {
        commit('clearNotes')
        commit('addNotes', payload)
    }, 
}

const getters = {
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}