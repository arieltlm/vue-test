import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const state = {
    sum:0,
    school:'xd',
    company:'lll',
    subject:'math',
    personList:[
        {id:1,name:'张三'}
    ]
}
const actions = {
    jia(context,value) {
        context.commit('JIA',value)
    },
    jian(context,value) {
        context.commit('JIAN',value)
    },
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
}
const mutations = {
    JIA(state,value) {
        state.sum += value
    },
    JIAN(state,value) {
        state.sum -= value
    },
    ADD_PERSON(state,value){
        state.personList.unshift(value)
    }
}

const getters = {
    bigSum(state){
        return state.sum * 10 
    },
    xuexi(state){
        return `在${state.school},学科是${state.subject}`
    }
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})