import Home from './components/home/Home'
import Cadastro from './components/cadastro/Cadastro'

// por não usar export default, para usar o routes tem que usar:
// import { routes }
export const routes = [
    { path: '', component: Home, titulo: 'Home' },
    { path: '/cadastro', component: Cadastro, titulo: 'Cadastro' }
];