<script lang="ts">
import { defineComponent } from "vue";
import { Button, Tooltip } from "@arco-design/web-vue";
import { TooltipButtonProps } from "./types";
export default defineComponent({
  name: "TooltipButton",
});
</script>
<script lang="ts" setup>
// interface Props  extends TooltipButtonProps {}
interface Props {
  /**
   * 提示文字
   */
  tip: string;
  /**
   * 按钮组件Props
   */
  buttonProps: any;
}
// https://github.com/vuejs/core/issues/4294
// const props = defineProps<TooltipButtonProps>();
const props = defineProps<Props>();
</script>
<template>
  <Tooltip v-if="props.tip" :content="props.tip" position="bottom">
    <Button class="tooltip-button" v-bind="props.buttonProps">
      <slot />
    </Button>
  </Tooltip>
  <Button v-else class="tooltip-button" v-bind="props.buttonProps">
    <slot />
  </Button>
</template>
