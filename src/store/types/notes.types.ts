export interface NotesState {
    notes: noteResponse[]
}

export interface noteResponse {
    created_at?: string
    description?: string
    name?: string,
    updated_at?: string,
    user?: string,
    uuid?: string,
    __v?: number,
    _id?: string
}