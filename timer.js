// timer
export function timer({
  pageAuto = false, // 改为true之后, 如时间间隔超过指定计时数会自动调用leave_unFinished_Cb函数并退出, 不再开启计时器, 多用于页面一加载自动开启计时的情形
  time = 60, // 倒计时总秒数
  enterCb, // 进入此函数时调用 (生命周期)
  leave_unFinished_Cb, // 离开此函数时候调用, 如使用pageAuto才会调用此函数, 如果时间间隔大于指定的倒计时描述就会自动退出函数并调用此方法
  timeStartCb, // 刚开始计数之前调用 (生命周期)
  timeFinishedCb, // 倒计时完成时候的调用 (生命周期)
  timeRuntimeCb, // 每次运行计数器时候的调用 (生命周期)
  timeout = 1000, // 计时器频率
  LocalStorageKey = 'timeLeft', // localStorage的key
  subscribeLocalStorage = true, // 是否开启localStorage模式, 用户刷新页面后也会根据时间点自动计算剩余时间后继续计时
  unit = 1000, // 显示的单位, 1000为显示秒,  1位1毫秒,
  timer = Vue || React || window,  // 指定全局对象, 用来用来clearInterval (非常重要, 否则组件销毁再加载会累加)
  timerKey="myt"
}) {
  let timeBetween;
  let timeLeft;

  // let count = timeBetweenMax;  // 出bug时候调试用
  // start meethod
  typeof enterCb === 'function' && enterCb()
  // 读取localStorage中的时间点点

  if (subscribeLocalStorage) {
    timeLeft = localStorage.getItem(LocalStorageKey);
  }

  //如果没有时间点, 放置时间点
  if (subscribeLocalStorage) {
    if (!timeLeft) {
      localStorage.setItem(LocalStorageKey, +Date.now())
    }
  }

  // 得到时间差
  if (subscribeLocalStorage) {
    timeBetween = Math.floor((Date.now() - timeLeft) / unit);
  } else {
    timeBetween = time
  }

  // 如果事件差大于time则放置新的时间点开始倒数
  if (timeBetween >= time) {
    if (pageAuto) {
      // startFunc
      typeof leave_unFinished_Cb === 'function' && leave_unFinished_Cb()
      return;
    }
    timeBetween = time;
    if (subscribeLocalStorage) {
      localStorage.setItem(LocalStorageKey, +Date.now())
    }
    handleCountMin(timeBetween, timer)
  } else {
    timeBetween = time - timeBetween;
    // 如果时间点小于time直接倒数
    handleCountMin(timeBetween, timer)
  }

  function handleCountMin(timeBetween) {
    let count = timeBetween;
    clearInterval(timer[timerKey]);
    typeof timeStartCb === 'function' && timeStartCb(timeBetween)
    timer[timerKey] = setInterval(() => {
      // 如果小于<=0
      if (count <= 0) {
        clearInterval(timer[timerKey]);
        // finished Func
        typeof timeFinishedCb === 'function' && timeFinishedCb(0)

      } else {
        // runtime Func
        count--;
        typeof timeRuntimeCb === 'function' && timeRuntimeCb(count)

      }
    }, timeout);

  }
}