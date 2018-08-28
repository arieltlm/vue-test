# checklist

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
checkList是根据[Vue.js新手教学|如何写一个Checklist组件](https://blog.dunizb.com//2017/11/18/Vue-checklist-components/)这篇博客跟学写的。

前部分样式都一致，只在后部分vue实现交互部分我自己根据功能思考实现的，有所区别。

区别部分做以下说明：

#### 3.2中加选中样式：
作者：
在checkbox标签上绑定一个事件selectedItem。
```
<input type="checkbox" id="1" @click="selectedItem($event)" v-model="checkboxValue" style="display:none" value="1">
```

```
methods: {
     selectedItem (event) {
        const labelNode = event.target.previousElementSibling
        const classList = labelNode.classList
        classList.contains('selected') ? classList.remove('selected') : classList.add('selected')
    }
}
```
我：
```
<label v-bind:for="item.id" class="line border-1px" v-bind:class="{selected:checkboxValue.indexOf(item.id)>=0}">
```
#### 3.3.2中对达到选中的数目后别的都灰掉
作者对watch和取dom节点$ref做了练习，
此处我的处理是：
```
 <div class="line-wrapper" v-for="(item,index) in examinationLists" v-bind:disabled="disabledFun(item.id)">
    <label v-bind:for="item.id" class="line border-1px" v-bind:class="{selected:checkboxValue.indexOf(item.id)>=0}">
        <div class="l">
            <div class="title" :class="{'gray':disabledFun(item.id)}">{{item.title}}</div>
            <div class="address" v-if="item.desc.length>0">{{item.desc}}</div>
        </div>
        <div class="r" :class="{'backgray':disabledFun(item.id)}"></div>
    </label>
    <input type="checkbox" name="" v-model="checkboxValue" v-bind:disabled="disabledFun(item.id)" style="display: none;" v-bind:id="item.id" :value="item.id">
</div>
```

```
 methods:{
    disabledFun(id){
        if(this.checkboxValue.length==this.max){
            return this.checkboxValue.indexOf(id)==-1
        }
    }
}
```
#### 4中组件的显示隐藏
作者是在子组件中做的显示隐藏
此处我的做法是：
```
 <div>
    <label class="selExamLabel">请选择考场：</label><input type="text" class="selExamInput" :value="addExam" placeholder="请选择考场" v-on:click="show = !show">
    <transition name="fade">
        <checklist v-if="show" :max="maxNum"  @getCancel="closes"></checklist>
    </transition>
    <div class="checklist-overlay"  v-if="show"></div>
</div>
```
使用的是过渡的方法做的，样式如下：
```
.fade-enter-active,.fade-leave-active{
    -webkit-transition: all .5s;
    transition: all .5s;
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
}
.fade-enter-to{
    -webkit-transition: all .5s;
    transition: all .5s;
    -webkit-transform: translateY(0%);
    transform: translateY(0%);
} 
```
所以蒙版也就在父组件中。

取消和确定的列表隐藏都是是通过子组件给父组件传递值来实现的。
```
//父组件中：
methods:{
    closes (msg){
        this.show=msg;
    }
}
//子组件中：
<span class="cancel" @click="closeIt">取消</span>

methods:{
    closeIt(){
        this.$emit('getCancel',false)
    },
}
```
#### 5中确定后向父组件传递值
作者使用的是父子组件之间的通信来实现的

我在此处：

数据是通过mock产生的。直接在子组件中进行了使用

确定后即选中的考场我使用的是vuex来记录这个状态值的。
```
//父组件中，input上绑定的value-addExam
computed:{
        addExam (){
            return this.$store.state.addExam.addExam.join(',');
        }
    },
//子组件中
methods:{
    confirmIt (){
        let checkExam =[];
        for (let i = 0;i<this.checkboxValue.length;i++){
            let index = this.examinationLists.findIndex((value,index) =>{
                return this.checkboxValue[i] == value.id 
            })
            checkExam.push(this.examinationLists[index].title)
        }
        this.$store.dispatch('confirmExam',checkExam);
        this.$emit('getCancel',false)
    }
}

```
vuex中的内容参加store文件夹中。