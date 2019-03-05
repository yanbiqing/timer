### 引入

复制源码到自己项目下的Util中, 或者直接引入文件

### 使用方法

(vue示例)

```javascript
// 引入 
import Timer  from './timer.js'

// mounted
  mounted() {
    const _this = this;
    this.timer = new Timer({
      time: 20,
      enterCb() {
        // 进入此计时器后禁止用户点击
        _this.canUserGetMsg = false;
      },
      resetCb() {
        // 被中断时退出方法恢复用户点击
        _this.canUserGetMsg = true;
      },
      timeStartCb(count) {
        // 开始计时之前为关联的倒计容器附上初始值 (必要)
        _this.timeLeft = count;
      },
      timeFinishedCb() {
        // 计时完成后
        _this.canUserGetMsg = true;
      },
      timeRuntimeCb(count) {
        _this.timeLeft = count;
      }
    });
      // 页面自动加载定时器
    this.timer.continue();
  }

// 点击事件
    // 获得验证码
    getMobileMsg() {
      if (!this.canUserGetMsg) {
        return;
      }
      if (!this.phoneValid) {
        this.$store.commit("showDialog", "请输入正确的手机号");
        return;
      }
	  // 开始计时
      this.timer.start();
        // 遇到错误重置计时器
      loginActions.getRegistrMobileMsg(this.phoneValue).catch(err=>this.timer.reset());
    },

```



### 参数说明

| 参数名称              | 参数说明                                                     | 参数类型 | 回调参数                                                     |
| --------------------- | ------------------------------------------------------------ | -------- | ------------------------------------------------------------ |
| time                  | 倒计时总秒数 <br />**默认**:60                               | Number   |                                                              |
| subscribeLocalStorage | 是否开启同步本地localStory功能, 开启后每次刷新页面都可以获得时间间隔从而继续开始计时而不是重新开始计时, 注意是以时间节点来存储,会自动计算剩下的时间<br />**默认**: true | Boolean  |                                                              |
| LocalStorageKey       | 指定localStory中存储的名字, 防止多个计时器互相干扰<br />**默认**: "timeLeft" | String   |                                                              |
| enterCb               | 进入计时器但没开始计时的函数                                 | Function |                                                              |
| resetCb               | continue方法中时间差大于指定时间以及reset方法都会调用此方法, 移除localStorage的时间点, 重置时间数 | Function |                                                              |
| timeStartCb           | 计时器开始计时之前调用, 用来初始化倒计时显示容器(重要)       | Function | timeBetween<br />时间间隔, 用来初始化剩余时间或者从新开始计数, 若剩余时间间隔<指定的time 则继续计数, 否则从time值开始计数 |
| timeFinishedCb        | 倒计时描述变成0结束倒计时之后调用                            | Function | zero<br />倒计时完成, 数值为0                                |
| timeRuntimeCb         | 倒计时每执行一次调用                                         | Function | timeLeft<br />剩余时间,每次运行一次更改一次时间              |



### 提供建议请联系作者(感谢)

QQ: 243789695