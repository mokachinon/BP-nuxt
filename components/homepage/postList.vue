<template>
    <div>
        <div v-if="portfolioData.length">
            <HomepagePostItem v-for="item in portfolioData.slice().reverse()" :key="item.id" :detail="item" />
        </div>
        <UiWaitingList v-else />
    </div>
</template>
  
<script>

export default {
    name: 'IndexPage',
    props: {
        portfolioData: {
            type: Array,
            default: ""
        },
        isUser: {
            type: Boolean,
            default: false
        }
    }
}
</script>