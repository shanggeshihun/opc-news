# OPC News - 一人公司日报

> 专注一人公司资讯，助力独立创业

## 项目简介

OPC Daily 是一个专注于"一人公司"资讯的 Web 应用，提供每日更新的新闻资讯和成功的商业模式案例分析。

## 功能特性

- 📰 **每日新闻** - 6 条精选的一人公司相关新闻
- 💰 **商业模式** - 已盈利的一人公司案例分析
- 🔄 **自动更新** - 每天 08:00 自动更新数据
- 📱 **响应式设计** - 支持移动端和桌面端

## 技术栈

- **前端**: 原生 JavaScript (Vanilla JS)
- **构建工具**: Vite 5.4
- **定时任务**: node-cron
- **部署**: 腾讯云 CloudBase
- **自动化**: GitHub Actions

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview

# 手动更新数据
npm run update-news
```

## 自动更新机制

项目通过 GitHub Actions 实现每日自动更新：

- **触发时间**: 每天 UTC 00:00（北京时间 08:00）
- **更新内容**: 新闻数据和商业模式案例
- **自动部署**: 数据更新后自动触发 CloudBase 部署

## 项目结构

```
opc-news/
├── src/                # 源代码
│   ├── main.js        # 主入口文件
│   └── style.css      # 样式文件
├── scripts/           # 自动化脚本
│   ├── scheduler.js   # 定时任务调度器
│   └── update-news.js # 数据更新脚本
├── public/            # 公共资源
│   └── data/          # 数据文件
├── dist/              # 构建输出
├── .github/           # GitHub 配置
│   └── workflows/     # GitHub Actions
├── cloudbaserc.json   # CloudBase 配置
└── CLOUDBASE.md       # CloudBase 部署指南
```

## 部署说明

### 腾讯云 CloudBase（推荐）

#### 方式一：GitHub Actions 自动部署（推荐）

1. **创建 CloudBase 环境**
   - 访问 https://console.cloud.tencent.com/tcb
   - 创建新环境，记录环境 ID

2. **创建腾讯云密钥**
   - 访问 https://console.cloud.tencent.com/cam/capi
   - 创建密钥，记录 SecretId 和 SecretKey

3. **配置 GitHub Secrets**
   在仓库设置中添加：
   - `TENCENT_SECRET_ID`: 腾讯云 SecretId
   - `TENCENT_SECRET_KEY`: 腾讯云 SecretKey
   - `CLOUDBASE_ENV_ID`: CloudBase 环境 ID

4. **推送代码触发部署**
   ```bash
   git push origin main
   ```

#### 方式二：手动部署

```bash
# 安装 CloudBase CLI
npm install -g @cloudbase/cli

# 登录
tcb login

# 构建
npm run build

# 部署
tcb framework deploy
```

详细配置请查看 [CLOUDBASE.md](./CLOUDBASE.md)

### GitHub Pages（备选）

1. 在 GitHub 仓库设置中启用 GitHub Pages
2. 选择部署分支：`main`
3. 选择部署目录：`/ (root)`
4. 等待自动部署完成

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！