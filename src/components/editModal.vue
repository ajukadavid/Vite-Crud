<script setup lang="ts">    
    
    interface Props {
        note?: string;
        description?: string;
    }
    
    const props = withDefaults(defineProps<Props>(), {
    
    });
    
    const emit = defineEmits(['update:close', 'update:handleEdit'])
    
    const handleClose = () => {
        emit('update:close', false)
    }
    
    const handleEdit = () => {
        const note = {
            note: props.note,
            description: props.description
        }
        emit('update:handleEdit', note)
    }
    </script>
    <template>
        <div class="modal-overlay">
            <div class="modal">
                <div class="border-b px-8 border-slate-300">
                    <p class="-mr-8">Edit item</p>
                </div>
                <div>
                    <form name="signUp" class="p-5">
                        <div class="mb-4">
                            <label for="name" class="text-black text-sm">Name</label>
                            <div class="flex mt-2">
                                <input v-model="props.note" class="w-full py-1 text-gray-700 outline outline-OutlineColor" id="name" type="name"
                                    placeholder="Input item name here" />
                            </div>
                        </div>
                        <div class="">
                            <label for="password" class="text-black text-sm">Add Note {{props.note}}</label>
                            <div class="mr-20 mt-2">
                                <textarea v-model="props.description" id="note" name="note" class="outline outline-OutlineColor" rows="4" cols="52">
                                </textarea>
                            </div>
                        </div>
                <div class="flex justify-end">
                  <button type="submit" for="cancel" @click.prevent="handleClose"
                    class="bg-cancelColor  mr-10 mt-4 wpx-92 hover:bg-slate-200 text-black font-bold py-2 px-4 rounded">
                    Cancel
                  </button>
                  <button type="submit" for="editEvent" @click.prevent="handleEdit"
                    class="bg-createEventColor wpx-119 mt-4 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">
                    Edit event
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
          height: 370px;
          width: 500px;
          margin-top: 10%;
          
          border-radius: 4px;
        }
    
        
       
        
        p {
          font-size: 16px;
          margin: 20px 0;
        }
        
        </style>