<template>
    <div class="tab-bar-item" @click="itemClick">
        <div v-if="!isActive">
            <slot name="item-icon"></slot>
        </div>
        <div v-else>
            <slot name="item-icon-active"></slot>
        </div>
        <div :class="isActive ? 'active' : ''">
            <slot name="item-text"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TabBarItem",
        data(){
            return {
                // isActive: true
            }
        },
        props: {
            path: String
        },
        computed: {
            //判断是否为选中状态，当前路由和传来的路由地址比较
          isActive(){
              return this.$route.path === this.path
          }
        },
        methods: {
            itemClick(){
                //点击的时候进行路由跳转
                this.$router.replace(this.path)
            }
        }
    }
</script>

<style scoped>
    .tab-bar-item {
        margin-top: 2px;
    }
    .tab-bar-item img {
        width: 30px;
        vertical-align: middle;
     }
    .tab-bar-item div {
        font-size: 12px;
        text-align: center;
    }
    .active {
        color: var(--color-high-text);
    }

</style>