import { createRouter, createWebHistory } from 'vue-router'
import CalcView from '../views/CalcView'
import FormView from '../views/FormView'

const routes = [
    {
        path: '/',
        name: 'Calculator',
        component: CalcView
    },
    {
        path: '/contactform',
        name: 'Form',
        component: FormView,
    }
]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router