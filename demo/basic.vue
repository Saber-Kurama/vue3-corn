<template>
  <CronInput v-model="corn"></CronInput>
  <div>{{ corn }}</div>
</template>

<script lang="ts">
import CronInput from "@dangojs/vue3-corn";
// 目前vue-live导出defineComponent存在问题，所以仅支持普通对象导出。
export default {
  name: "BasicDemo",
  data: () => ({
    corn: "1-15 * 0-20 * * ? *",
  }),
  components: {
    CronInput,
  },
};
</script>
