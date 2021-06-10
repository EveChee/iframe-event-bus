/*
 * @Author: Eco
 * @Date: 2021-05-11 14:08:14
 * @LastEditors: Eco
 * @LastEditTime: 2021-06-09 09:58:23
 * @Description: 事件总站
 */
export default class EventBus {
    /* 事件池 */
    private eventMap = new Map<string, Function[]>()
    /* 添加事件 */
    addEvent(name: string, cb: Function) {
        let eventPool = this.eventMap.get(name) ?? []
        eventPool.push(cb)
        this.eventMap.set(name, eventPool)
    }
    private localDispatch(name: string, data: any) {
        const eventPool = this.eventMap.get(name)
        // 如果没有注册该事件
        if (!eventPool) return
        eventPool.forEach((_) => _(data))
    }
    private acrossDispatch(name: string, data: any, context: any) {
        try {
            context.postMessage({ origin: this.origin, name, data }, '*')
        } catch (e) {
            console.error('EventBus Error:', e)
        }
    }
    /* 触发事件 */
    dispatch(name: string, data: any, context: any = this.context) {
        if (context) {
            this.acrossDispatch(name, data, context)
        } else {
            this.localDispatch(name, data)
        }
    }
    /* 约定的站名 */
    private origin: string
    /* 跨应用发送事件的上下文 */
    private context: any
    private register() {
        window.addEventListener('message', (e) => this.eventHandler(e))
    }
    private eventHandler(e: MessageEvent) {
        // 约定源不同 不做响应
        if (e?.data?.origin !== this.origin) return
        const { name, data } = e.data
        this.dispatch(name, data)
    }
    constructor(origin: string = 'sdp-print', context?: any) {
        this.origin = origin
        this.context = context
        this.register()
    }
    /* 清除事件 */
    clear() {
        this.eventMap.clear()
    }
}
