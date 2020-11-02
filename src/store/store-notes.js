import Vue from 'vue'
import { db } from 'boot/database'
import folders from './store-folders'

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
    idbDeleteNote({ dispatch }, payload) {
        db.collection('notes').doc({ id: payload }).delete().then(response => {
            console.log('Delete successful, now do something.')
            dispatch('idbReadNotes')
        }).catch(error => {
            console.log('There was an error, do something else.')
        })
    },
    idbReadNotes({ dispatch }) {
        db.collection("notes").get().then(payload => {
            dispatch('vuexUpdateNotes', payload)
        })
    },
    vuexUpdateNotes({ commit }, payload) {
        commit('clearNotes')
        commit('addNotes', payload)
    },
}

const getters = {
    folderNotes() {
        let notes = {}
        Object.keys(state.notes).forEach(function (key) {
            if (state.notes[key].folderId == folders.state.selectedFolderId) {
                notes[key] = state.notes[key]
            }
        })
        return notes
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}