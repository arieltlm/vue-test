<template>
  <div>
    <ul v-if="flags" class="list-wrap">
      <li v-for="(items,index) in lists" :key="index" class="item">
        {{items}}
        <a class="del" @click="delthis(index)" href="javascript:void(0);">x</a>
      </li>
    </ul>
    <p v-else>there is no list! Please input something above.</p>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        lists: ["zhongbuibiubu", "bubnibubgr", "bubobgnoab"]
      };
    },
    props: {
      msg: {
        requried: true
      }
    },
    computed: {
      flags: function () {
        return this.lists.length;
      }
    },
    watch: {
      msg: function () {
        // this.add()
        this.lists.push(this.msg);
      }
    },
    methods: {
      delthis(index) {
        return this.lists.splice(index, 1);
      },
      add() {
        this.lists.push(this.msg);
      }
    }
  };
</script>
<style>
  ul,
  li {
    margin: 10px;
    padding: 0;
  }

  .list-wrap{
    text-align: left;
  }
  .list-wrap .item{
      padding: 3px;
      font-size:14px;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
  }
  .del {
    display: inline-block;
    width: 20px;
    height: 20px;
    color: #000;
    text-decoration: none;
    font-size: 16px;
    text-align: center;
    border-radius: 3px;
    font-weight: 600;

  }
</style>
