<script>
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
    sum() {
      return this.$store.state.sum
    },
  },
  methods: {
    increment() {
      this.$store.dispatch('jia', this.n)
    },
    decrement() {
      this.$store.dispatch('jian', this.n)
    },
    oddIncrement() {
      if (this.$store.sum % 2) {
      }
    },
    waitIncrement() {
      setTimeout(() => {}, 1000)
    },
  },
}
</script>

<template>
  <div class="count-box">
    <div class="sum">当前和为{{ sum }}</div>
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
    <el-button type="primary" @click="increment">+</el-button>
    <el-button type="primary" @click="decrement">-</el-button>
    <el-button type="primary" @click="oddIncrement">当和为奇数时加</el-button>
    <el-button type="primary" @click="waitIncrement">等一等再加</el-button>
  </div>
</template>
<style>
.count-box {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
