<script>
import Count from '../components/Count.vue'
import PersonList from '../components/PersonList.vue'
export default {
	components: {Count, PersonList},
}
</script>
<template>
	<div class="about">
		<h1>This is an about page</h1>
		<Count></Count>
		<el-divider></el-divider>
		<PersonList></PersonList>
	</div>
</template>

<style>
@media (min-width: 1024px) {
	.about {
		display: flex;
		align-items: center;
		flex-direction: column;
	}
}
</style>
