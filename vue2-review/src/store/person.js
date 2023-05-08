import axios from 'axios';
import {nanoid} from 'nanoid';
export default {
    namespaced:true,
    state:{
        personList:[
            {id:1,name:'张三'}
        ]
    },
    actions:{
        addPersonWang(context,value){
            if(value.name.indexOf('王') === 0){
                context.commit('ADD_PERSON',value)
            } else {
                alert('添加的人必须姓王')
            }
        },
        addPersonServer(context){
            axios.get('http://api.uixsj.cn/hitokoto/get?type=social').then((res)=> {
                context.commit('ADD_PERSON',{id:nanoid(),name:res.data})
            }).catch(res=>{
                console.log('请求出错')
            })
        }
    },
    mutations:{
        ADD_PERSON(state,value){
            if(value.name){
                state.personList.unshift(value)
            }else {
                alert('名字不能为空')
            }
        }
    },
    getters:{
        firstPersonName(state){
            return state.personList[0]?.name
        }
    }
}

