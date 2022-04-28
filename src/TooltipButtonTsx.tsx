import { defineComponent, PropType } from "vue";
// import { TooltipButtonProps } from "./types";
import { Button, Tooltip } from "@arco-design/web-vue";
export default defineComponent({
  name: "TooltipButton",
  props: {
    /**
     * @zh 提示文字
     * @en tip
     */
    tip: {
      type: String as PropType<string>,
    },
    /**
     * @zh 按钮组件Props
     * @en
     */
    buttonProps: {
      type: Object as PropType<any>,
      default: () => {},
    },
  },
  setup(props, { slots }) {
    return () => {
      if (props.tip) {
        return (
          <Tooltip content={props.tip} position="bottom">
            <Button class="tooltip-button" {...props.buttonProps} >
            { slots.default &&  slots.default() }
            </Button>
          </Tooltip>
        );
      }
      return (
        <Button class="tooltip-button" {...props.buttonProps}>
          { slots.default &&  slots.default() }
        </Button>
      );
    };
  },
});
