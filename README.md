# 跨应用通信插件 EventBus

目前基于 postMessage 实现通信

## 内置导出 EventBus 类

实例化参数(\*为必传) 两个参数

|  参数   |  类型  |                            说明                            |   默认值    |
| :-----: | :----: | :--------------------------------------------------------: | :---------: |
| origin  | String |                           约定源                           | 'sdp-print' |
| context |  any   | 事件上下文(一般是 window，有自定义实现 postMessage 也可以) |    none     |

```js
import EventBus from 'iframe-event-bus'
// import EventBus from '@sdp/event-bus' 内部请使用这个包名
const bus = new EventBus()
// 如果有其他约定源也可以
const bus = new EventBus('origin')
```

## 实例属性与方法说明

@Method: addEvent 添加事件

```
参数说明:
@Param name:string 事件名
@Param cb:Function 回调函数
@Return void
```

```js
// addEvent示例代码
bus.addEvent('事件名', (e) => {
    console.log(e)
})
```

@Method: dispatch 触发事件

```
参数说明:
@Param name:string 事件名
@Param data:any 传递的参数
@Param context:any 事件发送的上下文 默认是初始化时候的context 一般用具体的window
@Return void
```

```js
// dispatch示例代码
bus.dispatch('事件名', { msg: '参数消息' }, iframe.contentWindow)
```

@Method: clear 清除所有事件

```
参数说明:
@Return void
```

```js
// clear示例代码
bus.clear()
```
