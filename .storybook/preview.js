// TODO: 换成公共样式
// TODO: 这里使用了全局的样式 会影响 组件的样式
// import '@arco-design/web-vue/dist/arco.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}