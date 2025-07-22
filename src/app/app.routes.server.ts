import { ServerRoute, RenderMode } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Server,
  },
  {
    path: 'login',
    renderMode: RenderMode.Server,
  },
  {
    path: 'dashboard',
    renderMode: RenderMode.Server,
  },
  {
    path: 'explorar',
    renderMode: RenderMode.Server,
  },
];
