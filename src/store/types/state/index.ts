import { LoginState } from '../login-types'
import { NotesState  } from '../notes.types'
export interface NestedRootState {
Notes?: NotesState
Login?: LoginState
}