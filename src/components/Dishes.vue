<script setup lang="ts">
import { ref, onMounted, reactive, defineProps, watchEffect } from 'vue';
import { DishesData } from '../assets/data/data'
import type { FormInstance } from 'ant-design-vue';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

const dynamicValidateForm = reactive<{ totalDish: any[] }>({
  totalDish: [],
});
const emits = defineEmits(['send-data','back']);
const formRef = ref<FormInstance>();
const props = defineProps({
  restaurantData: Object,
  dishData: Object
});
let raw: any = ref();
let listDish: any = ref();
let record = reactive({
  restaurant: props.restaurantData?.restaurant,
  meal: props.restaurantData?.meal,
  numberOfPeople: props.restaurantData?.numberOfPeople,
  totalDish: [
    {
      dishName: undefined,
      noOfServings: 1
    }
  ],
});
const next = () =>{
  record.totalDish = dynamicValidateForm.totalDish
  formRef.value?.validate()
    .then(() => {
      const totalNumberOfDishes = record.totalDish.reduce((total, dish) => {
        if (dish.noOfServings) {
          return total + dish.noOfServings;
        } else {
          return total;
        }
      }, 0);
      if(totalNumberOfDishes <= 10 && totalNumberOfDishes >= record.numberOfPeople){
        emits('send-data',record);
      }else{
        message.error('The total number of dishes should be greater or equal to the number of people selected in the first step and a maximum of 10 is allowed. ')
      }
    })
}

const previous = () =>{
  emits('back');
}

const addDish = () =>{
  dynamicValidateForm.totalDish.push(
    {
      dishName: undefined,
      noOfServings: 1
    }
  );
}

const removeDish = (item: any) => {
  let index = dynamicValidateForm.totalDish.indexOf(item);
  if (index !== -1) {
    dynamicValidateForm.totalDish.splice(index, 1);
  }
  handleChange()
};

const handleChange = () => {
  listDish.value = raw.value.filter((x: any)=> !dynamicValidateForm.totalDish.some(y => y.dishName === x.value))
};

watchEffect(() => {
  if(props.dishData){
    record = props.dishData
    dynamicValidateForm.totalDish = record.totalDish
  }
});

onMounted(() => {
  listDish.value = DishesData.filter(
    x=>x.availableMeals.includes(props.restaurantData?.meal) &&  
    x.restaurant == props.restaurantData?.restaurant
  ).map(x =>{
    return {
      id: x.id,
      value: x.name,
      label: x.name,
    }
  });
  raw.value = listDish.value 
  if(dynamicValidateForm.totalDish.length <= 0){
    addDish()
  }
});
</script>

<template>
  <div class="form">
    <a-form
      ref="formRef"
      name="dynamic_form_nest_item"
      :model="dynamicValidateForm"
    >
      <a-space
        v-for="(item, index) in dynamicValidateForm.totalDish"
        :key="item.id"
        style="display: flex; margin-bottom: 8px"
        align="baseline"
      >
        <a-form-item
          label="Dish"
          :name="['totalDish', index, 'dishName']"
          :rules="{
            required: true,
            message: 'Please select a dish!',
          }"
        >
          <a-select
            placeholder="Select a dish"
            v-model:value="item.dishName"
            allowClear
            :options="listDish"
            style="width: 200px"
            @change="handleChange"
          >
          </a-select>
        </a-form-item>
        <a-form-item
          label="No. of servings"
          :name="['totalDish', index, 'noOfServings']"
          :rules="{
            required: true,
            message: 'Please enter no. of servings!',
          }"
        >
          <a-input-number :min="1" :max="10" v-model:value="item.noOfServings">
          </a-input-number>
        </a-form-item>
        <MinusCircleOutlined @click="removeDish(item)" />
      </a-space>
      <a-form-item>
        <plus-circle-outlined style="font-size: 30px;" @click="addDish"/>
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