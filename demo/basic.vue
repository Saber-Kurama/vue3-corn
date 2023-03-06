<template>
  <CronInput v-model="cron"></CronInput>
  <div>{{ cron }}</div>
</template>

<script lang="ts">
// import CronInput from "@dangojs/vue3-cron";
import CronInput from "../src/index";
// 目前vue-live导出defineComponent存在问题，所以仅支持普通对象导出。
export default {
  name: "BasicDemo",
  data: () => ({
    cron: "1-15 * 0-20 * * ? *",
  }),
  components: {
    CronInput,
  },
};
</script>
