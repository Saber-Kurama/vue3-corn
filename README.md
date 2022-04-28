# vue3-transitions

根据 `vue2-transitions` 来改写的成 `vue3-transitions`
## 参照

[vue2-transitions](https://github.com/BinarCode/vue2-transitions)

## 安装

```
npm i vue3-corn
yarn add vue3-corn
pnpm add vue3-corn
```

## 使用

```
import { FadeTransition } from 'vue3-corn';
import 'vue3-corn/es/style/style.css';

<FadeTransition></FadeTransition>
```
## 后续规划

[ ] 解决ts提示问题

[ ] 解决样式问题

dango-vue  组件库的发布方案的调整

1. 支持 scss less 和 postcss
2. 考虑 css 独立 和 按需加载
3. 是否集成changeset
