<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">首页</div>
        </nav-bar>
        <home-swiper :banners="banners"/>
        <h1>首页</h1>

    </div>
</template>

<script>
    import NavBar from 'components/common/navbar/NavBar';
    import HomeSwiper from "./childComps/HomeSwiper";

    import { getHomeMultidata } from "../../network/home";

    export default {
        name: "Home",
        data(){
          return {
              banners: [],
              recommends: []
          }
        },
        components: {
            NavBar,
            HomeSwiper
        },
        created() {
            getHomeMultidata().then(res => {
                console.log(res)
                this.banners = res.data.banner.list
                this.recommends = res.data.recommend.list
            })
        }
    }
</script>

<style scoped>
    .home-nav {
        background: var(--color-tint);
        color: #fff;
    }


</style>