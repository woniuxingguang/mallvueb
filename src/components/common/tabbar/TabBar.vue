<template>
    <div id="tab-bar">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "TabBar"
    }
</script>

<style scoped>
    #tab-bar {
        display: flex;
        justify-content: space-around;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        height: 49px;
        background: #fafafa;
        box-shadow: 0 1px 3px rgb(0,0,0,.3);
    }
</style>