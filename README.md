### 引入

复制源码到自己项目下的Util中, 或者直接引入文件

import {timer} from './timer';

### 参数说明

| 参数名称              | 参数说明                                                     | 参数类型 | 回调参数                                                     |
| --------------------- | ------------------------------------------------------------ | -------- | ------------------------------------------------------------ |
| time                  | 倒计时总秒数 <br />**默认**:60                               | Number   |                                                              |
| pageAuto              | ,改为true之后, 如时间间隔超过指定计时数time会自动调用leave_unFinished_Cb函数并退出, 不再开启计时器, 多用于页面一加载自动开启计时的情形<br />**默认**:false | Boolean  |                                                              |
| subscribeLocalStorage | 是否开启同步本地localStory功能, 开启后每次刷新页面都可以获得时间间隔从而继续开始计时而不是重新开始计时, 注意是以时间节点来存储,会自动计算剩下的时间<br />**默认**: true | Boolean  |                                                              |
| LocalStorageKey       | 指定localStory中存储的名字, 防止多个计时器互相干扰<br />**默认**: "timeLeft" | String   |                                                              |
| timer                 | 绑定计时器对象, 可以指定全局对象,                            | Object   |                                                              |
| timerKey              | 全局timer对象下的key名,多个计时器可以指定不同的key名防止互相干扰<br />**默认**:"myt" | String   |                                                              |
| enterCb               | 进入计时器但没开始计时的函数                                 | Function |                                                              |
| leave_unFinished_Cb   | 开启pageAuto后, 如果时间间隔大于指定的倒计时秒数就会自动退出函数并调用此方法 | Function |                                                              |
| timeStartCb           | 计时器开始计时之前调用, 用来初始化倒计时显示容器(重要)       | Function | timeBetween<br />时间间隔, 用来初始化剩余时间或者从新开始计数, 若剩余时间间隔<指定的time 则继续计数, 否则从time值开始计数 |
| timeFinishedCb        | 倒计时描述变成0结束倒计时之后调用                            | Function | zero<br />倒计时完成, 数值为0                                |
| timeRuntimeCb         | 倒计时每执行一次调用                                         | Function | timeLeft<br />剩余时间,每次运行一次更改一次时间              |

### 使用案例

```javascript
 startTimer(pageAuto) {
      const _this =this;
      timer({
        pageAuto: pageAuto,
        time: 20,
        enterCb() {
          // 进入此计时器后用户点击无效
          _this.canUserGetMsg = false;
        },
        leave_unFinished_Cb() {
           // 被中断时退出方法,允许用户点击
          _this.canUserGetMsg = true;
        },
        timeStartCb(currentCount) {
          // 开始计时之前为关联的倒计容器附上初始值 (必要)
          _this.timeLeft = currentCount;
        },
        timeFinishedCb() {
          // 计时完成后, 允许用户点击
          _this.canUserGetMsg = true;
        },
        timeRuntimeCb() {
          _this.timeLeft--;
        }
      });
    }
```

### 提供建议请联系作者(感谢)

QQ: 243789695