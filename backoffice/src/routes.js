import Home from './components/Home'
import Avatars from './components/resources/Avatars'
import UserProfile from './components/user/UserProfile'

export default [
    {
        path: '/', 
        component: Home
    },
    {
        path: '/resources/avatars', 
        component: Avatars
    },
    {
        path: '/profile', 
        component: UserProfile
    }
]