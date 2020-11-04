import Vue from 'vue'
import { db } from 'boot/database'
import folders from './store-folders'

const state = {
    notes: {
    },
    selectedNoteId: ''
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
    selectNote(state, payload) {
        state.selectedNoteId = payload
    }
}

const actions = {
    idbAddNote({ dispatch }, payload) {
        db.collection('notes').add(payload).then(response => {
            dispatch('idbReadNotes')
        })
    },
    idbUpdateNote({ dispatch }, payload) {
        db.collection('notes').doc({ id: payload.id }).update({
            noteTitle: payload.noteTitle,
            noteBody: payload.noteBody,
            folderId: payload.folderId,
            id: payload.id,
            date: payload.date,
            hour: payload.hour
        }).then(response => {
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
     vuexSelectNote({ commit }, payload) {
        commit('selectNote', payload)
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
    },
    selectedNote() {
       let note = {}
       Object.keys(state.notes).forEach(function (key) {
            if (state.notes[key].id == state.selectedNoteId) {
                note = state.notes[key]
            }
        }) 
        return note
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}