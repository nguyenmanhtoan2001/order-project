<script setup lang="ts">
import { ref, defineProps, watchEffect } from 'vue';
import { DishesData } from '../assets/data/data'

const emits = defineEmits(['send-data','back']);
const props = defineProps({
  dishData: Object,
});
const listOrder: any = ref();

const next = () =>{
  emits('send-data',props.dishData);
}

const previous = () =>{
  emits('back');
}

watchEffect(() => {
  if(props.dishData){
    listOrder.value = props.dishData
  }
});

</script>

<template>
  <div class="form">
    <a-card >
      <h1 style="text-align: center;"> Your Order </h1>
      <table style="width:100%">
        <tr>
          <th style="width:40%"> Meal </th>
          <td> {{ listOrder.meal }} </td>
        </tr>
        <tr>
          <th> No. of People </th>
          <td> {{ listOrder.numberOfPeople }} </td>
        </tr>
        <tr>
          <th> Restaurant </th>
          <td> {{ listOrder.restaurant }} </td>
        </tr>
        <tr>
          <th> Dishes </th>
          <td> 
            <a-card>
              <div v-for="item in listOrder.totalDish">
                <div>
                  <span>
                    {{  item.dishName }} -
                  </span>
                  <span>
                    {{  item.noOfServings }}
                  </span>
                </div>
              </div>
            </a-card>
          </td>
        </tr>
      </table>
    </a-card>
    <div class="btn-form">  
      <a-button type="primary" @click="previous" >Previous</a-button>
      <a-button type="primary" html-type="submit" @click="next" >Next</a-button>
    </div>
  </div>
</template>

<style scoped>
.form{
  width: 400px;
  margin: 0 auto;
}

.btn-form{
  display: flex;
  justify-content: space-between;
  width: 400px;
  margin-top: 100px;
}
table td{
  padding: 25px 10px;
}
table{
  text-align: left;
}
</style>