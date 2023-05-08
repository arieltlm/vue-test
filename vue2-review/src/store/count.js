export default{
    namespaced:true,
    state:{
        sum:0,
        school:'xd',
        company:'lll',
        subject:'math',
    },
    actions:{
        jiaOdd(context,value) {
            if(context.state.sum % 2){
                context.commit('JIA',value)
            }
        },
        jiaWait(context,value) {
            setTimeout(() => {
                context.commit('JIA',value)
            }, 1000);
        }
    },
    mutations:{
        JIA(state,value) {
            state.sum += value
        },
        JIAN(state,value) {
            state.sum -= value
        },
    },
    getters:{
        bigSum(state){
            return state.sum * 10 
        },
        xuexi(state){
            return `在${state.school},学科是${state.subject}`
        }
    }
}