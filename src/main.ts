import { createApp } from 'vue'
import './style.css'
import './styles/app.css'; 
import App from './App.vue'
import DashBoard from '../src/components/DashBoard.vue'
import Login from '../src/components/Login.vue'
import SignUp from '../src/components/SignUp.vue'
import { createRouter, createWebHistory } from 'vue-router'
import store, { key } from './store/store'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: DashBoard
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
         {
            path: '/',
            name: 'SignUp',
            component: SignUp
        }
    ]
})

const isAuthenticated = localStorage.getItem('appToken') || '';

router.beforeEach(async (to, from) => {
    if(
        !isAuthenticated && 
        to.name !== 'SignUp'
    ){
        return { name: 'SignUp' }
    }
})
const app = createApp(App)
app.use(store, key)
app.use(router)
app.mount('#app')
