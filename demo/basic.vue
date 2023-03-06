<template>
  <CronInput v-model="cron"></CronInput>
  <div>{{ cron }}</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
// import CronInput from "@dangojs/vue3-cron";
import CronInput from "../src/index";
const cron = ref("1-15 * 0-20 * * ? *");

setTimeout(() => {
  cron.value = "* * 0-20 * * ? *";
}, 3000);
</script>
