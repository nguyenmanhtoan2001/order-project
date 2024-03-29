<script setup lang="ts">
import { ref, onMounted, reactive, defineProps, watchEffect } from 'vue';
import { DishesData } from '../assets/data/data'
import type { FormInstance } from 'ant-design-vue';

const emits = defineEmits(['send-data','back']);
const formRef = ref<FormInstance>();
const props = defineProps({
  mealData: Object,
  restaurantData: Object
});
const listRestaurant: any = ref();
let formState:any = reactive({
  restaurant: undefined,
  meal: props.mealData?.meal,
  numberOfPeople: props.mealData?.numberOfPeople
});

const next = () =>{
  formRef.value?.validate()
    .then(() => {
      emits('send-data',formState);
    })
}

const previous = () =>{
  emits('back');
}

const uniqueRestaurant = (listRestaurant: any) => {
  return listRestaurant.reduce((accumulator: any, current: any) => {
    const existing = accumulator.find((item: any) => item.value === current.value);
    if (!existing) {
      accumulator.push(current);
    }
    return accumulator;
  }, []);
};

onMounted(() => {
  listRestaurant.value = DishesData.filter(x=>x.availableMeals.includes(props.mealData?.meal)).map(x =>{
    return {
      id: x.id,
      value: x.restaurant,
    }
  })
  listRestaurant.value = uniqueRestaurant(listRestaurant.value)
});

watchEffect(() => {
  if(props.restaurantData){
    formState = props.restaurantData
  }
});
</script>

<template>
  <div class="form">
    <a-form
      ref="formRef"
      :model="formState"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-item
        label="Restaurant"
        name="restaurant"
        :rules="[{ required: true, message: 'Please select a restaurant!' }]"
      >
        <a-select
          placeholder="Select a restaurant"
          v-model:value="formState.restaurant"
          allowClear
          :options="listRestaurant"
          style="width: 200px"
        >
        </a-select>
      </a-form-item>
      <a-form-item>
        <div class="btn-form">  
          <a-button type="primary" @click="previous" >Previous</a-button>
          <a-button type="primary" html-type="submit" @click="next" >Next</a-button>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped>
::v-deep.ant-form{
  width: 500px!important;
}

.form{
  width: 500px;
  margin: 0 auto;
}

.btn-form{
  display: flex;
  justify-content: space-between;
  width: 500px;
  margin-top: 100px;
}
</style>