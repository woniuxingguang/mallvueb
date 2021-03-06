import axios from 'axios'

export function request(config){
    //1.创建axios的实列
    const instance = axios.create({
        baseURL: 'http://123.207.32.32:8000',
        timeout: 5000
    })
    //2.axios的拦截器
    //2.1 请求拦截的作用
    instance.interceptors.request.use(config => {
        return config
    }, err => {

    })
    //2.2响应拦截,可以对请求的数据进行一步过滤，返回真正想要的数据
    instance.interceptors.response.use(res => {
        return res.data
    },err => {
        console.log(err)
    })
    //3.发送真正的网络请求,返回的是Promise
    return instance(config)
}