# Nezha Interface（哪吒DApp）

一个使用 React、Web3 和以太坊集成构建的现代 Web 界面。访问主页：[https://imjianhao.xyz](https://imjianhao.xyz)。

## 项目描述

Nezha Interface 是一个前端应用程序，旨在与基于以太坊的智能合约进行交互，利用了 `ethers.js`、`wagmi` 和 `@web3-react` 等库。它提供了无缝的用户体验，使用 React Query 进行数据获取和 Tailwind CSS 进行样式设计。

## 特性

- 支持多种钱包连接（MetaMask等）
- 响应式设计，适配多种设备
- 高性能的区块链数据交互
- 路由管理和页面导航
- 全面的测试覆盖（单元测试和UI差异测试）

## 安装

克隆仓库并安装依赖：

```bash
git clone <仓库地址>
cd nezha-interface
npm install
```

## 使用方法

项目包括多个脚本，用于在不同模式下运行应用程序：

- **开发模式**：启动带有热重载的客户端开发模式。
  ```bash
  npm run clent:dev
  ```

- **服务器模式**：运行客户端服务器（假定为开发服务器）。
  ```bash
  npm run clent:server
  ```

- **生产构建**：为生产环境构建项目。
  ```bash
  npm run clent:prod
  ```

- **测试**：使用 Jest 运行测试并生成覆盖率报告。
  ```bash
  npm test
  ```

- **UI差异测试**：使用 BackstopJS 运行视觉回归测试。
  ```bash
  npm run test:uidiff
  ```

## 项目结构

nezha-interface/
├── src/                # 源代码目录
│   ├── abis/           # 合约ABI文件
│   ├── assets/         # 静态资源（图片、字体等）
│   ├── components/     # React组件
│   ├── connections/    # Web3连接相关
│   ├── hooks/          # 自定义React Hooks
│   ├── layouts/        # 页面布局组件
│   ├── pages/          # 页面组件
│   ├── routes/         # 路由配置
│   ├── states/         # 状态管理
│   ├── types/          # TypeScript类型定义
│   └── utils/          # 工具函数
├── public/             # 公共静态资源
├── tests/              # 测试文件
│   ├── e2e/            # 端到端测试
│   └── unit/           # 单元测试
├── config/             # 项目配置文件
├── scripts/            # 项目脚本
└── docs/               # 项目文档

## 主要依赖

### 运行时依赖
- `@ethersproject/*`: 以太坊JavaScript工具
- `@tanstack/react-query`: 数据获取和状态管理
- `@web3-react/*`: Web3提供者集成（例如MetaMask）
- `connectkit`: Web3连接UI工具包
- `ethers`: 与区块链交互的以太坊库
- `react`, `react-dom`, `react-router-dom`: React生态系统
- `wagmi`: 以太坊的React钩子
- `lucide-react`: 图标库
- `tailwindcss`: 实用优先的CSS框架

### 开发依赖
- `@swc/*`: 快速JavaScript/TypeScript编译器
- `jest`, `@swc/jest`, `jest-stare`: 测试框架和报告
- `webpack`相关: 构建工具链
- `backstopjs`: 视觉回归测试
- `typescript`: 类型安全的JavaScript超集

## 测试

项目使用Jest进行单元测试，覆盖率报告存储在`docs/jest-stare`。运行以下命令执行测试：

```bash
npm test
```

视觉回归测试由BackstopJS提供：

```bash
npm run test:uidiff
```

## 贡献指南

欢迎贡献！请遵循以下步骤：
1. Fork仓库
2. 创建特性分支（`git checkout -b feature-name`）
3. 提交更改（`git commit -m "添加特性"`）
4. 推送到分支（`git push origin feature-name`）
5. 创建Pull Request

## 许可证

本项目根据ISC许可证授权。详见`package.json`。

---

## 开发者指南

### 代码风格

项目使用ESLint和Prettier进行代码格式化和风格检查。确保在提交前运行：

```bash
npm run lint
npm run format
```

### 部署

项目使用Webpack构建，可以通过以下命令生成生产版本：

```bash
npm run clent:prod
```

构建完成后，`dist`目录包含可部署到任何静态文件服务器的文件。

### 环境变量

项目使用`.env`文件管理环境变量。请参考`.env.example`创建自己的环境配置。