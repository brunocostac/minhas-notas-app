import Vue from 'vue'
import { db } from 'boot/database'

const state = {
    folders: {
    },
    selectedFolderId: ''
}

const mutations = {
    addFolders(state, payload) {
        for (var i = 0; i < payload.length; i++) {
            Vue.set(state.folders, payload[i].id, payload[i])
        }
    },
    clearFolders(state) {
        state.folders = {}
    },
    selectFolder(state, payload) {
        state.selectedFolderId = payload
    }
}

const actions = {
    idbAddFolder({ dispatch }, folder) {
        let payload = {
            id: Date.now(),
            name: folder
        }
        db.collection('folders').add(payload).then(response => {
            dispatch('idbReadFolders')
        })
    },
    idbUpdateFolder({ dispatch }, payload) {
        db.collection('folders').doc({ id: payload.id }).update({ name: payload.name }).then(response => {
            dispatch('idbReadFolders')
        })
    },
     idbDeleteFolder({ dispatch }, payload) {
        db.collection('folders').doc({ id: payload }).delete().then(response => {
            console.log('Delete successful, now do something.')
            dispatch('idbReadFolders')
        }).catch(error => {
            console.log('There was an error, do something else.')
        })
    },
    idbReadFolders({ dispatch }) {
        db.collection("folders").get().then((payload) => {
            dispatch('vuexUpdateFolders', payload)
        });
    },
    idbSelectFirstFolder({ commit }) {
        db.collection('folders').orderBy('id', 'asc').limit(1).get().then(payload => {
            commit('selectFolder', payload[0].id)
        })
    },
    vuexUpdateFolders({ commit }, payload) {
        commit('clearFolders')
        commit('addFolders', payload)
    }, 
    vuexSelectFolder({ commit }, payload) {
        commit('selectFolder', payload)
    },
    vuexSelectFirstFolder({dispatch}) {
        dispatch('idbSelectFirstFolder')
    },
}

const getters = {
    folders() {
        let folders = {}
        Object.keys(state.folders).forEach(function (key) {
            let folder = state.folders[key]
            folders[key] = folder
        })
        return folders
    },
    selectedFolder() {
        let folder = {}
        Object.keys(state.folders).forEach(function (key) {
            if (key == state.selectedFolderId) {
                folder = state.folders[key]
            }
        })
        return folder
    } 
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}