import { Route } from 'server-renderer'
import { Game } from 'src/pages'

const routes: Route[] = [
  {
    path: '*',
    component: Game,
  }
]

export default routes