import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  interface State {
    count: number,
    userDetails: {
        name: string,
        email: string,
    }
  }

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}