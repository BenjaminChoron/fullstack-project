import Home from './components/Home'
import Avatars from './components/resources/Avatars'
import Images from './components/resources/Images'
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
        path: '/resources/images', 
        component: Images
    },
    {
        path: '/profile', 
        component: UserProfile
    }
]