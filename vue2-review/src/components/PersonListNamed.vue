<script>
import {nanoid} from 'nanoid'
export default {
  data() {
    return {
      input: '',
    }
  },
  computed: {
    sum() {
      return this.$store.state.countAbout.sum
    },
    personList() {
      return this.$store.state.personAbout.personList
    },
    firstPersonName() {
      return this.$store.getters['personAbout/firstPersonName']
    },
  },
  methods: {
    addPerson() {
      const thisPerson = {
        id: nanoid(),
        name: this.input,
      }
      this.$store.commit('personAbout/ADD_PERSON', thisPerson)
      this.input = ''
    },
    addPersonWang() {
      const thisPerson = {
        id: nanoid(),
        name: this.input,
      }
      this.$store.dispatch('personAbout/addPersonWang', thisPerson)
      this.input = ''
    },
    addPersonServer() {
      this.$store.dispatch('personAbout/addPersonServer')
    },
  },
}
</script>

<template>
  <div>
    <h1>人员列表</h1>
    <h3 style="color: red">Count组件求和为{{ sum }}</h3>
    <h3 style="color: blue">列表第一个人的名字：{{ firstPersonName }}</h3>
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <el-button type="primary" @click="addPerson">添加</el-button>
    <el-button type="primary" @click="addPersonWang"
      >添加一个姓王的人</el-button
    >
    <el-button type="primary" @click="addPersonServer">请求添加</el-button>
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
