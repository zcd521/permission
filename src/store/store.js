import Vue from 'vue'
import Vuex from 'vuex';
import router from '../router'
Vue.use(Vuex)

const dayname =[
  {
    path: '/',
    component: () => import('@/components/view/index'),
    children:[
      {
        path: '/b',
        name: 'b',
        component: () => import('@/components/b'),
        meta:{  title: '第二', keepAlive:false}
      },{
        path: '/c',
        name: 'c',
        component: () => import('@/components/c'),
        meta:{  title: '第三', keepAlive:false}
      },
    ]
  },
]
const  types = {
  SET_USERINFO:'SET_USERINFO',
  SET_AUTHENTICATED:'SET_AUTHENTICATED'
}

const state ={
  openTab:[],//所有打开的路由
  activeIndex:'/a', //激活状态
  //动态生成路由
  isAuthenticated: false, //状态
  userInfo: {},
  userRoutes: [],
}

const getters = {
  isAuthenticated: state => state.isAuthenticated,
  userInfo: state =>state.userInfo
}

const mutations ={

  [types.SET_USERINFO](state, userInfo) {
    state.userInfo = userInfo
    // console.log(state.userInfo)
    // 生成用户路由表
    state.userRoutes = dayname.filter(res => {
     //console.log(userInfo.menus)
     return userInfo.menus.some(menu => menu.name === res.name) 
    })
    // console.log(state.userRoutes)
    //添加错误路由
    state.userRoutes.push({
      path:'*',
      redirect: '/a',
    })
    // console.log(state.userRoutes)
    router.addRoutes(state.userRoutes) // 注册路由
  },
  [types.SET_AUTHENTICATED](state,isAuthenticated){
    // 获取到用户信息的同时将isAuthenticated标记为true，当然也可以直接判断userInfo
    if(isAuthenticated) state.isAuthenticated = isAuthenticated;
    else state.isAuthenticated = false;
  },

  // 添加tabs
  ADD_TABS(state, data) {
    this.state.openTab.push(data);
  },
  // 删除tabs
  DELETE_TABS (state, route) {
    let index = 0;
    for (let option of state.openTab) {
      if (option.route === route) {
        break;
      }
      index++;
    }
    this.state.openTab.splice(index, 1);
  },
  // 设置当前激活的tab
  SET_ACTIVEINDEX(state, index) {
    this.state.activeIndex = index;
  },
}

const actions ={
  setAuthenticated:({commit}, isAuthenticated)=>{
    commit(types.SET_AUTHENTICATED,isAuthenticated);
  },
  setUserInfo:({commit},userInfo)=>{
    commit(types.SET_USERINFO,userInfo);
  }
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
  })
//export default store;

