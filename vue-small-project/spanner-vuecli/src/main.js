// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
/*console.log(App);
console.log(App.data);
document.onclick = function(e){
	console.log(2333);
	var ule = document.getElementsByTagName("ul")[0];
	var apps = document.getElementById("#app");
    if(e.target.className != 'seInput'&&ule){
    	
    	apps.removeChild(ule);
      
    }
}*/