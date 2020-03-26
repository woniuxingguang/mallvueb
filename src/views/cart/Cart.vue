<template>
    <div id="hy-swiper">
        <div class="my-swiper">
            <a v-for="item in banners" :href="item.link" class="my-slide">
                <img :src="item.image" alt="">
            </a>
        </div>
    </div>
</template>

<script>
    import { getHomeMultidata } from "../../network/home";
    export default {
        name: "cart",
        data(){
            return {
                banners: [],
                slideCount: 0,
                totalWidth: 0,
                swiperStyle: {},
                interval: 3000,
                currentIndex: 1,
                scrolling: false,
                animDuration: 300
            }
        },
        created() {
            console.log('created','请求数据')
            getHomeMultidata().then(res => {
                console.log('created',res)
                this.banners = res.data.banner.list
            })
        },
        mounted: function(){
            //這兒定时器的作用？为什么要设置100秒后才执行handleDom；
            //不写定时器，直接写handleDom执行，则slideCount数为0？
            console.log('mounted',this.banners)
            setTimeout(() => {
                this.handleDom()
                // this.startTimer()
            },100)
        },
        methods: {
            //定时器操作
            startTimer: function() {
              this.playTimer = window.setInterval(() => {
                  this.currentIndex++;
                  this.scrollContent(-this.currentIndex * this.totalWidth)
                  console.log(this.currentIndex)
              }, this.interval)
            },
            stopTimer: function () {
              window.clearInterval(this.playTimer)
            },
            //滚动到正确的位置
            scrollContent: function (currentPosition) {
                //1.开始滚动动画
                this.swiperStyle.transition = 'transform ' + this.animDuration + 'ms'
                this.setTransform(currentPosition)
                //2.判断滚动到的位置
                this.checkPosition();
            },
            //校验正确的位置
            checkPosition: function () {
                window.setTimeout(() =>{
                    this.swiperStyle.transition = '0ms';
                    if (this.currentIndex >= this.slideCount) {
                        this.currentIndex = 1;
                        this.setTransform(-this.currentIndex * this.totalWidth)
                    } else if (this.currentIndex <= 0) {
                        this.currentIndex = this.slideCount;
                        this.setTransform(-this.currentIndex * this.totalWidth)
                    }
                }, this.animDuration)

            },
            //设置滚动的位置
            setTransform: function(position) {
                this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`
                //考虑浏览器兼容问题：-webkit表示针对safari浏览器，-ms表示针对IE浏览器支持
                this.swiperStyle['-webkit-transform'] = `translate3d(${position}px, 0, 0)`
                this.swiperStyle['-ms-transform'] = `translate3d(${position}px, 0, 0)`
            },
            //操作DOM，在DOM前后添加slide
            handleDom: function () {
                //1.获取要操作的DOM
                let swiperEl = document.querySelector('.my-swiper');
                let slidesEls = swiperEl.getElementsByClassName('my-slide');
                console.log(swiperEl)
                console.log(slidesEls)
                //2.保存个数
                this.slideCount = slidesEls.length;
                console.log(slidesEls.length)
                //3.如果totalCount大于1.那么在前后分别添加一个slide
                // if(this.slideCount >1) {
                //     let cloneFirst = slidesEls[0].cloneNode(true)
                //     let cloneLast = slidesEls[this.slideCount-1].cloneNode(true)
                //     swiperEl.insertBefore(cloneLast, slidesEls[0]);
                //     swiperEl.appendChild(cloneFirst);
                //     this.totalWidth = swiperEl.offsetWidth;
                //     this.swiperStyle = swiperEl.style
                // }
                //4.让swiper元素，显示第一个（目前显示前面添加的最后一个元素）
                // this.setTransform(-this.totalWidth)
            }
        }
    }
</script>

<style scoped>
    #hy-swiper {
        overflow: hidden;
        position: relative;
        border:1px solid red;
    }
    /*.my-swiper {*/
    /*    width: 375px;*/
    /*}*/
    .my-swiper {
        display: flex;
        border:1px solid green;
    }
    .my-swiper .my-slide {
        width:100%;
        flex-shrink: 0;
    }
    .my-swiper img{
        width: 100%;
    }

</style>