import { createRouter, createWebHashHistory } from 'vue-router';
import Login from "../src/components/Auth/Login.vue";
import authGuard from './auth-guard';
import SemesterIndex from '../src/components/Semesters/semesterIndex.vue';
import SemesterView from '../src/components/Semesters/SemesterView.vue';
import SemesterCreate from '../src/components/Semesters/SemesterCreate.vue';
import SemesterEdit from '../src/components/Semesters/SemesterEdit.vue';
import SubjectIndex from '../src/components/Subjects/SubjectIndex.vue';
import SubjectSemester from '../src/components/Subjects/SubjectSemester.vue';
import SubjectCreate from '../src/components/Subjects/SubjectCreate.vue';
import SubjectEdit from '../src/components/Subjects/SubjectEdit.vue';

const routes = [
    {
        path:'/login',
        component: Login,
        name: 'login'
    },
    { 
        path: '/semesters', 
        component: SemesterIndex,
        redirect: '/semesters/list',
        beforeEnter:[authGuard],
        children:[
            {
                path: 'list',
                component: SemesterView
            },
           {
                path: 'create',
                component: SemesterCreate
            },
            {
                path:':id/edit',
                component: SemesterEdit,
                props: true
            }
        ] 
    },
    { 
        path: '/subjects', 
        component: SubjectIndex,
        redirect: '/subjects/:id/semester',
        props: true,
        beforeEnter:[authGuard],
        children:[
            {
                path: ':id/semester',
                component: SubjectSemester,
                props: true
            },
           {
                path: 'create',
                component: SubjectCreate
            },
            {
                path:':id/edit',
                component: SubjectEdit,
                props: true
            }
        ] 
    },

  ];
const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;