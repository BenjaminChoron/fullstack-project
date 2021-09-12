import Home from './components/Home'
import Avatars from './components/resources/Avatars'
import Images from './components/resources/Images'
import Technos from './components/resources/Technos'
import UserProfile from './components/user/UserProfile'
import Posts from './components/posts/Posts'
import NewPost from './components/posts/NewPost'
import UpdatePost from './components/posts/UpdatePost'
import UpdateDraft from './components/posts/UpdateDraft'
import Messages from './components/messages/Messages'
import MessageDetail from './components/messages/MessageDetail'
import Projects from './components/projects/Projects'
import NewProject from './components/projects/NewProject'
import UpdateProject from './components/projects/UpdateProject'

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
        path: '/resources/technos', 
        component: Technos
    },
    {
        path: '/profile', 
        component: UserProfile
    },
    {
        path: '/messages', 
        component: Messages
    },
    {
        path: '/messages/:id', 
        component: MessageDetail
    },
    {
        path: '/posts', 
        component: Posts
    },
    {
        path: '/posts/new', 
        component: NewPost
    },
    {
        path: '/posts/update/:id', 
        component: UpdatePost
    },
    {
        path: '/posts/drafts/update/:id', 
        component: UpdateDraft
    },
    {
        path: '/projects', 
        component: Projects
    },
    {
        path: '/projects/new', 
        component: NewProject
    },
    {
        path: '/projects/update/:id', 
        component: UpdateProject
    }
]