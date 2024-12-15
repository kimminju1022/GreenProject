import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent from '../views/components/auth/LoginComponent.vue';
import UserRegistrationComponent from '../views/components/auth/UserRegistrationComponent.vue';
import ProductListComponent from '../views/components/board/ProductListComponent.vue';
import BoardListComponent from '../views/components/board/BoardListComponent.vue';
import BoardDetailComponent from '../views/components/board/BoardDetailComponent.vue';
import BoardCreateComponent from '../views/components/board/BoardCreateComponent.vue';
import BoardUpdateComponent from '../views/components/board/BoardUpdateComponent.vue';
import NotFoundComponent from '../views/components/NotFoundComponent.vue';
import MyPageComponent from '../views/components/user/MyPageComponent.vue';
import MyPageUpdateComponent from '../views/components/user/MyPageUpdateComponent.vue';
import PasswordComponent from '../views/components/user/PasswordComponent.vue';
import PasswordUpdateComponent from '../views/components/user/PasswordUpdateComponent.vue';
import MainPageComponent from '../views/components/MainPageComponent.vue';
import HotelListDetailComponent from '../views/components/board/HotelListDetailComponent.vue';
import HotelListComponent from '../views/components/board/HotelListComponent.vue';
import { useStore } from 'vuex';
import HotelMapComponent from '../views/components/board/HotelMapComponent.vue';


const chkAuth = (to, from, next) => {
    const store = useStore();
    const authFlg = store.state.user.authFlg;
    // const noAuthPassFlg = (to.path === '/' || to.path === '/login' || to.path === '/registration');
    const noAuthPassFlg = (to.path === '/login' || to.path === '/registration');
    
    if(authFlg && noAuthPassFlg) {
        next('/');
    } else if(!authFlg && !noAuthPassFlg) {
        next('/login');
    } else {
        next();
    }
}


const routes = [
    // 다른 경로와 컴포넌트 추가 가능
    {
        path: '/',
        component: MainPageComponent,
    },
    {
        path: '/login',
        component: LoginComponent,
    },
    {
        path: '/registration',
        component: UserRegistrationComponent,
    },
    {
        path: '/hotels',
        component: HotelListComponent
    },
    {
        path: '/hotels/detail',
        component: HotelListDetailComponent,
    },
    {
        path: '/hotels/map',
        component: HotelMapComponent,
    },
    {
        path: '/products',
        component: ProductListComponent,
    },
    {
        path: '/boards',
        component: BoardListComponent,
    },
    {
        path: '/boards/detail',
        component: BoardDetailComponent,
    },
    {
        path: '/boards/create',
        component: BoardCreateComponent,
    },
    {
        path: '/boards/update',
        component: BoardUpdateComponent,
    },
    {
        path: '/mypage',
        component: MyPageComponent,
    },
    {
        path: '/mypage/update',
        component: MyPageUpdateComponent,
    },
    {
        path: '/password',
        component: PasswordComponent,
    },
    {
        path: '/password/update',
        component: PasswordUpdateComponent,
    },
    {
        path: '/:catchAll(.*)',
        component: NotFoundComponent,
    },
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;