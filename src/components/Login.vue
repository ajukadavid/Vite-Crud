<script setup lang="ts">
    import { reactive, ref } from 'vue'
    import useVuelidate from '@vuelidate/core'
    import { required, email, minLength, sameAs, helpers } from '@vuelidate/validators'
    import axios from 'axios'

    
    const state = reactive({
    
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    
    })
    
    const containsUpperCase = (value:any) => /[A-Z]/.test(value)
    const containsOneNumber = (value:any) => /[0-9]/.test(value)
    const containsSpecial =  (value:any) => /[#?!@$%^&*-]/.test(value)
    
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
    const handleSignUp =  async () => {
      v$.value.$touch()
      const data = {
        email: state.email,
        password: state.password
      }
      const response = await axios.post('https://test-api.sytbuilder.com/tokens', data)
      document.cookie = `token=$`

    }
    
    </script>
    
    <template>
      <div class="grid place-items-center h-screen">
        <div class="bg-white shadow-sm p-4">
          <div class="mx-40 mt-3 mb-8">
            <h5 class="text-xl ml-16 mb-2">Log in</h5>
            <p class="text-slate-400 -ml-8">If you have no account,  <span class="text-blue-800 cursor-pointer" @click="$router.push('/')">Sign Up</span></p>
          </div>
          <form name="login">
            <div class="my-4">
              <label for="email" class="text-black text-sm mb-2">Email Address</label>
              <div class="flex">
                <input v-model="state.email" class="w-full py-1 text-gray-700 outline outline-OutlineColor" id="email" type="email"
                  placeholder="Type your email address here" />
              </div>
              <div v-if="v$.email.$error" class="text-red-500 text-xs mt-2">Wrong email format!</div>
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
              <button type="submit" for="login" @click.prevent="handleSignUp"
                class="bg-slate-400 w-full mt-4 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">
                Log in
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
    </style>
    