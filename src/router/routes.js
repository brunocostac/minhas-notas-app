
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/notes/:id', component: () => import('pages/PageNotes.vue') },
      { path: '/addnote/:id', component: () => import('pages/PageAddNote.vue')},
      { path: '/editnote/:id', component: () => import('pages/PageEditNote.vue')}
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
