import './style.css'

let newsData = []
let businessData = []
let lastUpdate = ''

async function fetchData() {
  try {
    const [newsRes, businessRes] = await Promise.all([
      fetch('/data/news.json'),
      fetch('/data/business.json')
    ])
    const newsJson = await newsRes.json()
    const businessJson = await businessRes.json()
    newsData = newsJson.news || []
    businessData = businessJson.business || []
    lastUpdate = newsJson.lastUpdate || ''
  } catch (e) {
    console.error('获取数据失败:', e)
  }
}

function renderHeader() {
  return `
    <header class="header">
      <div class="header-content">
        <div class="logo">
          <div class="logo-icon">OP</div>
          <span>OPC Daily</span>
        </div>
        <nav class="nav">
          <a class="nav-link active" data-page="news">每日新闻</a>
          <a class="nav-link" data-page="business">商业模式</a>
        </nav>
      </div>
    </header>
  `
}

function renderNewsPage() {
  const newsCards = newsData.map(news => `
    <article class="news-card">
      <div class="news-image" style="background: ${news.image}"></div>
      <div class="news-content">
        <span class="news-tag">${news.tag}</span>
        <h3 class="news-title">${news.title}</h3>
        <p class="news-excerpt">${news.excerpt}</p>
        <div class="news-meta">
          <span>${news.date}</span>
          <span>${news.readTime}阅读</span>
        </div>
      </div>
    </article>
  `).join('')

  const updateTime = lastUpdate ? lastUpdate.split(' ')[0] : new Date().toLocaleDateString('zh-CN')

  return `
    <div class="page" id="news-page">
      <section class="hero">
        <h1>一人公司日报</h1>
        <p>每日更新最新的一人公司动态、成功案例和商业模式分析</p>
        <div class="update-time">
          <span class="live-dot"></span>
          <span>每日 08:00 更新 · 上次更新：${updateTime}</span>
        </div>
      </section>
      
      <section class="news-section">
        <h2 class="section-title">
          <span class="icon">📰</span>
          最新资讯
        </h2>
        <div class="news-grid">
          ${newsCards}
        </div>
      </section>
    </div>
  `
}

function renderBusinessPage() {
  const businessCards = businessData.map(business => `
    <div class="business-card">
      <div class="business-header">
        <h3 class="business-name">${business.name}</h3>
        <span class="revenue-badge">${business.revenue}</span>
      </div>
      <p class="business-founder">创始人：${business.founder} · 成立于${business.founded}</p>
      <div class="business-model">
        <h4>商业模式</h4>
        <p>${business.model}</p>
      </div>
      <div class="business-tags">
        ${business.tags.map(tag => `<span class="business-tag">${tag}</span>`).join('')}
      </div>
    </div>
  `).join('')

  return `
    <div class="page hidden" id="business-page">
      <section class="hero">
        <h1>盈利商业模式</h1>
        <p>精选已经实现盈利的一人公司，深度解析他们的商业模式和成功之道</p>
        <div class="update-time">
          <span class="live-dot"></span>
          <span>每周更新 · 已收录 ${businessData.length} 个案例</span>
        </div>
      </section>
      
      <section class="business-section">
        <h2 class="section-title">
          <span class="icon">💰</span>
          成功案例
        </h2>
        <div class="business-grid">
          ${businessCards}
        </div>
      </section>
    </div>
  `
}

function renderFooter() {
  return `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-logo">OPC Daily</div>
        <p>专注一人公司资讯，助力独立创业</p>
        <p>每日 08:00 更新 · 邮件订阅即将开放</p>
      </div>
    </footer>
  `
}

async function initApp() {
  await fetchData()
  
  const app = document.querySelector('#app')
  
  app.innerHTML = `
    ${renderHeader()}
    <main class="main">
      ${renderNewsPage()}
      ${renderBusinessPage()}
    </main>
    ${renderFooter()}
  `

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const page = e.target.dataset.page
      
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'))
      e.target.classList.add('active')
      
      document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'))
      document.getElementById(`${page}-page`).classList.remove('hidden')
      
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  })
}

initApp()
