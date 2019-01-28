import solarSystems from './solarSystem.vue';

const MlSolarSystem = {
    install: function (Vue) {
        if (typeof window !== 'undefined' && window.Vue) {
            Vue = window.Vue
        }
        Vue.component('solarSystem', solarSystems)
    }
}

export default MlSolarSystem
