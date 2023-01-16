import { ActionTree, MutationTree, GetterTree, Module } from "vuex";
import { LoginState as State } from "./types/login-types";
import { MainState } from './store';


const state: State = {
        user: {
            created_at: undefined,
            email: undefined,
            email_verified_at: undefined,
            first_name: undefined,
            last_name: undefined,
            updated_at: undefined,
            uuid: undefined,
            __v: undefined,
            _id: undefined
        },
    token: ''
}


const getters: GetterTree<State, MainState> = {

}

const mutations: MutationTree<State> = {
    saveLoginInfo(state, payload: any) {
         state.user.first_name = payload.first_name + ' ' + payload.last_name
    },
    saveToken(state, payload:any) {
        state.token = payload
    }

   

}

const actions: ActionTree<State, MainState> = {

}

const namespaced = true

export const Login: Module<State, MainState> = {
    namespaced,
    state,
    getters,
    mutations,
    actions
}
