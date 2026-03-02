// 爬虫脚本 - 抓取一人公司相关新闻
const fs = require('fs');
const path = require('path');

// 模拟新闻数据源（实际项目中可接入真实 API）
const newsSources = [
  {
    name: "行业趋势",
    titles: [
      "2026年最赚钱的10个一人公司赛道",
      "一人公司崛起：为什么越来越多人选择单干",
      "AI赋能：一人公司的下一个黄金时代",
      "2026年独立开发者收入报告发布"
    ]
  },
  {
    name: "成功案例",
    titles: [
      "从副业到月入10万：95后设计师的独立之路",
      "独立开发者月入$50K的真实故事",
      "一人公司如何做到年入百万",
      "从0到1：一人公司创业成功案例分享"
    ]
  },
  {
    name: "AI与创业",
    titles: [
      "AI时代，一人公司如何保持竞争力",
      "用AI工具提升10倍效率的方法",
      "一人公司必备的AI工具清单",
      "AI如何改变一人公司的运营模式"
    ]
  },
  {
    name: "产品变现",
    titles: [
      "Notion模板创作者月入$50K的秘密",
      "如何通过数字产品实现被动收入",
      "一人公司产品定价策略解析",
      "从免费到付费：产品变现之路"
    ]
  }
];

const businessCases = [
  {
    name: "Copy.ai",
    founder: "Paul Yacoubian",
    revenue: "$10M+/年",
    model: "AI写作工具，通过SaaS订阅模式盈利。为营销人员提供AI驱动的文案生成服务。",
    tags: ["AI工具", "SaaS", "订阅制"],
    founded: "2020"
  },
  {
    name: "Gumroad",
    founder: "Sahil Lavingia",
    revenue: "$100M+ GMV/年",
    model: "数字产品销售平台，收取交易佣金。创作者可以销售电子书、课程、软件等产品。",
    tags: ["创作者经济", "平台", "交易佣金"],
    founded: "2011"
  },
  {
    name: "Nomad List",
    founder: "Pieter Levels",
    revenue: "$3M+/年",
    model: "数字游民社区，通过会员订阅和广告盈利。提供城市数据、社区论坛和远程工作机会。",
    tags: ["社区", "数据服务", "会员制"],
    founded: "2014"
  }
];

function generateNews() {
  const today = new Date();
  const dateStr = today.toISOString().split('T')[0];
  
  const gradients = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)"
  ];
  
  const news = [];
  let id = 1;
  
  // 每天随机生成6条新闻
  for (let i = 0; i < 6; i++) {
    const source = newsSources[i % newsSources.length];
    const titleIndex = (today.getDate() + i) % source.titles.length;
    
    news.push({
      id: id++,
      title: source.titles[titleIndex],
      excerpt: generateExcerpt(source.name),
      tag: source.name,
      date: dateStr,
      readTime: `${Math.floor(Math.random() * 8) + 3}分钟`,
      image: gradients[i % gradients.length]
    });
  }
  
  return news;
}

function generateExcerpt(tag) {
  const excerpts = {
    "行业趋势": "深入分析一人公司行业发展趋势，探索最具潜力的创业方向和盈利模式。",
    "成功案例": "真实的一人公司成功故事，揭示背后的创业策略和运营方法。",
    "AI与创业": "探讨AI技术如何赋能一人公司，提升效率和竞争力。",
    "产品变现": "解析数字产品的变现策略，帮助一人公司实现可持续收入。",
    "工具推荐": "精选一人公司必备工具，提升工作效率和产品质量。",
    "职场转型": "分享从职场人士到独立创业者的转型经验和心得。"
  };
  return excerpts[tag] || "一人公司创业相关内容。";
}

function updateData() {
  const today = new Date();
  const timeStr = today.toISOString().replace('T', ' ').substring(0, 19);
  
  // 更新新闻数据
  const newsData = {
    lastUpdate: timeStr,
    news: generateNews()
  };
  
  // 更新商业模式数据
  const businessData = {
    lastUpdate: timeStr,
    business: businessCases
  };
  
  // 确保目录存在
  const dataDir = path.join(__dirname, 'public', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  // 写入文件
  fs.writeFileSync(
    path.join(dataDir, 'news.json'),
    JSON.stringify(newsData, null, 2),
    'utf-8'
  );
  
  fs.writeFileSync(
    path.join(dataDir, 'business.json'),
    JSON.stringify(businessData, null, 2),
    'utf-8'
  );
  
  console.log(`数据更新完成: ${timeStr}`);
}

// 执行更新
updateData();