<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
      input: '',
    }
  },
  computed: {
    ...mapState(['sum', 'personList']),
  },
  methods: {
    addPerson() {
      const thisPerson = {
        id: this.personList.length + 1,
        name: this.input,
      }
      this.$store.commit('ADD_PERSON', thisPerson)
    },
  },
}
</script>

<template>
  <div>
    <h1>人员列表</h1>
    <h3 style="color: red">Count组件求和为{{ sum }}</h3>
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <el-button type="primary" @click="addPerson">添加</el-button>
    <ul>
      <li v-for="person in personList" :key="person.id">{{ person.name }}</li>
    </ul>
  </div>
</template>
<style scoped>
.el-input {
  width: 300px;
  margin-right: 16px;
}
</style>
