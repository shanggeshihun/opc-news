# OPC News 自动更新配置

## 概述

本项目已配置每日自动更新新闻数据功能。系统会在每天早上 8:00 (北京时间) 自动更新新闻和商业案例数据。

## 可用命令

### 开发相关
```bash
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm run preview      # 预览生产构建
```

### 数据更新相关
```bash
npm run update-news           # 手动更新一次数据
npm run scheduler:update      # 手动触发更新（通过调度器）
```

### 调度器管理
```bash
npm run scheduler:start       # 启动调度器（后台运行）
npm run scheduler:stop        # 停止调度器
npm run scheduler             # 查看调度器帮助
```

## 部署建议

### 方案一：使用 PM2 (推荐)

1. 安装 PM2:
```bash
npm install -g pm2
```

2. 创建 ecosystem 配置文件 `ecosystem.config.js`:
```javascript
module.exports = {
  apps: [{
    name: 'opc-news-scheduler',
    script: 'scripts/scheduler.js',
    args: 'start',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
}
```

3. 启动:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

4. 查看状态:
```bash
pm2 status
pm2 logs opc-news-scheduler
```

### 方案二：使用 systemd (Linux)

创建服务文件 `/etc/systemd/system/opc-news.service`:
```ini
[Unit]
Description=OPC News Scheduler
After=network.target

[Service]
Type=simple
User=your-user
WorkingDirectory=/path/to/opc-news
ExecStart=/usr/bin/node scripts/scheduler.js start
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

启动服务:
```bash
sudo systemctl daemon-reload
sudo systemctl start opc-news
sudo systemctl enable opc-news
sudo systemctl status opc-news
```

### 方案三：使用 cron 任务 (最简单)

直接使用系统的 cron 任务:

```bash
# 编辑 crontab
crontab -e

# 添加每天早上8点执行更新
0 8 * * * cd /path/to/opc-news && node scripts/update-news.js >> logs/update.log 2>&1
```

## 日志

调度器日志位于: `logs/scheduler.log`

查看日志:
```bash
tail -f logs/scheduler.log
```

## 自定义更新时间

编辑 `scripts/scheduler.js` 中的 cron 表达式:

```javascript
// 每天早上8点
const schedulePattern = '0 8 * * *';

// 每天中午12点
const schedulePattern = '0 12 * * *';

// 每天晚上8点
const schedulePattern = '0 20 * * *';

// 每6小时更新一次
const schedulePattern = '0 */6 * * *';
```

Cron 表达式格式: `分 时 日 月 周`

## 注意事项

1. 调度器需要持续运行才能执行定时任务
2. 确保服务器时区设置为正确的时区（默认使用 Asia/Shanghai）
3. 建议在生产环境中使用 PM2 或 systemd 来管理调度器进程
4. 日志文件会持续增长，建议定期清理或使用 logrotate