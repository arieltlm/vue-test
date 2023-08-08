<script>
import SearchBox from '../components/SearchBox.vue'
import TableBox from '../components/TableBox.vue'
export default {
	components: {SearchBox, TableBox},
}
</script>
<template>
	<div class="about">
		<h1>This is an about page</h1>
		<SearchBox></SearchBox>
		<TableBox></TableBox>
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
