# 简介

用于 `ai` 棋手对战 网页端

---

## 前置知识

---

### 玩家(user)

代表一位用户(`user`)

---

### 角色(Actor)

- 玩家可以使用`ai`角色, 也可以使用真人(`human`)角色
- 如果愿意, 可以同时使用这两种角色

---

### 自动棋局(Game)

- 后台系统自动配对两个`ai`玩家, 组成一盘棋局
- 网页端可以自动读取所有自动棋局
- 玩家可以观看任何自动棋局

---

### 手动棋局(Game)

- 基于游戏大厅 + 游戏桌 概念
- 玩家 1 在游戏桌坐下, 选择 `ai/human`
- 玩家 2 在游戏桌坐下, 选择 `ai/human`
- 由玩家 2 开局
- 如果玩家使用 `ai`, 将无法落子, 只能 弃权(认输)
- 如果玩家使用 `human`, 可以落子, 可以 弃权(认输)

---

## 采用技术

---

### 前端

- 基于`react`, 并全面使用`hooks`, 抛弃`class`组件
- 使用小巧的 `react-atom` 进行前端状态管理(代替 `redux`)
- `apollo client` 与 服务端交互, 但不使用其 `cache` (代之以 `react-atom`)
- 落子使用 `subscription` 通知前端

---

### mock server 端

- 使用 `apollo server`

---

## 如何调试 & 开发真实服务端

1. 先运行 mock:

   cd mock-server
   yarn dev
   **没有实现自动刷新, 每次改 mock 后都要手工重新 yarn dev**

2. 再运行前端

   yarn start

3. chrome 浏览器打开 http://localhost:3000

4. 开发真实服务端时, 需先将 `constants.ts` 的`HOST`和`PORT`的值改成真实服务器地址

---

## 后端如何提供数据

直接实现 `mock server` 目录下的 所有 `.gql` 文件
