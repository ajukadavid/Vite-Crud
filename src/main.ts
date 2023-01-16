import { createApp } from 'vue'
import './style.css'
import './styles/app.css'; 
import App from './App.vue'
import Dashboard from './components/Dashboard.vue'
import Login from '../src/components/Login.vue'
import SignUp from '../src/components/SignUp.vue'
import { createRouter, createWebHistory } from 'vue-router'
import store, { key } from './store/store'

const isAuthenticated = localStorage.getItem('appToken') || '';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Dashboard',
            component: Dashboard,
            beforeEnter: (to, from) => {
                if(!isAuthenticated){
                    return false
                }
            }
        
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
         {
            path: '/signUp',
            name: 'SignUp',
            component: SignUp
        }
    ]
})



const app = createApp(App)
app.use(store, key)
app.use(router)
app.mount('#app')
