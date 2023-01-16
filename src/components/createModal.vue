<script setup lang="ts">
import { reactive } from 'vue';

interface Event {
    name: string,
    description: string
}

const event = reactive<Event>({
    name: '',
    description: ''
})

interface Props {
    note?: string;
    description?: string;
    err?: string
}


const props = withDefaults(defineProps<Props>(), {

});

const emit = defineEmits(['update:close', 'update:handleCreate'])

const handleClose = () => {
    emit('update:close', false)
}

const handleCreate = () => {
    emit('update:handleCreate', event)
    event.description = '';
    event.name = ''
}
</script>
<template>
    <div  @click.self="handleClose" class="modal-overlay">
        <div class="modal">
            <div class="border-b px-8 border-slate-300 flex justify-between">
                <p class="-mr-8">Create item</p>
                <span></span>
            </div>
            <div>
                <form name="signUp" class="p-5">
                    <div class="mb-4">
                        <label for="name" class="text-black text-sm">Name</label>
                        <div class="flex mt-2">
                            <input v-model="event.name" class="w-full py-1 text-gray-700 outline outline-OutlineColor" id="name" type="name"
                                placeholder="Input item name here" />
                        </div>
                    </div>
                    <div class="">
                        <label for="password" class="text-black text-sm">Add Note</label>
                        <div class="mr-20 mt-2">
                            <textarea v-model="event.description" id="note" name="note" class="outline outline-OutlineColor" rows="4" cols="52">
                            </textarea>
                        </div>
                    </div>
            <div v-if="err?.length! > 2" class="text-red-500 text-xs mt-2">{{err}}</div>
            <div class="flex justify-end">
              <button type="submit" for="cancel" @click.prevent="handleClose"
                class="bg-cancelColor  mr-10 mt-4 wpx-92 hover:bg-slate-200 text-black font-bold py-2 px-4 rounded">
                Cancel
              </button>
              <button type="submit" for="createEvent" @click.prevent="handleCreate"
                class="bg-createEventColor wpx-119 mt-4 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">
                Create event
              </button>
            </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>

    .modal-overlay {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      background-color: #000000da;
    }
    
    .modal {
      background-color: white;
      height: 392px;
      width: 500px;
      margin-top: 10%;
      
      border-radius: 4px;
    }
    .close {
      margin: 10% 0 0 16px;
      cursor: pointer;
    }
    
    .close-img {
      width: 25px;
    }
    
    .check {
      width: 150px;
    }
    
    h6 {
      font-weight: 500;
      font-size: 28px;
      margin: 20px 0;
    }
    
    p {
      font-size: 16px;
      margin: 20px 0;
    }
    
    #button__one {
      width: 100px;
      height: 40px;
      font-size: 14px;
    }
    #button__two {
    width: 100px;
      height: 40px;
      font-size: 14px;
    }
    </style>