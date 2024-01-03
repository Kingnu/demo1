//该文件用于创建整个应用的路由器
import VueRouter from 'vue-router';
import Login from "@/components/Login";
import Home from "@/components/Home";
import welcome from "@/components/welcome";
import UserList from "@/components/users/UserList";
import RoleList from "@/components/RoleList";

const router =  new VueRouter({
    routes:[
        {
            path:'/',
            redirect:'/login'
        },
        {
            path:'/login',
            component: Login
        },
        {
            path:'/home',
            component: Home,
            redirect:"/home/welcome",
            children:[
                {
                    path:"welcome",
                    component:welcome
                },
                {
                    path:'users',
                    component:UserList
                },
                {
                    path:'roles',
                    component:RoleList
                }
            ]
        }
        ]
})
router.beforeEach((to,from,next)=>{
    console.log(to);
    console.log(next);
    if(to.path === '/login' ){
        next();
    }else {
        let token = sessionStorage.getItem("token");
        if (!token){
            next("/login")
        }else {
            next();
        }
    }
})
export default router;
