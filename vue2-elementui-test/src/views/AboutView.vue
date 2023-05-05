<script>
import SearchBox from '../components/SearchBox.vue'
import TableBox from '../components/TableBox.vue'
import Count from '../components/Count.vue'
export default {
  components: {SearchBox, TableBox, Count},
}
</script>
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <SearchBox></SearchBox>
    <Count></Count>
    <hr />
    <TableBox></TableBox>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
}
</style>
