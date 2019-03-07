export default class Timer {
    constructor({
        time = 60, // 倒计时总秒数
        enterCb, // 进入此函数时调用
        resetCb, // 重置方法
        timeStartCb, // 刚开始计数之前调用
        timeFinishedCb, // 倒计时完成时候的调用
        timeRuntimeCb, // 每次运行计数器时候的调用
        LocalStorageKey = 'timeLeft', // localStorage的key
        subscribeLocalStorage = true, // 是否开启localStorage模式, 用户刷新页面后也会根据时间点自动计算剩余时间后继续计时
    }) {
        this.time = time;
        this.enterCb = enterCb
        this.resetCb = resetCb;
        this.timeStartCb = timeStartCb
        this.timeFinishedCb = timeFinishedCb
        this.timeRuntimeCb = timeRuntimeCb
        this.LocalStorageKey = LocalStorageKey
        this.subscribeLocalStorage = subscribeLocalStorage
        this._timeBetween
        this._timeLeft
        this._count =0;
    }

    start() {
        this.continue = false;
        this._start()
    }
    continue() {
        this.continue = true;
        this._start()
    }
    reset() {
        this._count = 0;
        // 清空倒计时
        typeof this.timeRuntimeCb === 'function' && this.timeRuntimeCb(this._count)
        // 重置倒计时时间
        localStorage.removeItem(this.LocalStorageKey)
        // 调用回调
        typeof this.resetCb ==='function' && this.resetCb()
    }

    _start() {
  
        // start meethod
        typeof this.enterCb === 'function' && this.enterCb()
        // 读取localStorage中的时间点
        if (this.subscribeLocalStorage) {
            this._timeLeft = localStorage.getItem(this.LocalStorageKey);
        }
        //如果没有时间点, 放置时间点
        if (this.subscribeLocalStorage) {
            if (!this._timeLeft) {
                localStorage.setItem(this.LocalStorageKey, +Date.now())
            }
        }
        // 得到时间差
        if (this.subscribeLocalStorage) {
            this._timeBetween = Math.floor((Date.now() - this._timeLeft) / 1000);
        } else {
            this._timeBetween = this.time
        }

        // 如果事件差大于time则放置新的时间点开始倒数
        if (this._timeBetween >= this.time) {
            if (this.continue) {
                // startFunc
                typeof this.resetCb === 'function' && this.resetCb()
                return;
            }
            this._timeBetween = this.time;
            if (this.subscribeLocalStorage) {
                localStorage.setItem(this.LocalStorageKey, +Date.now())
            }
            this._handleCountMin(this._timeBetween)
        } else {
            this._timeBetween = this.time - this._timeBetween;
            // 如果时间点小于time直接倒数
            this._handleCountMin(this._timeBetween)
        }
    }
    _handleCountMin(interval) {
        this._count = interval;
        clearInterval(this.timer);
        typeof this.timeStartCb === 'function' && this.timeStartCb(this._timeBetween)
        this.timer = setInterval(() => {
            // 如果小于<=0
            if (this._count <= 0) {
                clearInterval(this.timer);
                typeof this.timeFinishedCb === 'function' && this.timeFinishedCb()
                // finished Func

            } else {
                // runtime Func
                this._count--;
                typeof this.timeRuntimeCb === 'function' && this.timeRuntimeCb(this._count)

            }
        }, 1000);
    }
}