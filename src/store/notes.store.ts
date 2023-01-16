import { ActionTree, MutationTree, GetterTree, Module } from "vuex";
import { NotesState as State } from "./types/notes.types";
import { MainState } from './store';


const state: State = {
    notes:[{
    }]
}


const getters: GetterTree<State, MainState> = {

}

const mutations: MutationTree<State> = {
    saveNotes(state, payload: any) {
         state.notes.push(payload) 
    },
    saveGetNotes(state, payload:any) {
        state.notes = [...payload]
    },
    deleteNote(state, id:any) {
        let itemIndex = state.notes.findIndex((item:any) => item.uuid === id)
        state.notes.splice(itemIndex, 1)
    }
   

}

const actions: ActionTree<State, MainState> = {

}

const namespaced = true

export const Notes: Module<State, MainState> = {
    namespaced,
    state,
    getters,
    mutations,
    actions
}
