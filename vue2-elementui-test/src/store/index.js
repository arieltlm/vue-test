import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const state = {
    sum:0
}
const actions = {
    jia(context,value) {
        context.commit('JIA',value)
    },
    jian(context,value) {
        context.commit('JIAN',value)
    }
}
const mutations = {
    JIA(state,value) {
        state.sum += value
    },
    JIAN(state,value) {
        state.sum -= value
    },
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
})