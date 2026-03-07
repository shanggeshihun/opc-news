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