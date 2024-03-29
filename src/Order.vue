<script setup lang="ts">
import { ref } from 'vue';
import { Step, Option } from './assets/enum'
import Meals from './components/Meals.vue'
import Restaurants from './components/Restaurants.vue'
import Dishes from './components/Dishes.vue'
import Review from './components/Review.vue'
import { notification } from 'ant-design-vue';

const adminRole = ref<boolean>(false)
const selectedKeys = ref([1]);
const mealData = ref()
const restaurantData = ref()
const dishData = ref()

const handleDataMeals = (data: any) => {
  if(data){
    selectedKeys.value = [Option.Restaurants]
    mealData.value = data
  }
}
const handleDataRestaurant = (data: any) => {
  if(data){
    selectedKeys.value = [Option.Dishes]
    restaurantData.value = data
  }
}
const handleDataDish = (data: any) => {
  if(data){
    selectedKeys.value = [Option.Review]
    dishData.value = data
  }
}
const handleDataRecord = (data: any) => {
  if(data){
    notification['success']({
      message: 'Congratulations!',
      description:
        'Order placed successfully.',
    })
    mealData.value = undefined
    restaurantData.value = undefined
    dishData.value = undefined
    selectedKeys.value = [Option.Meals]
  }
}

const backStep1 = () => {
  selectedKeys.value = [Option.Meals]
  restaurantData.value = undefined
}
const backStep2 = () => {
  selectedKeys.value = [Option.Restaurants]
  dishData.value = undefined
}
const backStep3 = () => {
  selectedKeys.value = [Option.Dishes]
}

const getStep = (key: number) =>{
  switch(key){
    case Option.Meals : 
      return 'Meals' 
    case Option.Restaurants : 
      return 'Restaurants' 
    case Option.Dishes : 
      return'Dishes' 
    case Option.Review : 
      return'Review' 
  }
}
</script>

<template>
  <a-layout>
    <a-layout-header class="layout-header">
      <div class="logo" >
      </div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="horizontal"
      >
        <div v-for="item in Step">
          <a-menu-item :disabled="!adminRole" :key="item.id">{{ item.value }}</a-menu-item>
        </div>
      </a-menu>
    </a-layout-header>
    <a-layout-content class='layout-content'>
      <a-breadcrumb class='breadcrumb'>
        <a-breadcrumb-item>Order</a-breadcrumb-item>
        <a-breadcrumb-item>{{ getStep(selectedKeys[0]) }}</a-breadcrumb-item>
      </a-breadcrumb>
      <div class="content">
        <Meals v-if="selectedKeys[0] === Option.Meals" @send-data="handleDataMeals" :mealData = mealData></Meals>
        <Restaurants v-if="selectedKeys[0] === Option.Restaurants" @back="backStep1":restaurantData = restaurantData :mealData = mealData @send-data="handleDataRestaurant"></Restaurants>
        <Dishes v-if="selectedKeys[0] === Option.Dishes" @back="backStep2" :dishData = dishData :restaurantData = restaurantData @send-data="handleDataDish"></Dishes>
        <Review v-if="selectedKeys[0] === Option.Review" @back="backStep3" :dishData = dishData @send-data="handleDataRecord"></Review>
      </div>
    </a-layout-content>
    <a-layout-footer class="footer">
      Created by Nguyễn Mạnh Toàn - Ant Design + VueJs3
    </a-layout-footer>
  </a-layout>
</template>

<style scoped>
#components-layout-demo-fixed .logo {
  width: 120px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}

.site-layout .site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}

.logo img{
  width: 60px;
  height: 40px;
}

.layout-content{ 
  padding : 0 50px; 
  margin-top : 64px; 
}

.breadcrumb{
  margin: 16px 0
}

.content{ 
  background: #fff;
  padding: 24px;
  min-height: 380px ;
}

.footer{
  text-align: center;
}

.layout-header{
  position: fixed;
  z-index: 1;
  width: 100%;
}

::v-deep .ant-menu-overflow-item{
  border-radius: 0px!important;
}
</style>
