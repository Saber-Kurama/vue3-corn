import { defineComponent } from "vue";
import { Tabs, TabPane } from "@arco-design/web-vue";
import Second from "./time/Second";
import Minute from "./time/Minute";

export default defineComponent({
  name: "Corn",
  setup() {
    return () => {
      return (
        <Tabs default-active-key="2">
          <TabPane key="1" title="秒">
            <Second />
          </TabPane>
          <TabPane key="2" title="分">
            <Minute />
          </TabPane>
          <TabPane key="2" title="时">
            Content of Tab Panel 2
          </TabPane>
          <TabPane key="2" title="日">
            Content of Tab Panel 2
          </TabPane>
          <TabPane key="2" title="月">
            Content of Tab Panel 2
          </TabPane>
          <TabPane key="2" title="周">
            Content of Tab Panel 2
          </TabPane>
          <TabPane key="2" title="年">
            Content of Tab Panel 2
          </TabPane>
          <TabPane key="2" title="帮助">
            Content of Tab Panel 2
          </TabPane>
        </Tabs>
      );
    };
  },
});
