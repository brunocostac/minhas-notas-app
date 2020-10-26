import Vue from 'vue'
import { uid } from 'quasar'
import { db } from 'boot/database'

const state = {
    folders: {
    },
    selectedFolder: ''
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
        state.selectedFolder = payload
    }
}

const actions = {
    addFolder({ dispatch }, folder) {
        let payload = {
            id: Date.now(),
            name: folder
        }
        dispatch('idbAddFolder', payload)
    },
    updateFolder({ dispatch }, payload) {
        dispatch('idbUpdateFolder', payload)
    },
    idbAddFolder({ dispatch }, payload) {
        db.collection('folders').add(payload).then(response => {
            dispatch('idbReadFolders')
        })
    },
    idbUpdateFolder({ dispatch }, payload) {
        db.collection('folders').doc({ id: payload.id }).update({ name: payload.name }).then(response => {
            dispatch('idbReadFolders')
        })
    },
    idbReadFolders({ dispatch }) {
        db.collection("folders").get().then((payload) => {
            dispatch('vuexUpdateFolders', payload)
        });
    },
    vuexUpdateFolders({ commit }, payload) {
        commit('clearFolders')
        commit('addFolders', payload)
    },
    selectFolder({ commit }, payload) {
        commit('selectFolder', payload)
    }
}

const getters = {
    folders() {
        let folders = {}
        Object.keys(state.folders).forEach(function (key) {
            //console.log(key)
            let folder = state.folders[key]
            folders[key] = folder
        })
        return folders
    },
    selectedFolder() {
        let folder = {}
        Object.keys(state.folders).forEach(function (key) {
            if (key == state.selectedFolder) {
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