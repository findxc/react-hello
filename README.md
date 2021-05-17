# 用 create-react-app 来搭建一个脚手架

## 图省事就直接用 UmiJS
恩图省事的话就直接用 [UmiJS](https://umijs.org/zh-CN/docs/getting-started) 来新建项目啦，基本上啥都配置好了可以直接开始写业务。

在一个空的目录下执行 `npx @umijs/create-umi-app` 即可。

如果是 npm7 ，在 `npm i` 时可能会安装依赖失败说版本不兼容的问题，详见 [Bug 安装依赖报错 · Issue #6443 · umijs/umi · GitHub](https://github.com/umijs/umi/issues/6443) ，使用 `npm i --legacy-peer-deps` 即可。

## 但是如果还是想自己动手玩
先用 [create-react-app](https://create-react-app.dev/docs/getting-started) 来新建一个项目，命令是 `npx create-react-app react-hello` 。

浏览器兼容性和支持的语法：[Supported Browsers and Features | Create React App](https://create-react-app.dev/docs/supported-browsers-features) 。

打包出来的文件的解释见 [Creating a Production Build | Create React App](https://create-react-app.dev/docs/production-build) 。

如果项目中有比较多的自己封装的组件，可以加入一个预览的功能，这样前端、设计、产品都能比较方便知道现在项目中封装了哪些组件，见 [Developing Components in Isolation | Create React App](https://create-react-app.dev/docs/developing-components-in-isolation) 。

## 提交代码时自动格式化代码
MR 见 https://github.com/findxc/react-hello/pull/1/files 。

* [lint-staged](https://github.com/okonet/lint-staged#examples) 库表示只考虑本次提交的代码，而不是针对仓库全部代码
* [husky](https://typicode.github.io/husky/#/?id=automatic-recommended) 是一个钩子，这里只配置了 pre-commit ，就是 commit 前会做的事情
* [prettier](https://prettier.io/docs/en/configuration.html) 是一个格式化代码的工具，因为配置项很少可以避免花费太多时间来纠结

先 `npm i --save-dev lint-staged prettier` ，然后执行 `npx husky-init && npm i` ，然后在 package.json 中增加：

```json
"lint-staged": {
  "*.{js,jsx}": "eslint",
  "*.{js,jsx,html,css}": "prettier --write"
},
```

然后 `.husky/pre-commit` 这里面内容改为：

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

这样就配置好了，当你 commit 代码时，会用 eslint 去检查提交的代码有没有问题，也会用 prettier 去格式化一下代码。

## 路由
MR 见 https://github.com/findxc/react-hello/pull/2/files 。

使用 [react-router](https://reactrouter.com/web/guides/quick-start) 来管理路由，安装命令是 `npm i react-router-dom` 。

关于代码切割： [Code-Splitting – React](https://reactjs.org/docs/code-splitting.html) 。

## mock 数据
MR 见 https://github.com/findxc/react-hello/pull/3/files 。

但是这样如果新增一个 mock 文件的话，不会实时生效，所以又改了下，见 https://github.com/findxc/react-hello/pull/6/files 。

使用 [mocker-api](https://github.com/jaywcjlove/mocker-api) 来启动 mock 服务，使用 [mockjs](http://mockjs.com/examples.html) 来 mock 数据。

## 发请求
MR 见 https://github.com/findxc/react-hello/pull/4/files 。

使用 [axios](https://axios-http.com/docs/intro) 用来发请求，安装命令是 `npm i axios` 。

我们可以把一些关于请求的通用处理在 axios 中进行配置，比如发请求成功后都提示一下“操作成功”，如果请求失败则进行具体错误信息的提示，再比如请求 401 后跳转到登录页等。

如果后端接口不允许跨域，则需要配置代理：[Proxying API Requests in Development | Create React App](https://create-react-app.dev/docs/proxying-api-requests-in-development#configuring-the-proxy-manually)。

## antd
MR 见 https://github.com/findxc/react-hello/pull/5/files 。

[在 create-react-app 中使用 - Ant Design](https://ant.design/docs/react/use-with-create-react-app-cn) 。

## 数据管理
MR 见 https://github.com/findxc/react-hello/pull/7/files 。

[mobx](https://github.com/mobxjs/mobx) 使用比较简单，然后我这里对 store 其实没啥比较重的使用场景，所以就选择 mobx 比较省事。

直接定义一个 store ，然后在需要的地方引入这个 store 并用 observe 包装一下组件即可。

```jsx
// store
import { makeAutoObservable } from 'mobx'

class TimerStore {
  secondsPassed = 0

  constructor() {
    makeAutoObservable(this)
  }

  increaseTimer() {
    this.secondsPassed += 1
  }
}

export default new TimerStore()
```

```jsx
// 组件
import timerStore from '../stores/timer'

function Time() {
  return (
    <div>second: {timerStore.secondsPassed}</div>
  )
}

export default observer(Time)
```

如果希望把多个 store 合在一起的话或者说不同 store 之间要操作数据的话，可以参考 [MobX 6 with multiple stores using React hooks - DEV Community](https://dev.to/cakasuma/using-mobx-hooks-with-multiple-stores-in-react-3dk4) 。

## 配置绝对路径引入
MR 见 https://github.com/findxc/react-hello/pull/8/files 。

参考 [Importing a Component | Create React App](https://create-react-app.dev/docs/importing-a-component#absolute-imports) 来配置的。

## Less 样式支持
MR 见 https://github.com/findxc/react-hello/pull/9/files 。

参考 https://github.com/DocSpring/craco-less/issues/56 来配置的。

```
npm i @craco/craco craco-less 
```

如果是 npm7 ，需要加上 `--legacy-peer-deps` ，否则安装有报错。

以上就差不多了，能用了，开发的时候觉得哪里不顺手再自己改改。