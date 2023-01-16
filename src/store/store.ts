import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import { Login } from './login.store'
import { Notes } from './notes.store'
import { NestedRootState } from './types/state'
export interface MainState {
   tester?: string
}

export const key: InjectionKey<Store<NestedRootState>> = Symbol()



export default createStore<MainState | any>({
  modules: {
    Login,
    Notes
  }
})

