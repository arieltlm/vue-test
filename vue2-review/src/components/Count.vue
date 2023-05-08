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
    // sum() {
    //   return this.$store.state.sum
    // },
    //对象写法-可以改属性名称
    /* ...mapState({
      sum: 'sum',
      school: 'school',
      company: 'company',
      subject: 'subject',
    }), */
    // 数组写法
    ...mapState(['sum', 'school', 'company', 'subject', 'personList']),
    //************getters*********************************** */
    /* bigSum() {
      return this.$store.getters.bigSum
    },
    xuexi() {
      return this.$store.getters.xuexi
    }, */
    //对象写法-可以改属性名称
    /* ...mapGetters({
      bigSum: 'bigSum',
      xuexi: 'xuexi',
    }), */
    ...mapGetters(['bigSum', 'xuexi']),
  },
  methods: {
    /* increment() {
      this.$store.commit('JIA', this.n)
    },
    decrement() {
      this.$store.commit('JIAN', this.n)
    }, */

    increment1() {
      this.JIA(this.n)
    },
    decrement1() {
      this.JIAN(this.n)
    },
    ...mapMutations(['JIA', 'JIAN']),

    ...mapMutations({
      increment: 'JIA',
      decrement: 'JIAN',
    }),

    /* oddIncrement() {
      this.$store.dispatch('jiaOdd', this.n)
    },
    waitIncrement() {
      this.$store.dispatch('jiaWait', this.n)
    }, */
    ...mapActions(['jiaOdd', 'jiaWait']),
    ...mapActions({
      oddIncrement: 'jiaOdd',
      waitIncrement: 'jiaWait',
    }),
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
      <el-button type="primary" @click="increment1">+</el-button>
      <el-button type="primary" @click="decrement1">-</el-button>
      <el-button type="primary" @click="oddIncrement(n)"
        >当和为奇数时加</el-button
      >
      <el-button type="primary" @click="waitIncrement(n)">等再加</el-button>
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
