import request from '@/request/request'




/**======================================== 公共============================== */


/** ================================== 登录 ===============================*/

/**
 *登录 
 * @export
 * @param {*} uname      账号
 * @param {*} pwd        密码
 * @param {*} sel        地区
 * @returns
 */
export function onLog(uname,password) {
    if (uname === 'admin' && password === '1') {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              code: 200,
              message: 'success',
              data: {
                token: 'usertoken',
                userInfo: {
                  id: 1,
                  name: '张三',
                  menus: [
                    {id:1,path:'/a',title:'第一'},
                    {id:2,path:'/b',title:'第二'},
                  ]
                }
              }
            })
          }, 1500)
        })
      } else if(uname === 'user' && password === '1'){
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              code: 200,
              message: 'success',
              data: {
                token: 'usertoken',
                userInfo: {
                  id: 1,
                  name: '李四',
                  menus: [
                    {id:1,path:'/a',title:'第一'},
                    {id:3,path:'/c',title:'第三'}
                  ]
                }
              }
            })
          }, 1500)
        })
      } else {
        return Promise.resolve({
          code: 100,
          message: '用户名或密码错误'
        })
      }
}


// export function onLog(uname,password) {
//     console.log(uname,password)
//     return request.post('/user/login',{uname,password})
// }
// export function onLog(userName,password) {
//     console.log(userName,password)
//     return request.get('/panx3/admin/check.action',{params:{
//         'item.userName':userName,
//         'item.passwd':password
//     }})
// }