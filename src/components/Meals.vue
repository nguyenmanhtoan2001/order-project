<script setup lang="ts">
import { ref, reactive, defineProps, watchEffect } from 'vue';
import { MealsData } from '../assets/data/data'
import { defineEmits } from 'vue';
import type { FormInstance } from 'ant-design-vue';

const props = defineProps({
  mealData: Object,
});
const emits = defineEmits(['send-data']);

const formRef = ref<FormInstance>();

let formState:any = reactive({
  meal: undefined,
  numberOfPeople: 1,
});

const next = () =>{
  formRef.value?.validate()
    .then(() => {
      emits('send-data',formState);
    })
}

watchEffect(() => {
  if(props.mealData){
    formState = props.mealData
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
        label="Meal"
        name="meal"
        :rules="[{ required: true, message: 'Please select a meal!' }]"
      >
        <a-select
          placeholder="Select a meal"
          v-model:value="formState.meal"
          allowClear
          :options="MealsData"
          style="width: 200px"
        >
        </a-select>
      </a-form-item>
      <a-form-item
        label="Number of people"
        name="numberOfPeople"
        :rules="[{ required: true ,message: 'Please select a meal!' }]"
      >
        <a-input-number :min="1" :max="10" v-model:value="formState.numberOfPeople" style="width: 200px">
        </a-input-number>
      </a-form-item>
  
      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit" @click="next" class="btn-form">Next</a-button>
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
  float: right;
  margin-top: 100px;
}
</style>