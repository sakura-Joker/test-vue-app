import axios from "axios";
import { ElMessage } from "element-plus";
import config from "@/config";
const service = axios.create({
    baseURL:config.baseApi
});

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use((res) => {
    console.log(res);
    
  const { data, msg, code } = res.data;
  if (code === 200) {
    return data;
  } else {
    ElMessage.error(msg || "网络错误...");
    return Promise.reject(msg || "网络错误...");
  }
});

function request(options) {
  options.method = options.method || "get";
  //调整get 请求参数 当使用get时 是使用的params
  if (options.method.toLowerCase() === "get") {
    options.params = options.data;
  }
  //对mock的开关做处理  config设置mock为fasle 但是某个接口我又要为true的情况处理
  let isMock = config.isMock;
  if (typeof options.mock !== "undefined") {
    isMock = options.mock;
  }
  //针对环境做处理
  if(config.env === 'prod'){
    service.defaults.baseURL = config.baseApi
  }else{
    service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
  }
  return service(options);
}

export default request;
