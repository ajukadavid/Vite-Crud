<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import CreateModal from './createModal.vue'
import { useStore } from 'vuex'
import { key } from '../store/store'
import  axios, { AxiosRequestConfig } from 'axios'
import VerifyModal from './verifyModal.vue'
import { useRouter } from 'vue-router';
import  { getAuthHeaders } from '../auth/auth-model'
import EditModal from './editModal.vue'

export interface Note {
  name: string | undefined,
  description: string | undefined

}


const $router = useRouter()
const $store = useStore(key)
const processLoading = ref(false)

const showModal = ref(false)
const showEditModal = ref(false)

const editNote = ref('')
const editDesc = ref('')
const editId = ref<string | null>()
const handleShowEdit = (id:string, note:string, description: string) => {
  editId.value = id
  editNote.value = note
  editDesc.value = description
  showEditModal.value = true
}

const handleEdit = async (val:any) => {
  showEditModal.value = false
  processLoading.value = true
  const requestConfig: AxiosRequestConfig = {headers: getAuthHeaders()};
  let editResponse = await axios.put(`https://test-api.sytbuilder.com/items/${editId.value}`, val, requestConfig)
  if(editResponse.status === 200) {
    let myNotes = await axios.get('https://test-api.sytbuilder.com/items?page=1&count=10', requestConfig)
    processLoading.value = false
   $store.commit("Notes/saveGetNotes", myNotes.data.items)
   
  }
}

const handleCloseEdit = (val:boolean) => {
  showEditModal.value = val
}

const notes = computed(() => {
  return $store.state.Notes?.notes
})


const handleClose = (val:boolean) => {
  showModal.value = val
}

const CreateErr = ref('')
const handleCreate = async (note:Note) => {
  try {
  const requestConfig: AxiosRequestConfig = {headers: getAuthHeaders()};
  let createNote = await axios.post('https://test-api.sytbuilder.com/items', note, requestConfig)
  $store.commit("Notes/saveNotes", createNote.data.item)
  handleClose(false)
  }catch(err:any){
    CreateErr.value = err.response.data.message
  }
  
}

const userName = computed(() => {
  return $store.state.Login?.user.first_name
})


const showVerifyModal = ref(false)

const handleVerifyEmail = async () => {
  let token = {
    token: $store.state.Login?.token
  }
  let verifyResponse = await axios.post('https://test-api.sytbuilder.com/me/verify', token)
  if(verifyResponse.data.message === 'user verified successfully'){
    showVerifyModal.value = true
  }
}

const verifyMessage = ref<boolean | null>(null)


const handleVerify = () => {
  showVerifyModal.value = false
  $router.push('/dashboard')
  verifyMessage.value = false
}

const showLogOut = ref(false)

const handleLogOut =  async () => {
  localStorage.removeItem('appToken')
  $router.push('/login')
}

const handleDelete = async(id:string) => {
  const requestConfig: AxiosRequestConfig = {headers: getAuthHeaders()};
  let deleteResponse = await axios.delete(`https://test-api.sytbuilder.com/items/${id}`, requestConfig)
  $store.commit("Notes/deleteNote", id)
}


onMounted(async() => {
  if($store.state.Login?.token) {
    verifyMessage.value = true
  }else {
    const requestConfig: AxiosRequestConfig = {headers: getAuthHeaders()};
    verifyMessage.value = false
   let myNotes = await axios.get('https://test-api.sytbuilder.com/items?page=1&count=10', requestConfig)
   $store.commit("Notes/saveGetNotes", myNotes.data.items)
   let user = await axios.get('https://test-api.sytbuilder.com/me', requestConfig)
   $store.commit("Login/saveLoginInfo", user.data.user)
  }
})
</script>

<template>
  <div>
     <div>
    <div class="w-full bg-verifyColor flex justify-center py-4" v-if="verifyMessage">
      <p>You have not verified your email address. Click <span @click.prevent="handleVerifyEmail" class="text-blue-600 cursor-pointer">here</span> to resend verification link.</p>
    </div>
    <nav class="bg-navColor flex justify-between px-10 py-5">
      <div class="mt-3">
        <span class="text-black">Dashboard</span>
      </div>
      <div class="flex">
        <p class=" text-black">{{userName}}</p> <span @click="showLogOut =! showLogOut" class="cursor-pointer material-symbols-outlined">
          expand_more
        </span>
        <div class="absolute top-10 right-14 shadow-lg bg-white py-2 px-3"  v-if="showLogOut">
          <span @click="handleLogOut" class="text-red-500 cursor-pointer">Log out</span>
        </div>
      </div>
    </nav>
    <div v-if="processLoading" class="justify-center flex bg-bodyColor items-center h-screen">
    <div class="dots-3">
    
  </div>
  </div>
    <div v-else>
      <div v-if="notes?.length" class="grid grid-cols-3 gap-4">
        <div class="border wpx-420 hpx-102 p-5 m-6 bg-white shadow-sm" v-for="note in notes">
        <div>
          <p class="text-sm text-cardNameColor">Name</p>
          <p>{{note.name}}</p>
        </div>
        <div>
          <p class="text-sm  text-cardNameColor">Description</p>
          <p class="hpx-70">
            {{note.description}}
          </p>
        </div>
        <div class="flex justify-end">
          <button type="submit" for="edit" @click.prevent="handleShowEdit(note.uuid!, note.name!, note.description!)"
                class="bg-white border border-slate-500  mr-10 mt-4 wpx-92 hover:bg-slate-200 text-black font-bold py-2 px-4 rounded">
                Edit
              </button>
              <button type="submit" for="delete" @click.prevent="handleDelete(note.uuid!)"
                class="bg-createEventColor wpx-119 mt-4 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">
                Delete
              </button>
        </div>
      </div>
      </div>
      <div v-else class="justify-center flex bg-navColor items-center h-screen">
    <div class="text-4xl">
      You currently have no events, create a new one with the button below.
    </div>
  </div>
  </div>
    </div>
    <div class="bg-blue-600 add__button mr-20 mb-10 rounded-full py-3 px-4">
      <button @click="showModal = true"><span class="text-white text-3xl material-symbols-outlined">
          add
        </span></button>
    </div>

    <EditModal v-if="showEditModal" :note="editNote" :description="editDesc" @update:handle-edit="handleEdit" @update:close="handleCloseEdit"/>
    <VerifyModal v-show="showVerifyModal" @update:close="handleVerify"/>
    <CreateModal v-show="showModal" @update:close="handleClose" @update:handle-create="handleCreate" :err="CreateErr"/>
  </div>

 

</template>

<style scoped>
  .add__button {
    position: fixed;
    bottom: 0;
    right: 0;
  }

  .dots-3 {
  width: 60px;
  aspect-ratio: 2;
  --_g: no-repeat radial-gradient(circle closest-side,#000 90%,#0000);
  background: 
    var(--_g) 0%   50%,
    var(--_g) 50%  50%,
    var(--_g) 100% 50%;
  background-size: calc(100%/3) 50%;
  animation: d3 1s infinite linear;
}
@keyframes d3 {
    20%{background-position:0%   0%, 50%  50%,100%  50%}
    40%{background-position:0% 100%, 50%   0%,100%  50%}
    60%{background-position:0%  50%, 50% 100%,100%   0%}
    80%{background-position:0%  50%, 50%  50%,100% 100%}
}
</style>
