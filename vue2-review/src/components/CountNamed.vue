<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
const OPTIONS = [
  {value: 1, label: 1, name: 1},
  {value: 2, label: 2, name: 2},
  {value: 3, label: 3, name: 3},
  {value: 4, label: 4, name: 4},
]

export default {
  name: 'Count',
  data() {
    return {
      n: 1,
      options: OPTIONS,
    }
  },
  computed: {
    ...mapState('countAbout', ['sum', 'school', 'company', 'subject']),
    ...mapState('personAbout', ['personList']),
    //************getters*********************************** */
    ...mapGetters('countAbout', ['bigSum', 'xuexi']),
  },
  methods: {
    ...mapMutations('countAbout', {
      increment: 'JIA',
      decrement: 'JIAN',
    }),

    ...mapActions('countAbout', ['jiaOdd', 'jiaWait']),
  },
  mounted() {
    console.log(this.$store)
  },
}
</script>

<template>
  <div class="count-box">
    <div class="show-content">
      <h3 style="color: red">Person组件人员总数为{{ personList.length }}</h3>
      <div class="sum">当前和为{{ sum }}</div>
      <div class="sum">当前和的10倍为{{ bigSum }}</div>
      <div>学校{{ school }} 公司{{ company }} 科目{{ subject }}</div>
      <div>{{ xuexi }}</div>
    </div>
    <div class="action-box">
      <el-select
        v-model="n"
        placeholder="请选择"
        :style="{
          width: '80px',
        }"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button type="primary" @click="increment(n)">+</el-button>
      <el-button type="primary" @click="decrement(n)">-</el-button>
      <el-button type="primary" @click="jiaOdd(n)">奇数时加</el-button>
      <el-button type="primary" @click="jiaWait(n)">等再加</el-button>
    </div>
  </div>
</template>
<style>
.count-box {
  width: 100%;
}
.show-content {
  margin: 20px 0;
  font-size: 18px;
  font-weight: 900;
}
.action-box {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>
