抽奖平台

#### 启动项目
在 LOTTERY 根项目中输入指令：
安装依赖
```
npm i
```
启动前端项目
```
npm start
```
在 backend 的根目录中输入指令：
安装依赖
```
npm i 
```
启动后端服务
```
node serve
```
或 安装了 supervisor 可以使用：
```
supervisor serve
```

#### 所用技术
- 前端：
    - tmpl jQuery模板
    - websocket 心跳检测

- 后端：
    - 使用 nodejs 的 ws 模块开启 socket 服务
    - 读写 json 文件
    - express
#### 页面
- index.html 是用来抽奖的
- log.html 是用来给客户注册登录的
- console.html 是用来控制抽奖的一些配置

#### 功能
通过 console 可实现如下功能
- 可控制是否自动抽奖
    - 自动抽奖则不需发起人去主动点击暂停
        - 可控制抽奖倒计时时间countDownTime（前提是自动抽奖，这是点击开始到抽中这个过程所需时间，设置这个无需转动直接显示）
    - 不是自动抽奖，则需要发起人主动点击暂停
        - 是否立即选出中奖人 stopTimeOut （前提是手动暂停抽奖，这是点击暂停后是立即选出中奖人还是再转一会才选出）
    - 无论是否自动抽奖，都可以设置timeOut（自动抽奖没设置countDownTime的情况，该值是转动所需的时间）    
- 可指定抽中人
- 可修改抽奖平台名称

