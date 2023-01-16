<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, sameAs, helpers } from '@vuelidate/validators'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex'
import { key } from '../store/store'

const $route = useRoute()
const $router = useRouter()

const $store = useStore(key)

const state = reactive({

  firstName: '',
  lastName: '',
  email: '',
  password: ''

})

const containsUpperCase = (value:any) => /[A-Z]/.test(value)
const containsOneNumber = (value:any) => /[0-9]/.test(value)
const containsSpecial =  (value:any) => /[#?!@$%^&*-]/.test(value)
  
const processLoading = ref(false)

const loginErr = ref(false)
const errMessage = ref('')

const rules = {
  firstName: { required },
  lastName: { required },
  password: { 
    minLength: minLength(8),
    containsUpperCase: helpers.withMessage('contains at least one uppercase letter', containsUpperCase),
    containsOneNumber: helpers.withMessage('contains at least one number', containsOneNumber),
    containsSpecial: helpers.withMessage('contains at least one symbol', containsSpecial)
  },



  email: { required,  email }
}

const v$ = useVuelidate(rules, state)

const handleSignUp = async () => {

  const userData = {
    first_name: state.firstName,
    last_name: state.lastName,
    email: state.email,
    password: state.password
  }
  v$.value.$touch()
  let result =  await v$.value.$validate()
  if(!result) {
    //
  } else {
    try{
      processLoading.value = true
      const response = await axios.post('https://test-api.sytbuilder.com/me', userData)
    $store.commit("Login/saveLoginInfo", response.data.user)
     $store.commit("Login/saveToken",  response.data.user.email_verification_token)
    localStorage.setItem('appToken', response.data.token)
    processLoading.value = false
    $router.push('/dashboard')
    } catch(err:any) {
      processLoading.value = false
      loginErr.value = true
      errMessage.value = err.response.data.message
    }
    
  }

}

const handleSignIn = () => {
  console.log('hibbb')
$router.push({name: 'Login'})
}
</script>

<template>
  <div class="grid place-items-center h-screen">
    <div class="bg-white shadow-sm p-4">
      <div class="mx-40 mt-3 mb-8">
        <h5 class="text-xl">Create an Account</h5>
        <p class="text-slate-400 -ml-8">Already have an account? <span @click="handleSignIn" class="text-blue-800 cursor-pointer">Log in</span></p>
      </div>
      <form name="signUp">
        <div class="flex justify-between">
          <div class="">
            <label for="firstName" class="text-black text-sm mb-2">First Name</label>
            <div class="flex">
              <input v-model="state.firstName" class=" py-1  text-gray-700 outline outline-OutlineColor " id="firstName" type="text"
                placeholder="type here" />
            </div>
          </div>
          <div class="ml-3">
            <label for="lastName" class="text-black text-sm mb-2">Last Name</label>
            <div class="flex">
              <input v-model="state.lastName" class="mr-30 py-1  text-gray-700 outline outline-OutlineColor " id="lastName" type="text"
                placeholder="type here" />
            </div>
          </div>
        </div>
        <div class="my-4">
          <label for="email" class="text-black text-sm mb-2">Email Address</label>
          <div class="flex">
            <input v-model="state.email" class="w-full py-1 text-gray-700 outline-OutlineColor outline" id="email" type="email"
              placeholder="Type your email address here" />
          </div>
          <div v-if="v$.email.$error || loginErr" class="text-red-500 text-xs mt-2">{{loginErr ? errMessage : 'Wrong email format!'}}</div>
        </div>
        <div class="">
          <label for="password" class="text-black">Password</label>
          <div class="flex">
            <input v-model="state.password" class="w-full py-1  text-gray-700 outline-OutlineColor outline" id="password" type="password"
              placeholder="Type your password here" />
          </div>
        </div>
        <div v-for="error of v$.password.$errors" :key="error.$uid">
          <div class="mt-2 text-red-600">
              <input type="radio" :id="error.$validator" :name="error.$uid" class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500  focus:ring-2"
              value="Contains at least one uppercase letter">
            <label :for="error.$validator" class="ml-3 text-xs">{{error.$message}}</label><br>
          </div>
        </div>


        <div>
          <div v-if="processLoading" class="flex justify-center w-full bg-slate-400 p-2 mt-3">
            <div 
            class="bg-slate-400 dots-3 w-full hover:bg-slate-700 text-white font-bold rounded">
        </div>
          </div>
          <button v-else type="submit" for="signUp" @click.prevent="handleSignUp"
            class="bg-slate-400 w-full mt-4 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">
            Sign up
          </button>
          
        </div>
      </form>
    </div>

  </div>

</template>

<style scoped>
#firstName {
  width: 260px !important;
}

#lastName {
  width: 280px !important
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
