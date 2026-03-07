# CloudBase 部署配置说明

## 部署方式选择

### 方式一：通过 CloudBase CLI 部署（推荐）

#### 1. 安装 CloudBase CLI
```bash
npm install -g @cloudbase/cli
```

#### 2. 登录腾讯云
```bash
tcb login
```

#### 3. 初始化环境
```bash
tcb init
```

#### 4. 部署网站
```bash
npm run build
tcb framework deploy
```

### 方式二：通过 GitHub Actions 自动部署

#### 1. 配置腾讯云密钥

在 GitHub 仓库设置中添加 Secrets：
- `TENCENT_SECRET_ID`: 腾讯云 SecretId
- `TENCENT_SECRET_KEY`: 腾讯云 SecretKey
- `CLOUDBASE_ENV_ID`: CloudBase 环境 ID

#### 2. 修改 cloudbaserc.json

将 `{{envId}}` 替换为你的 CloudBase 环境 ID，或使用环境变量：
```json
{
  "envId": "${CLOUDBASE_ENV_ID}",
  ...
}
```

#### 3. 推送代码触发部署

推送到 main 分支会自动触发部署。

### 方式三：通过 CloudBase 控制台手动部署

#### 1. 创建环境
访问 https://console.cloud.tencent.com/tcb
创建一个新的 CloudBase 环境

#### 2. 开启静态网站托管
在控制台中开启"静态网站托管"功能

#### 3. 上传文件
将 `dist` 目录中的所有文件上传到根目录

## 注意事项

1. **环境 ID**：需要先在腾讯云控制台创建 CloudBase 环境
2. **SecretKey**：需要在腾讯云访问管理中创建密钥
3. **域名**：CloudBase 会提供默认域名，也可以绑定自定义域名
4. **HTTPS**：CloudBase 默认支持 HTTPS

## 费用说明

CloudBase 提供免费额度：
- 静态网站托管：5GB 存储 + 5GB/月 流量
- 适合小型项目和测试使用