/**
 * Created by jige on 2016/11/21.
 */
//按模块打包
const login = resolve => require.ensure([], () => resolve(require('./views/login/login.vue')), 'login');
const manageUser = resolve => require.ensure([], () => resolve(require('./views/manage/user.vue')), 'manage');

//定义路由，为每个路由映射一个组件
export default[
    {path: '/', name: 'login', component: login},
    {path: '/login', name: 'login', component: login},

    {path: '/manage', name: 'manage', redirect:{name: 'manage-user'}},
    {path: '/manage/user', name: 'manage-user', component: manageUser},
]
