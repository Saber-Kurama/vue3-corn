<template>
  <CronInput></CronInput>
</template>

<script lang="ts">
import CronInput from '@dangojs/vue3-corn';
// 目前vue-live导出defineComponent存在问题，所以仅支持普通对象导出。
export default {
  name: 'BasicDemo',
  components: {
    CronInput,
  },
};
</script>