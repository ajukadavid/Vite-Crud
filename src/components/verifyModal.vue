<script setup lang="ts">
import { reactive } from "vue";

const emit = defineEmits(["update:close", "update:handleCreate"]);

const handleClose = () => {
  emit("update:close", false);
};
</script>
<template>
  <div   @click.self="handleClose" class="modal-overlay">
    <div class="modal">
      <div class="flex justify-center">
        <div class="mt-20">
            <div class="ml-32">
                <span class="material-symbols-outlined text-6xl text-green-600"> check_circle </span>
            </div>
          <p class="mt-8 ml-6">Your email address has been verified.</p>
          <div class="text-blue-500 mt-5 ml-20 flex cursor-pointer" @click.prevent="handleClose">
            <p >Go to Dashboard  </p> 
            <p class="ml-2"> > </p>
          </div>
        </div>
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
  width: 800px;
  margin-top: 10%;

  border-radius: 4px;
}





</style>
