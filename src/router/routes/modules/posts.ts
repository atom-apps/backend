import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const POSTS: AppRouteRecordRaw = {
  path: '/posts', name: 'posts', component: DEFAULT_LAYOUT, meta: { title: '内容管理', requiresAuth: true, icon: 'icon-book', order: 1 },
  children: [
    // 书籍
    { path: 'books', name: 'BookList', component: () => import('@/views/posts/books/list.vue'), meta: { title: '书籍列表', requiresAuth: true, hideInMenu: false } },
    { path: 'books/view/:id', name: 'BookView', component: () => import('@/views/posts/books/view.vue'), meta: { title: '书籍详情', requiresAuth: true, hideInMenu: true } },
    { path: 'books/edit/:id', name: 'BookEdit', component: () => import('@/views/posts/books/edit.vue'), meta: { title: '书籍编辑', requiresAuth: true, hideInMenu: true } },
    { path: 'books/create', name: 'BookCreate', component: () => import('@/views/posts/books/create.vue'), meta: { title: '书籍创建', requiresAuth: true, hideInMenu: true } },

    // 章节
    { path: 'chapters', name: 'ChapterList', component: () => import('@/views/posts/chapters/list.vue'), meta: { title: '章节列表', requiresAuth: true, hideInMenu: false } },
    { path: 'chapters/view/:id', name: 'ChapterView', component: () => import('@/views/posts/chapters/view.vue'), meta: { title: '章节详情', requiresAuth: true, hideInMenu: true } },
    { path: 'chapters/edit/:id', name: 'ChapterEdit', component: () => import('@/views/posts/chapters/edit.vue'), meta: { title: '章节编辑', requiresAuth: true, hideInMenu: true } },
    { path: 'chapters/create', name: 'ChapterCreate', component: () => import('@/views/posts/chapters/create.vue'), meta: { title: '章节创建', requiresAuth: true, hideInMenu: true } },

    // 文章
    { path: 'articles', name: 'ArticleList', component: () => import('@/views/posts/articles/list.vue'), meta: { title: '文章列表', requiresAuth: true, hideInMenu: false } },
    { path: 'articles/view/:id', name: 'ArticleView', component: () => import('@/views/posts/articles/view.vue'), meta: { title: '文章详情', requiresAuth: true, hideInMenu: true } },
    { path: 'articles/edit/:id', name: 'ArticleEdit', component: () => import('@/views/posts/articles/edit.vue'), meta: { title: '文章编辑', requiresAuth: true, hideInMenu: true } },
    { path: 'articles/create', name: 'ArticleCreate', component: () => import('@/views/posts/articles/create.vue'), meta: { title: '文章创建', requiresAuth: true, hideInMenu: true } },

  ],
};

export default POSTS;
