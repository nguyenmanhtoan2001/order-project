import { createApp } from 'vue'
import './style.css'
import Order from './Order.vue'
import Antd from 'ant-design-vue';

createApp(Order).use(Antd).mount('#app')
