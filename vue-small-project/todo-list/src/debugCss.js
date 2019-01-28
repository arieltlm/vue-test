/*
* debucsser是一个简单的CSS调试工具，在您的工作流程中不太引人注目。

* 我经常发现自己在页面上的许多元素上应用一个“大纲”来查看它们的尺寸。

* 使用debugsser，我只需按住ctrl并移动鼠标，就可以在px中查看维度，并对我悬停的每个元素应用一个outline类。

* 如果按住ctrl+shift，则通过添加全局类将大纲类应用于页面上的所有元素。

* 您可以配置一些参数。

* 我发现可以方便地指定一个自定义类，我想应用于不同的元素，而不需要注释和取消注释我的CSS文件。
* https://github.com/lucagez/Debucsser
*/

// only if you installed via NPM
import Debucsser from 'debucsser';
// pass all the custom properties you want
const config = {
    color: 'palevioletred', // color of the outline
    width: '4px', // width of the outline
    grayscaleOnDebugAll: true, // apply grayscale filter to every element
    customClass: '', // a class existent in your stylesheet 给元素统一增加一个自定义的样式
}

// init the debugger
/* eslint-disable */
const debug = new Debucsser(config).init();

export default debug;