import cron from 'node-cron';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { updateData } from './update-news.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 日志目录
const logDir = path.join(__dirname, '..', 'logs');
const logFile = path.join(logDir, 'scheduler.log');

// 确保日志目录存在
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// 日志函数
function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  
  console.log(logMessage.trim());
  fs.appendFileSync(logFile, logMessage, 'utf-8');
}

// 执行数据更新
async function updateNewsData() {
  log('开始更新数据...');
  try {
    updateData();
    log('更新成功');
  } catch (error) {
    log(`更新失败: ${error.message}`);
    throw error;
  }
}

// 每天早上8点执行更新
// Cron表达式: 秒 分 时 日 月 周
// '0 8 * * *' 表示每天8点0分执行
const schedulePattern = '0 8 * * *';

// 启动定时任务
const task = cron.schedule(schedulePattern, async () => {
  log('定时触发: 开始每日数据更新');
  try {
    await updateNewsData();
    log('每日数据更新完成');
  } catch (error) {
    log(`每日数据更新出错: ${error.message}`);
  }
}, {
  scheduled: false,
  timezone: 'Asia/Shanghai'
});

// 启动调度器
function start() {
  log('========================================');
  log('调度器启动');
  log(`定时任务: 每天 08:00 (北京时间)`);
  log(`日志文件: ${logFile}`);
  log('========================================');
  
  task.start();
  
  log('调度器已启动，等待下次执行...');
}

// 停止调度器
function stop() {
  log('调度器停止');
  task.stop();
}

// 立即执行一次更新（用于测试或手动触发）
async function updateNow() {
  log('手动触发: 立即执行更新');
  try {
    await updateNewsData();
    log('立即更新完成');
  } catch (error) {
    log(`立即更新出错: ${error.message}`);
  }
}

// 导出功能
export { start, stop, updateNow };

// 如果直接运行此脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  const command = process.argv[2];
  
  switch (command) {
    case 'start':
      start();
      break;
    case 'stop':
      stop();
      break;
    case 'update':
      updateNow().then(() => process.exit(0));
      break;
    default:
      console.log('用法:');
      console.log('  node scripts/scheduler.js start   - 启动调度器');
      console.log('  node scripts/scheduler.js stop    - 停止调度器');
      console.log('  node scripts/scheduler.js update  - 立即执行更新');
      process.exit(1);
  }
}