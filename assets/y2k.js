(function () {
  "use strict";

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  if (window.location.hash) {
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }
  window.scrollTo(0, 0);

  let lang = "en";
  let profileBlurbTypewriter = null;
  let profileInfoToggle = null;
  let abroadStoryTypewriter = null;
  let refreshAbroadDeckMeta = null;

  const LANG = {
    zh: {
      "nav.hero": "关于我",
      "nav.hub": "目录",
      "nav.projects": "项目",
      "nav.content": "自媒体",
      "nav.internship": "实习",
      "nav.student": "学生工作",
      "nav.contact": "联系",
      "lang.switchLabel": "EN",
      "lang.switchAria": "切换为英文",
      "social.douyinAria": "抖音",
      "hero.name": "Welcome to 511's World",
      "hero.polaroidCaption": "王玥莹 · 511",
      "hero.school": "大连理工大学",
      "hero.party": "预备党员",
      "hero.searchLabel": "搜索",
      "hero.searchPlaceholder": "搜索技能、经历、项目…",
      "section.profile": "个人简介",
      "profile.lead": "大连理工大学 · 产品与增长探索 · 预备党员",
      "profile.name": "王玥莹",
      "profile.party": "预备党员",
      "profile.school": "大连理工大学",
      "profile.blurb": "热爱把想法做成可触摸的体验，也在校园与实习里持续记录成长。",
      "profile.zoomHint": "点击照片放大",
      "profile.winTitle": "个人档案",
      "profile.winStatus": "已同步",
      "profile.imgViewer": "生活相册",
      "profile.folderLabel": "王玥莹的文件夹",
      "profile.photoFolderLabel": "王玥莹的照片",
      "profile.minimizeAria": "缩小简介",
      "profile.maximizeAria": "放大内容",
      "profile.closeAria": "关闭简介",
      "profile.closeRestoreAria": "恢复简介",
      "profile.restoreInfoAria": "打开简介文件夹",
      "profile.restorePhotoAria": "打开照片文件夹",
      "profile.lightboxAlt": "王玥莹生活照",
      "label.party": "政治面貌",
      "label.school": "学校",
      "label.email": "邮箱",
      "label.phone": "电话",
      "section.content": "校园自媒体",
      "section.projects": "学术项目经历",
      "projects.lead": "从材料研发到系统落地 —— 四段跨学科探索",
      "projects.viewGridAria": "方框视图",
      "projects.viewTimelineAria": "长条视图",
      "projects.viewDetails": "查看详情",
      "projects.closeAria": "关闭项目详情",
      "projects.techLabel": "技术栈",
      "projects.mainContentLabel": "主要项目内容",
      "projects.contribLabel": "核心贡献",
      "findMore": "探索更多 →",
      "back": "← 返回",
      "section.internship": "实习经历",
      "section.student": "学生工作",
      "content.lead": "独立运营微博与小红书，用内容连接校园生活",
      "intern.lead": "去哪儿网 · 用户增长运营",
      "intern.panelTitle": "去哪儿网 | 用户增长运营实习生",
      "intern.role": "核心运营成员 | 2025.07 - 2025.08",
      "intern.period": "2025.07 - 2025.08",
      "intern.coverEn": "Qunar.com Internship",
      "intern.coverZh": "实习经历",
      "intern.openHint": "点击展开 →",
      "intern.close": "收起",
      "intern.dutiesLabel": "核心职责",
      "intern.statsLabel": "核心成果",
      "intern.summary":
        "用数据丈量增长，用内容连接用户。在去哪儿网的实习中，我完成了从「执行者」到「方法论构建者」的蜕变。",
      "intern.stamp": "Qunar Growth Team 官方认证",
      "student.hint": "点击手牌，了解我在校园里的角色与故事",
      "student.duties": "核心职责",
      "student.results": "量化成果",
      "student.video": "观看舞蹈视频",
      "partner.nav": "CONTACT",
      "partner.title": "期待能和你成为伙伴",
      "partner.sub": "欢迎合作、交流，或只是打个招呼。",
      "partner.name": "WANG YUEYING",
      "partner.tag": "511'S WORLD",
      "partner.messageBtn": "写留言 ✎",
      "partner.messageTitle": "给我留句话",
      "partner.formHint": "留言会发到我的邮箱，我会用邮件回复你。",
      "partner.formName": "称呼",
      "partner.formEmail": "你的邮箱",
      "partner.formMessage": "留言",
      "partner.formSubmit": "发送留言",
      "partner.formSending": "发送中…",
      "partner.formSuccess": "收到啦！我会尽快用邮件回复你 ✉",
      "partner.formError": "发送失败，请稍后再试或直接发邮件给我。",
      "partner.beach": "找不到我就是在海滩偷薯条~",
      "contact.emailLabel": "邮箱",
      "contact.phoneLabel": "电话",
      "contact.copyEmailAria": "复制邮箱地址",
      "contact.emailCopied": "已复制邮箱",
      "house.label": "发现更多我",
      "house.platforms": "微博 · 小红书 · 抖音",
      "house.douyin": "抖音",
      "house.welcome": "欢迎来我的自媒体小窝 ✨",
      "shop.heading": "我的小店实践",
      "shop.brand": "511's Shop",
      "shop.navCatalog": "商品",
      "shop.navCart": "购物车",
      "shop.navFav": "收藏",
      "shop.catalogTitle": "小店好物",
      "shop.backAria": "返回商品列表",
      "shop.cartTitle": "购物车",
      "shop.favTitle": "我的收藏",
      "shop.cartEmpty": "购物车还是空的，去挑几件喜欢的吧",
      "shop.favEmpty": "还没有收藏，点击 ♡ 加入收藏夹",
      "shop.addCart": "加入购物车",
      "shop.addFav": "加入收藏",
      "shop.productName": "晞然的定制",
      "shop.prevAria": "上一页",
      "shop.nextAria": "下一页",
      "footer.copy": "© 2026 王玥莹 · 511's World",
      "like.aria": "点赞",
      "dir.menuTitle": "511 // TRACKLIST",
      "dir.lcd": "▶ 就绪",
      "music.trackTitle": "ATTENTION",
      "music.lcdPlay": "PLAY",
      "music.lcdStop": "STOP",
      "music.playAria": "播放音乐",
      "music.pauseAria": "暂停音乐",
      "dir.about.slug": "个人简介",
      "dir.about.credit": "PRODUCED BY | 大连理工・产品与增长探索",
      "dir.about.module": "个人简介",
      "dir.projects.slug": "学术项目",
      "dir.projects.credit": "PRODUCED BY | 材料・硬件・算法全链路",
      "dir.projects.module": "学术项目",
      "dir.intern.slug": "实习经历",
      "dir.intern.credit": "PRODUCED BY | 用户增长・内容・数据",
      "dir.intern.module": "实习经历",
      "dir.student.slug": "学生工作",
      "dir.student.credit": "PRODUCED BY | 团委・科创・文艺骨干",
      "dir.student.module": "学生工作",
      "dir.content.slug": "内容创作",
      "dir.content.credit": "PRODUCED BY | 微博・小红书・爆款内容",
      "dir.content.module": "内容创作",
      "section.abroad": "国际交流",
      "abroad.lead": "昆士兰科技大学 · 工程学术交流 · 2026.01",
      "abroad.navEyebrow": "— 交流纪事",
      "abroad.navQut": "QUT",
      "abroad.navEng": "工程学术交流",
      "abroad.navDate": "2026.01",
      "abroad.sideBadge": "拓宽国际视野",
      "abroad.deckTitle": "QUT EXCHANGE",
      "abroad.deckDate": "2026.01",
      "abroad.deckCount": "{n} 张影像",
      "abroad.deckNextAria": "下一张影像",
      "abroad.deckHint": "点击箭头切换 · 点击卡片放大",
      "abroad.storyTitle": "PROJECT",
      "abroad.storyLead": "2026年1月，赴昆士兰科技大学开展工程学术交流。从课堂讨论到实验室协作，完成系统化的问题拆解、英文汇报与跨文化团队合作训练。",
      "abroad.timeLabel": "时间",
      "abroad.timeValue": "2026.01.01 – 2026.01.31",
      "abroad.fieldLabel": "领域",
      "abroad.fieldValue": "Engineering",
      "abroad.statusLabel": "状态",
      "abroad.statusValue": "✅ 已完成",
      "abroad.stamp": "QUT Faculty of Engineering 官方认证",
      "abroad.gainsTitle": "能力收获",
      "abroad.gain1": "✅ 系统化问题拆解与数据分析",
      "abroad.gain2": "✅ 英语学术写作与口头汇报",
      "abroad.gain3": "✅ 跨文化团队协作",
      "abroad.gain4": "✅ 国际前沿工程研究范式",
      "abroad.photoAlt": "昆士兰科技大学交流影像",
      "section.skills": "个人能力",
      "capabilities.footer": "学习一直在路上，探索永无止境...",
    },
    en: {
      "nav.hero": "About",
      "nav.hub": "Menu",
      "nav.projects": "Projects",
      "nav.content": "Content",
      "nav.internship": "Internship",
      "nav.student": "Leadership",
      "nav.contact": "Contact",
      "lang.switchLabel": "中文",
      "lang.switchAria": "Switch to Chinese",
      "social.douyinAria": "Douyin",
      "hero.name": "Welcome to 511's World",
      "hero.polaroidCaption": "Yueying · 511",
      "hero.school": "Dalian University of Technology",
      "hero.party": "Probationary Party Member",
      "hero.searchLabel": "Search",
      "hero.searchPlaceholder": "Search skills, experience, projects…",
      "section.profile": "About Me",
      "profile.lead": "Dalian University of Technology · Product & Growth · Party Member (Probationary)",
      "profile.name": "Wang Yueying",
      "profile.party": "Probationary Party Member",
      "profile.school": "Dalian University of Technology",
      "profile.blurb":
        "Passionate about turning ideas into tangible experiences and documenting growth on campus and at work.",
      "profile.zoomHint": "Click photo to enlarge",
      "profile.winTitle": "Profile Notes",
      "profile.winStatus": "Synced",
      "profile.imgViewer": "Life Album",
      "profile.folderLabel": "Yueying's Folder",
      "profile.photoFolderLabel": "Yueying's Photos",
      "profile.minimizeAria": "Minimize profile",
      "profile.maximizeAria": "Enlarge content",
      "profile.closeAria": "Close profile",
      "profile.closeRestoreAria": "Restore profile",
      "profile.restoreInfoAria": "Open profile folder",
      "profile.restorePhotoAria": "Open photo folder",
      "profile.lightboxAlt": "Life photo",
      "label.party": "Political Status",
      "label.school": "University",
      "label.email": "Email",
      "label.phone": "Phone",
      "section.content": "Campus Media",
      "section.projects": "Academic Projects",
      "projects.lead": "From material R&D to systems — four cross-disciplinary explorations",
      "projects.viewGridAria": "Square view",
      "projects.viewTimelineAria": "Strip view",
      "projects.viewDetails": "View details",
      "projects.closeAria": "Close project details",
      "projects.techLabel": "Tech stack",
      "projects.mainContentLabel": "Main Project Content",
      "projects.contribLabel": "Core contribution",
      "findMore": "Find More →",
      "back": "← Back",
      "section.internship": "Internship",
      "section.student": "Student Work",
      "content.lead": "Operating Weibo & Xiaohongshu to connect campus life through content",
      "intern.lead": "Qunar.com · User Growth Operations",
      "intern.panelTitle": "Qunar.com | User Growth Operations Intern",
      "intern.role": "Core Operations Member · Jul 2025 - Aug 2025",
      "intern.period": "Jul 2025 - Aug 2025",
      "intern.coverEn": "Qunar.com Internship",
      "intern.coverZh": "Internship",
      "intern.openHint": "Click to open →",
      "intern.close": "Close",
      "intern.dutiesLabel": "Core Responsibilities",
      "intern.statsLabel": "Key Results",
      "intern.summary":
        "Measuring growth with data and connecting users through content. At Qunar, I evolved from executor to methodology builder.",
      "intern.stamp": "Qunar Growth Team Certified",
      "student.hint": "Click a card to explore my campus leadership roles",
      "student.duties": "Core Responsibilities",
      "student.results": "Key Results",
      "student.video": "Watch Dance Video",
      "partner.nav": "CONTACT",
      "partner.title": "Hope to partner with you",
      "partner.sub": "Open to collaboration, conversation, or just saying hi.",
      "partner.name": "WANG YUEYING",
      "partner.tag": "511'S WORLD",
      "partner.messageBtn": "Leave a note ✎",
      "partner.messageTitle": "Say hello",
      "partner.formHint": "Your note goes to my inbox — I'll reply by email.",
      "partner.formName": "Name",
      "partner.formEmail": "Your email",
      "partner.formMessage": "Message",
      "partner.formSubmit": "Send message",
      "partner.formSending": "Sending…",
      "partner.formSuccess": "Got it! I'll reply by email soon ✉",
      "partner.formError": "Couldn't send — try again or email me directly.",
      "partner.beach": "Can't find me? I'm stealing fries on the beach~",
      "contact.emailLabel": "Email",
      "contact.phoneLabel": "Phone",
      "contact.copyEmailAria": "Copy email address",
      "contact.emailCopied": "Email copied",
      "house.label": "Discover more",
      "house.platforms": "Weibo · Xiaohongshu · Douyin",
      "house.douyin": "Douyin",
      "house.welcome": "Welcome to my media cozy home ✨",
      "shop.heading": "My Shop Practice",
      "shop.brand": "511's Shop",
      "shop.navCatalog": "Shop",
      "shop.navCart": "Cart",
      "shop.navFav": "Saved",
      "shop.catalogTitle": "Picks",
      "shop.backAria": "Back to shop",
      "shop.cartTitle": "Shopping Cart",
      "shop.favTitle": "Favorites",
      "shop.cartEmpty": "Your cart is empty — pick something you like",
      "shop.favEmpty": "No favorites yet — tap ♡ to save items",
      "shop.addCart": "Add to cart",
      "shop.addFav": "Add to favorites",
      "shop.productName": "Xiran's Custom",
      "shop.prevAria": "Previous page",
      "shop.nextAria": "Next page",
      "footer.copy": "© 2026 Wang Yueying · 511's World",
      "like.aria": "Like",
      "dir.menuTitle": "511 // TRACKLIST",
      "dir.lcd": "▶ READY",
      "music.trackTitle": "ATTENTION",
      "music.lcdPlay": "PLAY",
      "music.lcdStop": "STOP",
      "music.playAria": "Play music",
      "music.pauseAria": "Pause music",
      "dir.about.slug": "about me",
      "dir.about.credit": "PRODUCED BY | DUT · Product & Growth",
      "dir.about.module": "About",
      "dir.projects.slug": "iron guard & labs",
      "dir.projects.credit": "PRODUCED BY | Materials · Hardware · Algorithms",
      "dir.projects.module": "Projects",
      "dir.intern.slug": "qunar growth",
      "dir.intern.credit": "PRODUCED BY | User Growth · Content · Data",
      "dir.intern.module": "Internship",
      "dir.student.slug": "campus roles",
      "dir.student.credit": "PRODUCED BY | Youth League · Sci-Tech · Arts",
      "dir.student.module": "Leadership",
      "dir.content.slug": "511 universe",
      "dir.content.credit": "PRODUCED BY | Weibo · Xiaohongshu · Viral Hits",
      "dir.content.module": "Content",
      "section.abroad": "International Exchange",
      "abroad.lead": "QUT · Engineering Exchange · Jan 2026",
      "abroad.navEyebrow": "— EXCHANGE",
      "abroad.navQut": "QUT",
      "abroad.navEng": "Engineering",
      "abroad.navDate": "JAN 2026",
      "abroad.sideBadge": "Broaden Global Horizons",
      "abroad.deckTitle": "QUT EXCHANGE",
      "abroad.deckDate": "JAN 2026",
      "abroad.deckCount": "{n} PHOTOS",
      "abroad.deckNextAria": "Next photo",
      "abroad.deckHint": "Arrow to cycle · Click card to enlarge",
      "abroad.storyTitle": "PROJECT",
      "abroad.storyLead": "In January 2026, I joined an engineering exchange at QUT—from seminars to lab teamwork, building skills in structured analysis, academic English, and cross-cultural collaboration.",
      "abroad.timeLabel": "Period",
      "abroad.timeValue": "2026.01.01 – 2026.01.31",
      "abroad.fieldLabel": "Field",
      "abroad.fieldValue": "Engineering",
      "abroad.statusLabel": "Status",
      "abroad.statusValue": "✅ Completed",
      "abroad.stamp": "QUT Faculty of Engineering Certified",
      "abroad.gainsTitle": "Key Takeaways",
      "abroad.gain1": "✅ Structured problem-solving & data analysis",
      "abroad.gain2": "✅ Academic writing & oral presentation in English",
      "abroad.gain3": "✅ Cross-cultural teamwork",
      "abroad.gain4": "✅ International engineering research paradigms",
      "abroad.photoAlt": "QUT exchange photo",
      "section.skills": "Personal Skills",
      "capabilities.footer": "Still learning, still exploring...",
    },
  };

  const HERO_ROLES = {
    zh: ["产品经理", "数据探索者", "跨专业探索家", "自媒体博主", "商业化实践者"],
    en: [
      "Product Manager",
      "Data Explorer",
      "Multi-field Explorer",
      "Content Creator",
      "Growth Practitioner",
    ],
  };

  const HERO_SEARCH = [
    { t: { zh: "个人简介", en: "About Me" }, h: "#profile", k: "大连理工 预备党员 王玥莹" },
    { t: { zh: "产品经理", en: "Product Manager" }, h: "#hero", k: "product pm 产品" },
    { t: { zh: "数据探索者", en: "Data Explorer" }, h: "#hero", k: "data 数据 分析" },
    { t: { zh: "跨专业探索家", en: "Cross-Disciplinary" }, h: "#hero", k: "跨学科 材料 算法" },
    { t: { zh: "自媒体博主", en: "Content Creator" }, h: "#content", k: "微博 小红书 内容" },
    { t: { zh: "商业化实践者", en: "Commercialization" }, h: "#internship", k: "增长 运营 商业" },
    { t: { zh: "学术项目", en: "Academic Projects" }, h: "#projects", k: "项目 科研 SCI" },
    { t: { zh: "铁卫·电池哨兵", en: "Battery Sentry" }, h: "#projects", k: "电池 硬件 材料" },
    { t: { zh: "船舶振动预警", en: "Ship Vibration" }, h: "#projects", k: "算法 预警 Nastran" },
    { t: { zh: "去哪儿网实习", en: "Qunar Internship" }, h: "#internship", k: "实习 增长 用户运营" },
    { t: { zh: "学生工作", en: "Student Leadership" }, h: "#student", k: "团委 科创 文艺" },
    { t: { zh: "校园自媒体", en: "Campus Media" }, h: "#content", k: "自媒体 内容 运营" },
    { t: { zh: "联系合作", en: "Contact" }, h: "#contact", k: "邮箱 电话 合作" },
    { t: { zh: "CAD · Origin · Patran", en: "CAD · Origin · Patran" }, h: "#projects", k: "技能 工具" },
    { t: { zh: "用户增长运营", en: "User Growth Ops" }, h: "#internship", k: "增长 数据 A/B" },
  ];

  const TYPE_BRIDGE_BLOCKS = [
    { text: "511", x: 8, y: 12, rx: 62, ry: -18, rz: 8, skew: 6, scale: 1.4 },
    { text: "@", x: 72, y: 8, rx: -40, ry: 24, rz: -12, skew: -8, scale: 2.2 },
    { text: "2026", x: 18, y: 38, rx: 28, ry: 12, rz: -6, skew: 4, scale: 0.9 },
    { text: "NEW", x: 55, y: 28, rx: -55, ry: -8, rz: 14, skew: 10, scale: 1.1 },
    { text: "†", x: 88, y: 22, rx: 70, ry: 30, rz: -20, skew: 0, scale: 1.8 },
    { text: "Y2K", x: 42, y: 52, rx: -25, ry: 45, rz: 6, skew: -12, scale: 1.25 },
    { text: "¶", x: 78, y: 48, rx: 48, ry: -22, rz: -10, skew: 5, scale: 1.5 },
    { text: "TRACK", x: 5, y: 62, rx: 35, ry: -35, rz: 12, skew: 8, scale: 0.85 },
    { text: "∞", x: 62, y: 68, rx: -65, ry: 18, rz: -8, skew: -6, scale: 1.6 },
    { text: "MENU", x: 32, y: 78, rx: 20, ry: 55, rz: -14, skew: -10, scale: 0.95 },
    { text: "01", x: 92, y: 58, rx: -30, ry: -40, rz: 18, skew: 4, scale: 0.75 },
    { text: "WORLD", x: 48, y: 88, rx: 55, ry: -12, rz: 4, skew: 14, scale: 1.05 },
  ];

  const INTERN_DUTIES = {
    zh: [
      {
        body: "负责平台<strong>用户拉新与存量激活</strong>全链路运营，通过用户行为<strong>数据分析定位转化漏斗</strong>断点，主导<strong>投流</strong>内容与用户<strong>触达策略</strong>的<strong>优化迭代</strong>",
        compact: true,
      },
      {
        body: "独立负责<strong>平台内容创作与账号运营</strong>，通过内容标签优化、投放策略调整<strong>提升内容传播</strong>效果，同时沉淀核心垂类用户社群",
      },
      {
        body: "搭建用户增长<strong>标准化 SOP 体系</strong>，设计可复用的运营模板，参与构建公司内部知识<strong>资料库</strong>，沉淀可复制的运营<strong>方法论</strong>",
      },
    ],
    en: [
      {
        body: "Owned full-funnel <strong>acquisition and reactivation</strong>—used behavioral data to <strong>pinpoint conversion funnel</strong> drop-offs, led <strong>paid media</strong> and user <strong>outreach</strong> <strong>iteration</strong>.",
        compact: true,
      },
      {
        body: "Independently ran <strong>content creation and account operations</strong>—optimized tags and ads to <strong>boost content reach</strong> while building a core vertical community.",
      },
      {
        body: "Built a <strong>standardized growth SOP</strong>, reusable templates, an internal <strong>knowledge base</strong>, and replicable growth <strong>methodology</strong>.",
      },
    ],
  };

  const INTERN_STATS = {
    zh: [
      {
        text: '单人累计实现平台新客增长 <span class="intern-vintage">2000+</span>，推动核心用户转化率提升 <span class="intern-vintage">5</span> 个百分点',
      },
      {
        text: '打造 <span class="intern-vintage">2</span> 篇阅读量破万的爆款内容，内容整体曝光量较基准值提升 <span class="intern-vintage">20%</span>，带动账号 <span class="intern-vintage">2</span> 个月累计涨粉 <span class="intern-vintage">500+</span>',
      },
      {
        text: '输出 <span class="intern-vintage">12</span> 套可复用的运营模板，建立了用户增长标准化工作流程，为团队高效协作提供了支撑',
      },
    ],
    en: [
      {
        text: 'Drove <span class="intern-vintage">2000+</span> new users solo and lifted core conversion rate by <span class="intern-vintage">5</span> percentage points.',
      },
      {
        text: 'Published <span class="intern-vintage">2</span> posts exceeding 10k reads; overall exposure rose <span class="intern-vintage">20%</span> vs. baseline, adding <span class="intern-vintage">500+</span> followers in two months.',
      },
      {
        text: 'Delivered <span class="intern-vintage">12</span> reusable ops templates and a standardized growth workflow that supported efficient team collaboration.',
      },
    ],
  };

  const INTERN_TAGS = {
    zh: ["用户增长", "内容运营", "数据分析", "流程标准化"],
    en: ["User Growth", "Content Ops", "Data Analysis", "Standardization"],
  };
  const TAG_ROTATIONS = [-1.5, 1, -0.5, 1.5];

  const SKILL_TAG_FX = {
    sql: { fx: "pixel", emoji: "📊", hint: { zh: "查询与整理，数据井井有条", en: "Queries & tidy datasets" } },
    c: { fx: "wiggle", emoji: "{ }", hint: { zh: "指针与循环，基本功扎实", en: "Pointers, loops & solid basics" } },
    vibe: { fx: "sparkle", emoji: "✨", hint: { zh: "和 AI 结对，灵感秒落地", en: "AI pair-coding, ideas ship fast" } },
    cpp: { fx: "pop", emoji: "⚡", hint: { zh: "底层逻辑，稳准狠", en: "Low-level logic, precise & fast" } },
    excel: { fx: "grid", emoji: "📈", hint: { zh: "函数透视，表格变仪表盘", en: "Formulas & pivots to dashboards" } },
    word: { fx: "float", emoji: "📝", hint: { zh: "排版润色，文档有温度", en: "Layout polish with warmth" } },
    ppt: { fx: "pop", emoji: "🎯", hint: { zh: "一帧一故事，汇报有张力", en: "Slides that tell a story" } },
    xmind: { fx: "branch", emoji: "🌿", hint: { zh: "导图发散，思路有枝杈", en: "Mind maps that branch ideas" } },
    cad: { fx: "blueprint", emoji: "📐", hint: { zh: "二维制图，尺寸零误差", en: "2D drafting, exact dimensions" } },
    proe: { fx: "rotate", emoji: "⚙", hint: { zh: "三维建模，零件能装配", en: "3D parts that fit together" } },
    inventor: { fx: "gear", emoji: "🔧", hint: { zh: "参数化设计，改型很快", en: "Parametric design, quick iterations" } },
    comsol: { fx: "wave", emoji: "〰", hint: { zh: "仿真场域，先看再实验", en: "Simulate first, lab second" } },
    patran: { fx: "mesh", emoji: "🔩", hint: { zh: "有限元分析，结构说得清", en: "FEA that explains structure" } },
    image2: { fx: "flash", emoji: "🎨", hint: { zh: "文生图灵感库", en: "Text-to-image inspiration" } },
    chatgpt: { fx: "type", emoji: "💬", hint: { zh: "提示词搭档，文案加速器", en: "Prompt partner for copy" } },
    jianying: { fx: "cut", emoji: "✂", hint: { zh: "剪映时间轴，节奏感拉满", en: "CapCut timelines with rhythm" } },
    gaoding: { fx: "stamp", emoji: "🏷", hint: { zh: "模板出图，效率翻倍", en: "Templates that double output" } },
    jimeng: { fx: "dream", emoji: "☁", hint: { zh: "即梦画风，脑洞可视化", en: "Dream-style visuals from ideas" } },
    canva: { fx: "slide", emoji: "🖼", hint: { zh: "Canva 拼图，社交物料快", en: "Quick social-ready graphics" } },
    xiumi: { fx: "layout", emoji: "📰", hint: { zh: "秀米排版，公众号好看", en: "WeChat layouts that pop" } },
  };

  const CAPABILITY_COLUMNS = {
    zh: [
      {
        title: "数据与编程",
        emoji: "⌨",
        tags: [
          { id: "sql", label: "SQL" },
          { id: "c", label: "C Programming" },
          { id: "vibe", label: "vibe coding" },
          { id: "cpp", label: "C/C++" },
        ],
      },
      {
        title: "办公效率",
        emoji: "📎",
        tags: [
          { id: "excel", label: "Excel" },
          { id: "word", label: "Word" },
          { id: "ppt", label: "PowerPoint" },
          { id: "xmind", label: "Xmind" },
        ],
      },
      {
        title: "工科设计",
        emoji: "⚙",
        tags: [
          { id: "cad", label: "CAD" },
          { id: "proe", label: "ProE" },
          { id: "inventor", label: "Inventor" },
          { id: "comsol", label: "Comsol" },
          { id: "patran", label: "Patran" },
        ],
      },
      {
        title: "内容创作",
        emoji: "✎",
        tags: [
          { id: "image2", label: "image2" },
          { id: "chatgpt", label: "ChatGPT" },
          { id: "jianying", label: "剪映" },
          { id: "gaoding", label: "稿定设计" },
          { id: "jimeng", label: "即梦" },
          { id: "canva", label: "Canva" },
          { id: "xiumi", label: "秀米" },
        ],
      },
    ],
    en: [
      {
        title: "Data & Programming",
        emoji: "⌨",
        tags: [
          { id: "sql", label: "SQL" },
          { id: "c", label: "C Programming" },
          { id: "vibe", label: "vibe coding" },
          { id: "cpp", label: "C/C++" },
        ],
      },
      {
        title: "Office",
        emoji: "📎",
        tags: [
          { id: "excel", label: "Excel" },
          { id: "word", label: "Word" },
          { id: "ppt", label: "PowerPoint" },
          { id: "xmind", label: "Xmind" },
        ],
      },
      {
        title: "Engineering",
        emoji: "⚙",
        tags: [
          { id: "cad", label: "CAD" },
          { id: "proe", label: "ProE" },
          { id: "inventor", label: "Inventor" },
          { id: "comsol", label: "Comsol" },
          { id: "patran", label: "Patran" },
        ],
      },
      {
        title: "Content Studio",
        emoji: "✎",
        tags: [
          { id: "image2", label: "image2" },
          { id: "chatgpt", label: "ChatGPT" },
          { id: "jianying", label: "CapCut" },
          { id: "gaoding", label: "Gaoding" },
          { id: "jimeng", label: "Jimeng" },
          { id: "canva", label: "Canva" },
          { id: "xiumi", label: "Xiumi" },
        ],
      },
    ],
  };

  const CONTENT_STATS = {
    zh: {
      title: "校园垂类自媒体博主",
      time: "2020.01 - 2026.05",
      rows: [
        { icon: "👥", label: "双平台累计粉丝", value: "5000+", width: "85%" },
        { icon: "💬", label: "微博转评赞总量", value: "3.2万", width: "70%" },
        { icon: "▶", label: "视频累计播放量", value: "10.8万", width: "90%" },
        { icon: "🔥", label: "爆款内容数量", value: "20+篇", width: "60%" },
        { icon: "📈", label: "笔记观看月均增长率", value: "30%", width: "30%" },
      ],
      summary:
        "独立运营微博、小红书双平台校园账号，从0到1搭建内容体系，用数据驱动内容优化，打造多个校园爆款，沉淀了完整的自媒体运营方法论。",
    },
    en: {
      title: "Campus Vertical Media Creator",
      time: "2020.01 - 2026.05",
      rows: [
        { icon: "👥", label: "Dual-Platform Followers", value: "5000+", width: "85%" },
        { icon: "💬", label: "Weibo Engagement", value: "32k", width: "70%" },
        { icon: "▶", label: "Total Video Views", value: "108k", width: "90%" },
        { icon: "🔥", label: "Viral Posts", value: "20+", width: "60%" },
        { icon: "📈", label: "Monthly View Growth", value: "30%", width: "30%" },
      ],
      summary:
        "Independently operated campus accounts on Weibo and Xiaohongshu, built content systems from scratch, drove optimization with data, and created multiple viral hits.",
    },
  };

  const XHS = [
    { img: "15/26C73A6477A8C7416BA8277ADEEC52F2.png", title: "在春天用这句文案拥抱花海🌸", link: "http://xhslink.com/o/5sssBRHO4t4", likes: 1204 },
    { img: "15/B8AE40FF7688B81F411836040318EDBA.png", title: "这句话也太适合在澳洲发了📝", link: "http://xhslink.com/o/1wt2JOgHGWN", likes: 3402 },
    { img: "15/5984A8BDE05B049FBC4DC3ED3AEFA7A0.png", title: "一篇教你学习笔记到底该怎么记！！", link: "http://xhslink.com/o/3gfQ9BXZXt", likes: 5821 },
    { img: "15/B46C919EB805B513AF5D2B56181A5518.png", title: "期末月的大学生战力为1000000%", link: "http://xhslink.com/o/6SYjHc6aB8C", likes: 2190 },
    { img: "15/8B088124AAF140B2F57EDA71BF57A901.png", title: "🩶：人生是偶然啊…", link: "http://xhslink.com/o/8z8rE9vd3jo", likes: 984 },
    { img: "15/E95DE9C5250C89E07F04621A664918BA.png", title: "不要去环球因为真的很幸福", link: "http://xhslink.com/o/4VKxONTTD3F", likes: 4510 },
  ];

  const STUDENTS = [
    {
      title: { zh: "团委副书记", en: "Deputy Secretary of Youth League" },
      img: "7/6.jpg",
      theme: 0,
      video: null,
      zh: {
        time: "2025.09 - 至今",
        duties: [
          "统筹全院团学工作，分管科创部与办公室两大核心部门",
          "策划组织「思维拓园」「责任培养」等思想引领系列活动",
          "负责跨部门协作与资源调配，保障团学体系高效运转",
        ],
        results: [
          "组织各类主题活动 20+ 场，覆盖全院 80% 以上学生",
          "统筹完成 60+ 项行政事务（学时登记 / 报销 / 物资管理）",
          "推动建立团学工作标准化流程，提升部门协作效率 30%",
        ],
        summary: "以服务为初心，搭建连接学院与学生的桥梁，让团学工作更有温度、更具力量。",
      },
      en: {
        time: "Sep 2025 - Present",
        duties: [
          "Coordinated college-wide youth league work, overseeing Sci-Tech Innovation and Office departments",
          "Planned ideological leadership events such as Mind Expansion Garden and Responsibility Cultivation",
          "Managed cross-department collaboration and resource allocation",
        ],
        results: [
          "Organized 20+ themed events covering over 80% of college students",
          "Coordinated 60+ administrative tasks",
          "Established standardized workflows, improving collaboration efficiency by 30%",
        ],
        summary:
          "With service as our aspiration, we build a bridge between the college and students, making youth league work warmer and stronger.",
      },
    },
    {
      title: { zh: "学院科创部部长", en: "Minister of Sci-Tech Innovation" },
      img: "8/7.jpg",
      theme: 1,
      video: null,
      zh: {
        time: "2024.09 - 2025.09",
        duties: [
          "搭建学院科创服务体系，打通从入门到参赛的全链路",
          "策划组织科创讲座、经验分享会与各类学科竞赛",
          "主编《莱院科创手册》，为零基础学生提供一站式指导",
        ],
        results: [
          "举办 14 场 DLI EXPLORE 科创讲座，累计参与 600+ 人次",
          "组织攀登杯报名 350+ 人次，3 支队伍晋级主校区路展",
          "承办全国大学生数模竞赛等 3 场校级赛事，收集作品 80+ 份",
        ],
        summary: "打破科创信息壁垒，让每一个有想法的同学都能找到科研的入口。",
      },
      en: {
        time: "Sep 2024 - Sep 2025",
        duties: [
          "Built the college sci-tech innovation service system from beginner to competition",
          "Planned lectures, sharing sessions, and academic competitions",
          "Chief-edited the Sci-Tech Innovation Handbook for beginners",
        ],
        results: [
          "Hosted 14 DLI EXPLORE lectures with 600+ participants",
          "Organized 350+ Climbing Cup registrations; 3 teams advanced to main campus",
          "Hosted 3 university-level contests with 80+ submissions",
        ],
        summary: "Breaking down innovation barriers so every inspired student can find their research entry point.",
      },
    },
    {
      title: { zh: "校区多媒体工作部副部长", en: "Deputy Minister of Campus Multimedia" },
      img: "9/8.jpg",
      theme: 2,
      video: null,
      zh: {
        time: "2023.09 - 2024.09",
        duties: [
          "负责校区所有大型活动的摄影摄像与视觉素材产出",
          "管理部门器材库与 500G+ 校园影像素材档案",
          "带教 10 名新成员，建立标准化拍摄与后期流程",
        ],
        results: [
          "完成校运会、军训、青春歌会等 20+ 场大型活动拍摄",
          "产出高质量照片 5000+ 张，视频素材 100+ 小时",
          "为学院官网、公众号提供 90% 以上的官方视觉内容",
        ],
        summary: "用镜头定格每一个闪光瞬间，让校园记忆有迹可循。",
      },
      en: {
        time: "Sep 2023 - Sep 2024",
        duties: [
          "Handled photography and videography for all major campus events",
          "Managed equipment and a 500GB+ visual archive",
          "Mentored 10 new members and standardized shooting/editing workflows",
        ],
        results: [
          "Covered 20+ major events including sports meet, military training, and concerts",
          "Produced 5,000+ photos and 100+ hours of video",
          "Provided 90%+ of official visuals for college website and WeChat",
        ],
        summary: "Capturing every shining moment through the lens, preserving campus memories.",
      },
    },
    {
      title: { zh: "零舞街舞协会爵士舞副队长", en: "Jazz Vice Captain, Zero Dance Association" },
      img: "10/ea9a8d9103d1853c4b59cbb92cddcc89.png",
      theme: 3,
      video: "https://v.douyin.com/AEVV8dvETBw",
      zh: {
        time: "2025.09 - 至今",
        duties: [
          "负责爵士舞日常教学与团队排练，制定学期训练计划",
          "策划组织协会年度专场演出，统筹节目编排与舞台设计",
          "代表协会参与校园各类文艺活动，推广街舞文化",
        ],
        results: [
          "累计参与迎新晚会、莱院晚会等 12 场大型校园演出",
          "带领团队完成 2 次协会专场演出，观众累计 500+ 人",
          "教授学员 30+ 人，培养出多名能独立登台的舞者",
        ],
        summary: "用舞蹈表达自我，用热爱感染他人，让更多人感受到街舞的魅力。",
      },
      en: {
        time: "Sep 2025 - Present",
        duties: [
          "Led jazz daily teaching and team rehearsals with semester training plans",
          "Planned annual showcase performances and stage design",
          "Represented the association at campus cultural events",
        ],
        results: [
          "Performed in 12 major campus events",
          "Led 2 association showcases with 500+ total audience",
          "Taught 30+ students, mentoring several to perform independently",
        ],
        summary: "Expressing myself through dance and inspiring others with passion for street dance.",
      },
    },
    {
      title: { zh: "24级班导生、团建辅导员", en: "Class Advisor & Team-building Counselor" },
      img: "11/9.jpg",
      theme: 4,
      video: null,
      zh: {
        time: "2024.08 - 至今",
        duties: [
          "全程陪伴新生入学过渡，解答学业与生活中的各类疑问",
          "指导班级团建与学风建设，帮助建立班级凝聚力",
          "配合辅导员开展思想教育与日常管理工作",
        ],
        results: [
          "帮助 36 名新生顺利完成从高中到大学的角色转变",
          "组织开展破冰、中秋晚会等 10+ 次班级团建活动",
          "建立班级学习互助小组，班级平均成绩位列年级前 30%",
        ],
        summary: "做学弟学妹大学路上的第一盏灯，照亮他们前行的方向。",
      },
      en: {
        time: "Aug 2024 - Present",
        duties: [
          "Accompanied freshmen through enrollment transition and daily Q&A",
          "Guided class team-building and study culture",
          "Supported counselors with ideological education and daily management",
        ],
        results: [
          "Helped 36 freshmen transition from high school to university",
          "Organized 10+ team events including ice-breaking and Mid-Autumn gala",
          "Built peer study groups; class average ranks top 30% in grade",
        ],
        summary: "Being the first lamp on their university path, lighting the way forward.",
      },
    },
    {
      title: { zh: "班级学习委员", en: "Class Study Commissioner" },
      img: "12/10.jpg",
      theme: 5,
      video: null,
      zh: {
        time: "2023.09 - 至今",
        duties: [
          "负责班级日常学习管理，对接任课老师传达教学信息",
          "组织学习互助活动，帮助学习困难的同学提升成绩",
          "收集整理学习资料，建立班级共享资源库",
        ],
        results: [
          "班级连续两年获评校级「优良学风班」「先进班集体」",
          "成功入围 2025 年度校「优良学风标兵班」评选",
          "组织 MIT 网课学习、四六级单词打卡等活动，班级四级通过率 100%，六级通过率 92%",
        ],
        summary: "以学风建设为抓手，和同学们一起在求知的路上并肩前行。",
      },
      en: {
        time: "Sep 2023 - Present",
        duties: [
          "Managed daily class academics and communicated with instructors",
          "Organized peer tutoring to support struggling classmates",
          "Collected materials and built a shared class resource library",
        ],
        results: [
          "Class awarded Excellent Study Style and Advanced Collective for two years",
          "Shortlisted for 2025 Excellent Study Style Model Class",
          "Organized MIT courses and CET drills; CET-4 pass rate 100%, CET-6 92%",
        ],
        summary: "Focusing on study culture, walking alongside classmates on the path of knowledge.",
      },
    },
  ];

  const FAN_ANGLES = [-34, -20, -7, 7, 20, 34];
  const MEMBER_LOGO = `<img src="1BAD5B55F8E174CF247C787C73512956.png" alt="" />`;

  function t(key) {
    return LANG[lang][key] || key;
  }

  function applyI18n(options = {}) {
    const preserveScroll = options.preserveScroll === true;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const k = el.getAttribute("data-i18n");
      if (el.hasAttribute("data-i18n-typewriter")) return;
      if (LANG[lang][k]) el.textContent = LANG[lang][k];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const k = el.getAttribute("data-i18n-placeholder");
      if (LANG[lang][k]) el.setAttribute("placeholder", LANG[lang][k]);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const k = el.getAttribute("data-i18n-aria");
      if (LANG[lang][k]) el.setAttribute("aria-label", LANG[lang][k]);
    });
    const langLabel = document.getElementById("lang-label");
    if (langLabel) langLabel.textContent = t("lang.switchLabel");
    const langBtn = document.getElementById("lang-btn");
    if (langBtn) langBtn.setAttribute("aria-label", t("lang.switchAria"));
    const internClose = document.getElementById("intern-close");
    if (internClose) internClose.setAttribute("aria-label", t("intern.close"));
    const pxMusic = document.getElementById("px-music");
    const pxPlay = document.getElementById("px-music-play");
    const pxCover = document.getElementById("px-music-cover-btn");
    const pxLcd = document.getElementById("px-music-lcd-tag");
    const pxTrack = document.getElementById("px-music-track-label");
    if (pxTrack) pxTrack.textContent = t("music.trackTitle");
    if (pxLcd && pxMusic) {
      pxLcd.textContent = pxMusic.classList.contains("is-playing") ? t("music.lcdPlay") : t("music.lcdStop");
    }
    if (pxPlay) {
      pxPlay.setAttribute(
        "aria-label",
        pxMusic?.classList.contains("is-playing") ? t("music.pauseAria") : t("music.playAria")
      );
    }
    if (pxCover) {
      pxCover.setAttribute(
        "aria-label",
        pxMusic?.classList.contains("is-playing") ? t("music.pauseAria") : t("music.playAria")
      );
    }

    renderHeroRoles();
    renderContentStats();
    renderInternSection();
    renderCapabilitySection();
    resetInternSummaryWrite();
    tryStartInternSummaryWrite();
    renderNavDirectoryList();
    renderProjects();
    if (projectModalOpen) renderProjectModal();
    buildMemberFan();
    renderMemberLabels();
    if (document.getElementById("shop-screen-body")) renderShop();
    document.getElementById("abroad-hero-img")?.setAttribute("alt", t("abroad.photoAlt"));
    document.getElementById("abroad-side-img")?.setAttribute("alt", t("abroad.photoAlt"));
    document.querySelectorAll(".abroad-deck-card img").forEach((img) => {
      img.alt = t("abroad.photoAlt");
    });
    refreshAbroadDeckMeta?.();
    profileBlurbTypewriter?.onLangChange();
    profileInfoToggle?.onLangChange();
    abroadStoryTypewriter?.onLangChange();

    if (preserveScroll) {
      const restore = () => {
        window.scrollTo(scrollX, scrollY);
      };
      requestAnimationFrame(() => requestAnimationFrame(restore));
    }
  }

  document.getElementById("lang-btn")?.addEventListener("click", () => {
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    lang = lang === "zh" ? "en" : "zh";
    applyI18n({ preserveScroll: true });
    buildPhoneFeed();
    requestAnimationFrame(() => window.scrollTo(scrollX, scrollY));
  });

  function renderHeroRoles() {
    const track = document.getElementById("hero-role-track");
    if (!track) return;
    const roles = HERO_ROLES[lang];
    const items = roles.map((r) => `<span class="hero-role-item">${r}</span>`).join("");
    track.innerHTML = items + items;
    track.style.setProperty("--role-count", String(roles.length));
    track.style.animationDuration = `${roles.length * 2.8}s`;
  }

  function initHeroScrollSearch() {
    const wrap = document.getElementById("hero-scroll-search");
    const input = document.getElementById("hero-search-input");
    const results = document.getElementById("hero-search-results");
    if (!wrap || !input || !results) return;

    const matchItem = (item, q) => {
      const label = item.t[lang].toLowerCase();
      const zh = item.t.zh.toLowerCase();
      const en = item.t.en.toLowerCase();
      const keys = (item.k || "").toLowerCase();
      return label.includes(q) || zh.includes(q) || en.includes(q) || keys.includes(q);
    };

    const renderResults = () => {
      const q = input.value.trim().toLowerCase();
      if (!q) {
        results.innerHTML = "";
        results.classList.remove("has-items");
        wrap.classList.remove("has-results");
        return;
      }
      const hits = HERO_SEARCH.filter((item) => matchItem(item, q));
      results.innerHTML = hits
        .map(
          (item) =>
            `<a href="${item.h}" class="scroll-search-hit" role="option">${item.t[lang]}</a>`
        )
        .join("");
      results.classList.toggle("has-items", hits.length > 0);
      wrap.classList.toggle("has-results", hits.length > 0);
    };

    input.addEventListener("input", renderResults);
  }

  function buildTypeBridge() {
    const stage = document.getElementById("hero-type-stage");
    if (!stage || stage.childElementCount) return;
    TYPE_BRIDGE_BLOCKS.forEach((b, i) => {
      const el = document.createElement("span");
      el.className = "type-block";
      el.textContent = b.text;
      el.style.left = `${b.x}%`;
      el.style.top = `${b.y}%`;
      el.style.setProperty("--rx", `${b.rx}deg`);
      el.style.setProperty("--ry", `${b.ry}deg`);
      el.style.setProperty("--rz", `${b.rz}deg`);
      el.style.setProperty("--skew", `${b.skew}deg`);
      el.style.setProperty("--scale", String(b.scale));
      el.style.setProperty("--float-d", `${(i % 5) * 0.7}s`);
      stage.appendChild(el);
    });
  }

  function renderContentStats() {
    const el = document.getElementById("content-stats");
    if (!el) return;
    const s = CONTENT_STATS[lang];
    const sectionInView = document.getElementById("content")?.classList.contains("is-inview");
    el.innerHTML = `
      <header class="content-stats-card__head">
        <span class="content-stats-card__avatar" aria-hidden="true">511</span>
        <div class="content-stats-card__intro">
          <h3 class="content-stats-card__heading">${s.title}</h3>
          <p class="content-stats-time">${s.time}</p>
        </div>
      </header>
      <div class="content-stats-card__body">
        ${s.rows
          .map(
            (r, i) => `
        <div class="stat-row">
          <div class="stat-row-head">
            <span class="stat-row-icon" aria-hidden="true">${r.icon}</span>
            <span class="stat-row-label">${r.label}</span>
            <strong class="stat-row-value">${r.value}</strong>
          </div>
          <div class="stat-bar">
            <span class="stat-bar__fill${sectionInView ? " is-filled" : ""}" style="--bar-w:${r.width};--bar-delay:${(i * 0.12).toFixed(2)}s"></span>
          </div>
        </div>`
          )
          .join("")}
        <p class="content-summary">${s.summary}</p>
      </div>`;
  }

  function renderCapabilitySection() {
    const grid = document.getElementById("capability-todo-grid");
    if (!grid) return;
    grid.innerHTML = CAPABILITY_COLUMNS[lang]
      .map(
        (col, ci) => `
      <article class="skill-stack-col" style="--col-i:${ci}">
        <h3 class="skill-stack-col__title">
          <span class="skill-stack-col__emoji" aria-hidden="true">${col.emoji}</span>
          ${col.title}
        </h3>
        <ul class="skill-stack-tags">
          ${col.tags
            .map((tag, ti) => {
              const meta = SKILL_TAG_FX[tag.id] || { fx: "pop", emoji: "·", hint: { zh: "", en: "" } };
              const hint = meta.hint[lang] || "";
              return `<li class="skill-tag skill-fx--${meta.fx}" data-skill="${tag.id}" style="--tag-i:${ti}">
                <span class="skill-tag__burst" aria-hidden="true">${meta.emoji}</span>
                <span class="skill-tag__label">${tag.label}</span>
                ${hint ? `<span class="skill-tag__tip">${hint}</span>` : ""}
              </li>`;
            })
            .join("")}
        </ul>
      </article>`
      )
      .join("");
  }

  function renderInternSection() {
    const dutiesEl = document.getElementById("intern-duties");
    if (dutiesEl) {
      dutiesEl.innerHTML = INTERN_DUTIES[lang]
        .map(
          (d) => `<div class="intern-block">
        <p class="intern-copy${d.compact ? " intern-copy--sm" : ""}">${d.body}</p>
      </div>`
        )
        .join("");
    }

    const statsList = document.getElementById("intern-stats");
    if (statsList) {
      statsList.innerHTML = INTERN_STATS[lang]
        .map(
          (s) => `<li class="intern-stat-item">
        <p class="intern-copy intern-copy--stat">${s.text}</p>
      </li>`
        )
        .join("");
    }

    const tagsEl = document.getElementById("intern-tags");
    if (tagsEl) {
      tagsEl.innerHTML = INTERN_TAGS[lang]
        .map((tag, i) => `<span class="intern-tag" style="--rot:${TAG_ROTATIONS[i]}deg"># ${tag}</span>`)
        .join("");
    }
  }

  // —— Hero reCAPTCHA ——
  const robotCheck = document.getElementById("robot-check");
  const btnVerify = document.getElementById("btn-verify");
  const polaroidSlot = document.getElementById("polaroid-slot");
  const heroPolaroids = document.getElementById("hero-polaroids");
  const recaptchaCard = document.getElementById("recaptcha-card");
  const recaptchaViewer = document.getElementById("recaptcha-viewer");
  const recaptchaViewerImg = document.getElementById("recaptcha-viewer-img");
  const recaptchaViewerBack = document.getElementById("recaptcha-viewer-back");
  const flashOverlay = document.getElementById("flash-overlay");

  function openRecaptchaViewer(src) {
    if (!recaptchaViewer || !recaptchaViewerImg || !src) return;
    recaptchaViewerImg.src = src;
    recaptchaViewer.hidden = false;
    recaptchaCard?.classList.add("is-viewing");
  }

  function closeRecaptchaViewer() {
    recaptchaCard?.classList.remove("is-viewing");
    if (recaptchaViewer) recaptchaViewer.hidden = true;
  }

  function onPolaroidActivate(pp) {
    if (!heroPolaroids?.classList.contains("fan-out") || !pp?.src) return;
    openRecaptchaViewer(pp.src);
  }

  heroPolaroids?.addEventListener("click", (e) => {
    const pp = e.target.closest(".pp");
    if (pp) onPolaroidActivate(pp);
  });
  heroPolaroids?.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const pp = e.target.closest(".pp");
    if (!pp) return;
    e.preventDefault();
    onPolaroidActivate(pp);
  });
  recaptchaViewerBack?.addEventListener("click", closeRecaptchaViewer);

  function updateVerifyBtn() {
    if (btnVerify) btnVerify.disabled = !robotCheck?.checked;
  }
  robotCheck?.addEventListener("change", updateVerifyBtn);
  updateVerifyBtn();

  btnVerify?.addEventListener("click", () => {
    if (!robotCheck?.checked || polaroidSlot?.classList.contains("has-photo")) return;
    flashOverlay?.classList.add("active");
    setTimeout(() => flashOverlay?.classList.remove("active"), 120);
    polaroidSlot?.classList.add("has-photo");
    heroPolaroids?.setAttribute("aria-hidden", "false");
    requestAnimationFrame(() => {
      heroPolaroids?.classList.add("is-revealed");
      heroPolaroids?.classList.add("fan-out");
    });
    btnVerify.disabled = true;
    setTimeout(showHeroDirectory, 650);
  });

  const COLLAGE_ITEMS = [
    /* y = 长卷纵向位置；左右错落、可略靠近内容区（z 轴仍在正文下方） */
    /* —— Hero —— */
    { src: "element/diamond.png", y: 0.06, right: "2%", w: "min(56px, 10vw)", rot: 19 },
    /* —— Profile：左–右–左 错落 —— */
    { src: "element/card.png", y: 0.182, left: "11%", w: "min(178px, 30vw)", rot: -14 },
    { src: "element/slices/3a4dc7c1_4.png", y: 0.228, right: "9%", w: "min(148px, 25vw)", rot: 11 },
    { src: "element/slices/3a4dc7c1_1.png", y: 0.268, left: "6%", w: "min(118px, 20vw)", rot: -9 },
    /* —— Projects —— */
    { src: "element/slices/0ba9a553_2.png", y: 0.338, right: "12%", w: "min(188px, 32vw)", rot: -5 },
    { src: "element/slices/d5ee22c1_3.png", y: 0.372, left: "8%", w: "min(220px, 36vw)", rot: -8 },
    { src: "element/slices/3a4dc7c1_10.png", y: 0.418, right: "7%", w: "min(136px, 23vw)", rot: 4 },
    { src: "element/slices/0ba9a553_8.png", y: 0.452, left: "14%", w: "min(54px, 9vw)", rot: -17 },
    /* —— Content —— */
    { src: "element/slices/dbe77b1c_5.png", y: 0.508, right: "10%", w: "min(142px, 24vw)", rot: -11 },
    { src: "element/slices/3a4dc7c1_7.png", y: 0.542, left: "13%", w: "min(98px, 17vw)", rot: 6 },
    { src: "element/slices/3a4dc7c1_12.png", y: 0.578, right: "15%", w: "min(50px, 8.5vw)", rot: -22 },
    /* —— Internship —— */
    { src: "element/slices/d5ee22c1_1.png", y: 0.652, left: "9%", w: "min(198px, 32vw)", rot: 5 },
    { src: "element/slices/dbe77b1c_2.png", y: 0.698, right: "8%", w: "min(168px, 28vw)", rot: -6 },
    /* —— Student / Skills —— */
    { src: "element/slices/0ba9a553_3.png", y: 0.772, right: "13%", w: "min(76px, 13vw)", rot: 10 },
    { src: "element/slices/0ba9a553_5.png", y: 0.812, left: "7%", w: "min(72px, 12vw)", rot: 12 },
    /* —— Contact —— */
    { src: "element/slices/dbe77b1c_8.png", y: 0.878, right: "11%", w: "min(96px, 16vw)", rot: 16 },
    { src: "element/narrow.png", y: 0.918, left: "12%", w: "min(62px, 11vw)", rot: -26, opacity: 0.85 },
  ];

  let collageResizeObserver;

  function syncCollageScrollTrack() {
    const track = document.getElementById("collage-scroll-track");
    const mainEl = document.querySelector("main");
    const host = document.querySelector(".collage-floats");
    if (!track || !mainEl) return;

    const top = mainEl.offsetTop;
    const height = Math.max(mainEl.offsetHeight, mainEl.scrollHeight, 1);
    track.style.top = `${top}px`;
    track.style.height = `${height}px`;

    if (host) {
      host.querySelectorAll(".collage-sticker").forEach((img, i) => {
        const item = COLLAGE_ITEMS[i];
        if (item?.y != null) {
          img.style.top = `${(item.y * height).toFixed(1)}px`;
        }
      });
    }
  }

  function initCollageFloats() {
    const host = document.querySelector(".collage-floats");
    if (!host) return;
    host.replaceChildren();
    COLLAGE_ITEMS.forEach((item, i) => {
      const img = document.createElement("img");
      img.className = "collage-sticker";
      img.src = item.src;
      img.alt = "";
      img.loading = "lazy";
      img.style.width = item.w;
      if (item.left) {
        img.style.left = item.left;
        img.style.right = "auto";
      }
      if (item.right) {
        img.style.right = item.right;
        img.style.left = "auto";
      }
      if (item.opacity != null) img.style.opacity = String(item.opacity);
      const rot = item.rot || 0;
      const scale = item.scale || 1;
      img.dataset.rot = String(rot);
      img.dataset.scale = String(scale);
      img.style.setProperty("--float-dur", `${4.2 + (i % 6) * 0.65}s`);
      img.style.setProperty("--float-d", `${((i * 0.47) % 3.2).toFixed(2)}s`);
      img.style.transform = `rotate(${rot}deg) scale(${scale})`;
      host.appendChild(img);
    });

    bindCollageStickers();

    syncCollageScrollTrack();
    const mainEl = document.querySelector("main");
    if (mainEl && typeof ResizeObserver !== "undefined") {
      collageResizeObserver?.disconnect();
      collageResizeObserver = new ResizeObserver(() => syncCollageScrollTrack());
      collageResizeObserver.observe(mainEl);
    }
    window.addEventListener("resize", syncCollageScrollTrack, { passive: true });
    window.addEventListener("load", () => {
      syncCollageScrollTrack();
      requestAnimationFrame(syncCollageScrollTrack);
      setTimeout(syncCollageScrollTrack, 400);
      setTimeout(syncCollageScrollTrack, 1200);
    }, { passive: true });
    requestAnimationFrame(syncCollageScrollTrack);
  }

  const stickerBases = new Map();
  function bindCollageStickers() {
    stickerBases.clear();
    document.querySelectorAll(".collage-sticker").forEach((el) => {
      const rot = +el.dataset.rot || 0;
      const scale = +el.dataset.scale || 1;
      const base = `rotate(${rot}deg) scale(${scale})`;
      stickerBases.set(el, base);
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.animationPlayState = "paused";
        el.style.transform = `perspective(500px) rotate(${rot}deg) rotateY(${x * 16}deg) rotateX(${-y * 12}deg) scale(1.06)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.animationPlayState = "";
        el.style.transform = stickerBases.get(el) || "";
      });
      el.addEventListener("mousedown", () => {
        el.style.transform = `rotate(${rot}deg) scale(${scale * 0.94})`;
      });
      el.addEventListener("mouseup", () => {
        el.style.transform = stickerBases.get(el) || "";
      });
    });
  }

  // —— Phone feed ——
  function triggerHeartBurst() {
    const burst = document.getElementById("phone-burst");
    if (!burst) return;
    burst.innerHTML = "";
    const heart = document.createElement("div");
    heart.className = "phone-burst-heart";
    heart.textContent = "♥";
    burst.appendChild(heart);
    [[-55, -40], [52, -36], [-45, 10], [48, 14], [-30, 46], [34, 42]].forEach(([bx, by], i) => {
      const star = document.createElement("span");
      star.className = "phone-burst-star";
      star.textContent = i % 2 ? "★" : "✦";
      star.style.setProperty("--bx", `${bx}px`);
      star.style.setProperty("--by", `${by}px`);
      burst.appendChild(star);
    });
    burst.classList.remove("active");
    void burst.offsetWidth;
    burst.classList.add("active");
    setTimeout(() => {
      burst.classList.remove("active");
      burst.innerHTML = "";
    }, 550);
  }

  function buildPhoneFeed() {
    const phoneFeed = document.getElementById("phone-feed");
    if (!phoneFeed) return;
    phoneFeed.innerHTML = "";
    const masonry = document.createElement("div");
    masonry.className = "phone-masonry";

    XHS.forEach((post) => {
      const a = document.createElement("a");
      a.className = "phone-post";
      a.href = post.link;
      a.target = "_blank";
      a.rel = "noopener";
      a.innerHTML = `
        <div class="phone-post-cover">
          <img src="${post.img}" alt="" loading="lazy" onerror="this.src='15/5984A8BDE05B049FBC4DC3ED3AEFA7A0.png'" />
        </div>
        <div class="phone-post-body">
          <h4>${post.title}</h4>
          <div class="phone-post-footer">
            <button type="button" class="like-btn" data-n="${post.likes}" aria-label="${t("like.aria")}">
              <span class="like-heart">♡</span>
              <span class="like-count">${post.likes}</span>
            </button>
          </div>
        </div>`;
      a.querySelector(".like-btn")?.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const btn = e.currentTarget;
        const liked = btn.classList.toggle("liked");
        const heart = btn.querySelector(".like-heart");
        const countEl = btn.querySelector(".like-count");
        let n = +btn.dataset.n + (liked ? 1 : -1);
        btn.dataset.n = n;
        if (heart) heart.textContent = liked ? "♥" : "♡";
        if (countEl) countEl.textContent = String(n);
        if (liked) triggerHeartBurst();
      });
      masonry.appendChild(a);
    });
    phoneFeed.appendChild(masonry);
  }

  // —— Media house ——
  const mediaHouse = document.getElementById("media-house");
  if (mediaHouse) {
    const toggleMediaHouse = () => {
      const open = mediaHouse.classList.toggle("expanded");
      mediaHouse.setAttribute("aria-expanded", open ? "true" : "false");
    };
    mediaHouse.addEventListener("click", (e) => {
      if (e.target.closest("a")) return;
      toggleMediaHouse();
    });
    mediaHouse.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleMediaHouse();
      }
    });
  }

  const SHOP_PRODUCTS = [
    { id: "w0", img: "writing/37ACB24D6B2283982D4C0C5A56A74767.png" },
    { id: "w1", img: "writing/4ADEAD9F4BF6F2ADEB58410D4C45460E.png" },
    { id: "w2", img: "writing/6135F298B28FC345597F1292B434AE41.png" },
    { id: "w3", img: "writing/70858DFAB7571FFB5E0CCCC7AEDE384E.png" },
    { id: "w4", img: "writing/833CB45F7C899020D583096183648C11.png" },
    { id: "w5", img: "writing/A69DD48FBA0B312962B32A49ECB57C73.png" },
    { id: "w6", img: "writing/B8665B3EFCF56E6765585B9644CCB261.png" },
    { id: "w7", img: "writing/C26FC0FBE29AFCCF8B95BD232AA18BC3.png" },
    { id: "w8", img: "writing/DCA324B7E3D85B7F7F1804ECAA9CE619.png" },
    { id: "w9", img: "writing/DFAAD1F730F1981F61F1E0E6A6D33EE0.png" },
    { id: "w10", img: "writing/E975017E7004764BA9BA05599C87C3E1.png" },
    { id: "w11", img: "writing/F7F5C099954407345FD1EC49F05F73AD.png" },
  ];
  const SHOP_PER_PAGE = 3;

  function shopProductName() {
    return t("shop.productName");
  }

  const shopState = {
    view: "catalog",
    page: 0,
    detailId: null,
    cart: [],
    fav: [],
  };

  function shopProductById(id) {
    return SHOP_PRODUCTS.find((p) => p.id === id);
  }

  function updateShopBadges() {
    const cartEl = document.getElementById("shop-cart-count");
    const favEl = document.getElementById("shop-fav-count");
    if (cartEl) {
      cartEl.textContent = String(shopState.cart.length);
      cartEl.dataset.count = String(shopState.cart.length);
    }
    if (favEl) {
      favEl.textContent = String(shopState.fav.length);
      favEl.dataset.count = String(shopState.fav.length);
    }
  }

  function setShopView(view, opts = {}) {
    shopState.view = view;
    if (opts.detailId != null) shopState.detailId = opts.detailId;
    if (view === "catalog") shopState.detailId = null;
    renderShop();
    const backBtn = document.getElementById("shop-back-btn");
    const nav = document.querySelector(".shop-screen__nav");
    const showBack = view === "detail";
    if (backBtn) backBtn.hidden = !showBack;
    if (nav) nav.hidden = showBack;
    document.querySelectorAll(".shop-nav-btn").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.shopView === view && view !== "detail");
    });
  }

  function toggleShopCart(id) {
    const i = shopState.cart.indexOf(id);
    if (i >= 0) shopState.cart.splice(i, 1);
    else shopState.cart.push(id);
    updateShopBadges();
    renderShop();
  }

  function toggleShopFav(id) {
    const i = shopState.fav.indexOf(id);
    if (i >= 0) shopState.fav.splice(i, 1);
    else shopState.fav.push(id);
    updateShopBadges();
    renderShop();
  }

  function renderShopCatalog(body) {
    const totalPages = Math.ceil(SHOP_PRODUCTS.length / SHOP_PER_PAGE);
    const start = shopState.page * SHOP_PER_PAGE;
    const items = SHOP_PRODUCTS.slice(start, start + SHOP_PER_PAGE);
    const dots = Array.from({ length: totalPages }, (_, i) => i)
      .map(
        (i) =>
          `<button type="button" class="shop-catalog-dot${i === shopState.page ? " is-active" : ""}" data-shop-page="${i}" aria-label="Page ${i + 1}"></button>`
      )
      .join("");

    body.innerHTML = `
      <div class="shop-view shop-view--catalog">
        <h4 class="shop-catalog-title">${t("shop.catalogTitle")}</h4>
        <div class="shop-catalog-slider">
          <button type="button" class="shop-catalog-arrow shop-catalog-arrow--prev" data-shop-prev aria-label="${t("shop.prevAria")}"${shopState.page <= 0 ? " disabled" : ""}>‹</button>
          <div class="shop-catalog-track">
          ${items
            .map((p) => {
              const inCart = shopState.cart.includes(p.id);
              const inFav = shopState.fav.includes(p.id);
              return `<article class="shop-product-card" data-shop-open="${p.id}">
                <div class="shop-product-card__frame">
                  <img src="${p.img}" alt="${shopProductName()}" loading="lazy" decoding="async" />
                </div>
                <p class="shop-product-card__name">${shopProductName()}</p>
                <div class="shop-product-card__actions">
                  <button type="button" class="shop-product-action shop-product-action--cart${inCart ? " is-added" : ""}" data-shop-cart="${p.id}" aria-label="${t("shop.addCart")}">🛒</button>
                  <button type="button" class="shop-product-action shop-product-action--fav${inFav ? " is-added" : ""}" data-shop-fav="${p.id}" aria-label="${t("shop.addFav")}">♡</button>
                </div>
              </article>`;
            })
            .join("")}
          </div>
          <button type="button" class="shop-catalog-arrow shop-catalog-arrow--next" data-shop-next aria-label="${t("shop.nextAria")}"${shopState.page >= totalPages - 1 ? " disabled" : ""}>›</button>
        </div>
        <div class="shop-catalog-dots">${dots}</div>
      </div>`;
  }

  function renderShopDetail(body) {
    const p = shopProductById(shopState.detailId);
    if (!p) {
      setShopView("catalog");
      return;
    }
    const inCart = shopState.cart.includes(p.id);
    const inFav = shopState.fav.includes(p.id);
    body.innerHTML = `
      <div class="shop-view shop-view--detail">
        <div class="shop-detail">
          <div class="shop-detail__img-wrap">
            <img src="${p.img}" alt="${shopProductName()}" />
          </div>
          <p class="shop-detail__name">${shopProductName()}</p>
          <div class="shop-detail__actions">
            <button type="button" class="shop-product-action shop-product-action--cart${inCart ? " is-added" : ""}" data-shop-cart="${p.id}" aria-label="${t("shop.addCart")}">🛒</button>
            <button type="button" class="shop-product-action shop-product-action--fav${inFav ? " is-added" : ""}" data-shop-fav="${p.id}" aria-label="${t("shop.addFav")}">♡</button>
          </div>
        </div>
      </div>`;
  }

  function renderShopBasket(body, type) {
    const ids = type === "cart" ? shopState.cart : shopState.fav;
    const title = type === "cart" ? t("shop.cartTitle") : t("shop.favTitle");
    const empty = type === "cart" ? t("shop.cartEmpty") : t("shop.favEmpty");
    if (ids.length === 0) {
      body.innerHTML = `<div class="shop-view shop-view--${type}"><div class="shop-basket"><h4 class="shop-basket__title">${title}</h4><p class="shop-basket__empty">${empty}</p></div></div>`;
      return;
    }
    body.innerHTML = `
      <div class="shop-view shop-view--${type}">
        <div class="shop-basket">
          <h4 class="shop-basket__title">${title}</h4>
          <div class="shop-basket__grid">
            ${ids
              .map((id) => {
                const p = shopProductById(id);
                if (!p) return "";
                return `<figure class="shop-basket__item" data-shop-open="${p.id}">
                  <div class="shop-basket__item-frame">
                    <img src="${p.img}" alt="${shopProductName()}" loading="lazy" />
                  </div>
                  <span class="shop-basket__item-name">${shopProductName()}</span>
                </figure>`;
              })
              .join("")}
          </div>
        </div>
      </div>`;
  }

  function renderShop() {
    const body = document.getElementById("shop-screen-body");
    if (!body) return;
    if (shopState.view === "catalog") renderShopCatalog(body);
    else if (shopState.view === "detail") renderShopDetail(body);
    else if (shopState.view === "cart") renderShopBasket(body, "cart");
    else if (shopState.view === "fav") renderShopBasket(body, "fav");
    updateShopBadges();
  }

  function initShopComputer() {
    const body = document.getElementById("shop-screen-body");
    const stage = document.getElementById("shop-computer-stage");
    if (!body || !stage) return;

    document.getElementById("shop-back-btn")?.addEventListener("click", () => setShopView("catalog"));

    document.querySelectorAll(".shop-nav-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const v = btn.dataset.shopView;
        if (v) setShopView(v);
      });
    });

    body.addEventListener("click", (e) => {
      const cartBtn = e.target.closest("[data-shop-cart]");
      if (cartBtn) {
        e.stopPropagation();
        toggleShopCart(cartBtn.dataset.shopCart);
        return;
      }
      const favBtn = e.target.closest("[data-shop-fav]");
      if (favBtn) {
        e.stopPropagation();
        toggleShopFav(favBtn.dataset.shopFav);
        return;
      }
      const dot = e.target.closest("[data-shop-page]");
      if (dot) {
        shopState.page = +dot.dataset.shopPage;
        renderShop();
        return;
      }
      if (e.target.closest("[data-shop-prev]")) {
        if (shopState.page > 0) {
          shopState.page -= 1;
          renderShop();
        }
        return;
      }
      if (e.target.closest("[data-shop-next]")) {
        const totalPages = Math.ceil(SHOP_PRODUCTS.length / SHOP_PER_PAGE);
        if (shopState.page < totalPages - 1) {
          shopState.page += 1;
          renderShop();
        }
        return;
      }
      const open = e.target.closest("[data-shop-open]");
      if (open) {
        setShopView("detail", { detailId: open.dataset.shopOpen });
      }
    });

    renderShop();
  }

  function initAbroadSection() {
    const ABROAD_HERO = "13/ACDA6D7152642F621B91456D3233BD59.png";
    const ABROAD_PHOTOS = [
      "13/04D743E60F922DA7A91CA50B6C8D51D9.png",
      "13/313B81B2488A515D421EA6E249624697.png",
      "13/58E4334EB7ED76F838E2B258166683FA.png",
      "13/6AD8EB72E272BB175FCF6C81464BA313.png",
      "13/8EF558530B73A884167CAA76DFED36CE.png",
      "13/B1F2F4ED16ECD7378817FB9DFB8A3064.png",
      "13/C61B9D96D8832D6CA1AF8B3C618854B5.png",
    ];

    const heroImg = document.getElementById("abroad-hero-img");
    const sideImg = document.getElementById("abroad-side-img");
    const deck = document.getElementById("abroad-deck");
    const deckNext = document.getElementById("abroad-deck-next");
    const deckCount = document.getElementById("abroad-deck-count");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    if (!heroImg || !deck) return;

    const photos = ABROAD_PHOTOS;
    let stackOrder = photos.map((_, i) => i);
    let animating = false;

    const photoAlt = () => t("abroad.photoAlt");

    heroImg.src = ABROAD_HERO;
    heroImg.alt = photoAlt();
    if (sideImg) {
      sideImg.src = photos[0] || ABROAD_HERO;
      sideImg.alt = photoAlt();
    }

    const openAbroadLightbox = (src) => {
      if (!lightbox || !lightboxImg || !src) return;
      lightboxImg.src = src;
      lightboxImg.alt = photoAlt();
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };

    const updateDeckMeta = () => {
      if (!deckCount) return;
      deckCount.textContent = t("abroad.deckCount").replace("{n}", String(photos.length));
    };
    refreshAbroadDeckMeta = updateDeckMeta;
    updateDeckMeta();

    const renderDeck = () => {
      deck.innerHTML = "";
      const visible = Math.min(4, stackOrder.length);
      for (let stackPos = visible - 1; stackPos >= 0; stackPos -= 1) {
        const photoIdx = stackOrder[stackPos];
        const card = document.createElement("button");
        card.type = "button";
        card.className = "abroad-deck-card" + (stackPos === 0 ? " is-front" : "");
        card.style.setProperty("--stack", String(stackPos));
        const img = document.createElement("img");
        img.src = photos[photoIdx];
        img.alt = photoAlt();
        img.decoding = "async";
        card.appendChild(img);
        if (stackPos === 0) {
          card.addEventListener("click", () => openAbroadLightbox(photos[photoIdx]));
        }
        deck.appendChild(card);
      }
    };

    const advanceDeck = () => {
      if (animating || stackOrder.length < 2) return;
      const front = deck.querySelector(".abroad-deck-card");
      if (!front) return;
      animating = true;
      front.classList.add("is-leaving");
      front.addEventListener(
        "transitionend",
        () => {
          stackOrder.push(stackOrder.shift());
          renderDeck();
          animating = false;
        },
        { once: true }
      );
      window.setTimeout(() => {
        if (!animating) return;
        stackOrder.push(stackOrder.shift());
        renderDeck();
        animating = false;
      }, 500);
    };

    deckNext?.addEventListener("click", advanceDeck);
    renderDeck();
  }

  function initAbroadStoryTypewriter() {
    const lead = document.getElementById("abroad-story-lead");
    const section = document.getElementById("abroad");
    if (!lead || !section) return null;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer = null;
    let hasPlayed = false;

    function clearTimer() {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    }

    function finish(fullText) {
      lead.textContent = fullText;
      lead.classList.remove("is-typing");
      lead.removeAttribute("aria-busy");
    }

    function type(fullText) {
      clearTimer();
      if (reducedMotion) {
        finish(fullText);
        return;
      }
      lead.textContent = "";
      lead.classList.add("is-typing");
      lead.setAttribute("aria-busy", "true");

      const chars = [...fullText];
      let i = 0;

      const step = () => {
        if (i >= chars.length) {
          finish(fullText);
          return;
        }
        lead.textContent += chars[i];
        i += 1;
        const ch = chars[i - 1];
        let delay = 52;
        if (/[，。、；：！？…]/.test(ch)) delay = 140;
        else if (/[,.!?;:]/.test(ch)) delay = 110;
        else if (/\s/.test(ch)) delay = 34;
        timer = setTimeout(step, delay);
      };
      step();
    }

    function play() {
      hasPlayed = true;
      type(t("abroad.storyLead"));
    }

    lead.textContent = reducedMotion ? t("abroad.storyLead") : "";

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed) {
          play();
          io.disconnect();
        }
      },
      { threshold: 0.22, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(section);

    const rect = section.getBoundingClientRect();
    if (!hasPlayed && rect.top < window.innerHeight * 0.82 && rect.bottom > window.innerHeight * 0.12) {
      play();
      io.disconnect();
    }

    return {
      onLangChange() {
        if (!hasPlayed) return;
        play();
      },
    };
  }

  // —— Internship ——
  const internMenu = document.getElementById("intern-menu");
  const internCover = document.getElementById("intern-cover");
  const internClose = document.getElementById("intern-close");
  const internSpread = document.getElementById("intern-spread");
  const internSummaryEl = document.getElementById("intern-summary-hand");

  let internAnimLock = false;
  let internWriteGen = 0;
  let internWriteTimer = null;

  function resetInternSummaryWrite() {
    internWriteGen += 1;
    if (internWriteTimer) {
      clearTimeout(internWriteTimer);
      internWriteTimer = null;
    }
    if (!internSummaryEl) return;
    internSummaryEl.textContent = "";
    internSummaryEl.classList.remove("is-writing", "is-written");
  }

  function tryStartInternSummaryWrite() {
    const section = document.getElementById("internship");
    if (!internSummaryEl || !section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      internSummaryEl.textContent = t("intern.summary");
      internSummaryEl.classList.add("is-written");
      return;
    }
    if (!section.classList.contains("is-inview")) return;
    if (!internMenu?.classList.contains("is-open")) return;
    if (internSummaryEl.classList.contains("is-written")) return;

    const myGen = ++internWriteGen;
    const chars = [...t("intern.summary")];
    internSummaryEl.textContent = "";
    internSummaryEl.classList.add("is-writing");
    internSummaryEl.classList.remove("is-written");

    let i = 0;
    const step = () => {
      if (myGen !== internWriteGen) return;
      if (i >= chars.length) {
        internSummaryEl.classList.remove("is-writing");
        internSummaryEl.classList.add("is-written");
        internWriteTimer = null;
        return;
      }
      internSummaryEl.textContent += chars[i];
      i += 1;
      const ch = chars[i - 1];
      const pause =
        ch === "。" || ch === "，" || ch === "；" ? 150 : ch === "「" || ch === "」" ? 70 : 36 + Math.random() * 34;
      internWriteTimer = setTimeout(step, pause);
    };
    internWriteTimer = setTimeout(step, 260);
  }

  function initInternSummaryWrite() {
    const section = document.getElementById("internship");
    if (!section || !internSummaryEl) return;

    resetInternSummaryWrite();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          section.classList.add("is-inview");
          tryStartInternSummaryWrite();
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(section);

    if (section.classList.contains("is-inview")) tryStartInternSummaryWrite();
  }

  function setInternOpen(open) {
    if (!internMenu) return;
    if (open) {
      if (internAnimLock || internMenu.classList.contains("is-open")) return;
      internAnimLock = true;
      internMenu.classList.add("is-pulling");
      internCover?.setAttribute("aria-expanded", "true");
      window.setTimeout(() => {
        internMenu.classList.add("is-open");
        internMenu.classList.remove("is-pulling");
        internAnimLock = false;
        window.setTimeout(tryStartInternSummaryWrite, 140);
      }, 620);
      return;
    }
    internMenu.classList.remove("is-open", "is-pulling");
    internCover?.setAttribute("aria-expanded", "false");
    internAnimLock = false;
    resetInternSummaryWrite();
  }

  internCover?.addEventListener("click", () => setInternOpen(true));
  internClose?.addEventListener("click", (e) => {
    e.stopPropagation();
    setInternOpen(false);
  });
  internSpread?.addEventListener("click", (e) => {
    if (internMenu?.classList.contains("is-open") && e.target === internSpread) setInternOpen(false);
  });
  document.getElementById("intern-scene")?.addEventListener("click", (e) => {
    if (internMenu?.classList.contains("is-open") && !e.target.closest(".intern-menu")) setInternOpen(false);
  });

  // —— Student cards ——
  const fan = document.getElementById("member-fan");
  const labelsWrap = document.getElementById("member-labels");
  const modal = document.getElementById("student-modal");
  const modalCard = document.getElementById("modal-card");

  function closeStudentModal() {
    modal?.classList.remove("open");
    modal?.setAttribute("aria-hidden", "true");
    fan?.classList.remove("is-dimmed");
    fan?.querySelectorAll(".member-card").forEach((c) => c.classList.remove("is-active", "is-flipping"));
    document.body.style.overflow = "";
  }

  function openStudent(s, cardEl) {
    const d = s[lang];
    if (cardEl) {
      cardEl.classList.add("is-flipping", "is-active");
      fan?.classList.add("is-dimmed");
      fan?.querySelectorAll(".member-card").forEach((c) => {
        if (c !== cardEl) c.classList.remove("is-active");
      });
    }
    setTimeout(() => {
      cardEl?.classList.remove("is-flipping");
      if (!modalCard) return;
      const cardIdx = STUDENTS.indexOf(s) + 1;
      modalCard.innerHTML = `
        <button type="button" class="modal-close" aria-label="${t("intern.close")}">×</button>
        <div class="student-zine">
          <span class="zine-tape zine-tape--tl" aria-hidden="true"></span>
          <span class="zine-tape zine-tape--br" aria-hidden="true"></span>
          <header class="student-modal-head">
            <span class="student-modal-num">${String(cardIdx).padStart(2, "0")}</span>
            <div class="student-modal-head__text">
              <h3 class="student-modal-title">${s.title[lang]}</h3>
              <p class="student-modal-time">${d.time}</p>
            </div>
          </header>
          <div class="student-modal-layout">
            <figure class="student-modal-photo">
              <div class="photo-mat">
                <img src="${s.img}" alt="${s.title[lang]}" loading="lazy" decoding="async" />
              </div>
            </figure>
            <div class="student-modal-body">
              <div class="student-modal-block">
                <h4>${t("student.duties")}</h4>
                <ul>${d.duties.map((x) => `<li>${x}</li>`).join("")}</ul>
              </div>
              <div class="student-modal-block">
                <h4>${t("student.results")}</h4>
                <ul>${d.results.map((x) => `<li>${x}</li>`).join("")}</ul>
              </div>
              ${
                s.video
                  ? `<a href="${s.video}" target="_blank" rel="noopener" class="btn-student-video">${t("student.video")}</a>`
                  : ""
              }
              <p class="student-modal-summary">${d.summary}</p>
            </div>
          </div>
        </div>`;
      modalCard.querySelector(".modal-close")?.addEventListener("click", closeStudentModal);
      modal?.classList.add("open");
      modal?.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }, cardEl ? 420 : 0);
  }

  function buildMemberFan() {
    if (!fan) return;
    if (modal?.classList.contains("open")) closeStudentModal();
    fan.innerHTML = "";
    fan.classList.remove("is-dimmed", "is-dealt");
    STUDENTS.forEach((s, i) => {
      const card = document.createElement("div");
      card.className = "member-card";
      card.style.setProperty("--angle", `${FAN_ANGLES[i]}deg`);
      card.style.setProperty("--fan-i", String(i));
      card.style.setProperty("--float-delay", `${(i * 0.38).toFixed(2)}s`);
      card.style.setProperty("--float-dur", `${4.4 + (i % 3) * 0.55}s`);
      card.style.zIndex = String(i + 1);
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", s.title[lang]);
      card.innerHTML = `
        <div class="member-card-float">
          <div class="member-card-inner">
            <div class="member-card-face member-theme-${s.theme}">
              <span class="member-num">${String(i + 1).padStart(2, "0")}</span>
              <div class="member-logo">${MEMBER_LOGO}</div>
            </div>
          </div>
        </div>`;
      card.addEventListener("click", () => openStudent(s, card));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openStudent(s, card);
        }
      });
      fan.appendChild(card);
    });
    requestMemberFanDeal();
  }

  function requestMemberFanDeal() {
    if (!fan) return;
    const section = document.getElementById("student");
    if (!section) return;
    if (section.classList.contains("is-inview")) {
      fan.classList.add("is-dealt");
      return;
    }
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.88 && rect.bottom > 0) fan.classList.add("is-dealt");
  }

  let fanDealObserver = null;
  function initMemberFanFX() {
    const section = document.getElementById("student");
    if (!fan || !section) return;

    const deal = () => fan.classList.add("is-dealt");

    if (fanDealObserver) fanDealObserver.disconnect();
    fanDealObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        deal();
        fanDealObserver?.disconnect();
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" }
    );
    fanDealObserver.observe(section);

    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.88 && rect.bottom > 0) deal();
  }

  function renderMemberLabels() {
    if (!labelsWrap) return;
    labelsWrap.innerHTML = "";
    const labelTilts = [-3, 2, -2, 3, -1.5, 2.5];
    STUDENTS.forEach((s, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "torn-label";
      btn.textContent = s.title[lang];
      btn.style.transform = `rotate(${labelTilts[i]}deg)`;
      btn.addEventListener("click", () => {
        const card = fan?.querySelectorAll(".member-card")[i];
        openStudent(s, card);
      });
      btn.addEventListener("mouseenter", () => {
        fan?.querySelectorAll(".member-card")[i]?.classList.add("is-highlight");
      });
      btn.addEventListener("mouseleave", () => {
        fan?.querySelectorAll(".member-card")[i]?.classList.remove("is-highlight");
      });
      labelsWrap.appendChild(btn);
    });
  }

  modal?.addEventListener("click", (e) => {
    if (e.target === modal || e.target.closest(".modal-close")) closeStudentModal();
  });

  document.querySelector('[data-copy="email"]')?.addEventListener("click", () => {
    navigator.clipboard?.writeText("yueying511@outlook.com").then(() => {
      const btn = document.querySelector('[data-copy="email"]');
      if (!btn) return;
      const orig = btn.textContent;
      btn.textContent = LANG[lang]["contact.emailCopied"];
      setTimeout(() => {
        btn.textContent = orig;
      }, 1600);
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeStudentModal();
      setInternOpen(false);
      closeProjectModal();
    }
  });

  const NJ_TRACK_ICONS = ["◉", "★", "♫", "◆", "▶"];

  const NAV_DIRECTORY = [
    { hash: "#profile", slugKey: "dir.about.slug", creditKey: "dir.about.credit", moduleKey: "dir.about.module", rot: -4 },
    { hash: "#projects", slugKey: "dir.projects.slug", creditKey: "dir.projects.credit", moduleKey: "dir.projects.module", rot: 3 },
    { hash: "#internship", slugKey: "dir.intern.slug", creditKey: "dir.intern.credit", moduleKey: "dir.intern.module", rot: -2 },
    { hash: "#student", slugKey: "dir.student.slug", creditKey: "dir.student.credit", moduleKey: "dir.student.module", rot: 4 },
    { hash: "#content", slugKey: "dir.content.slug", creditKey: "dir.content.credit", moduleKey: "dir.content.module", rot: -3 },
  ];

  function renderNavDirectoryList() {
    const list = document.getElementById("nav-directory-list");
    if (!list) return;
    list.innerHTML = "";
    NAV_DIRECTORY.forEach((item, i) => {
      const a = document.createElement("a");
      a.className = "nj-track";
      a.href = item.hash;
      a.innerHTML = `
        <span class="nj-dymo" style="--dymo-rot:${item.rot}deg">
          <span class="nj-dymo-icon" aria-hidden="true">${NJ_TRACK_ICONS[i]}</span>
          <span class="nj-dymo-num">${String(i + 1).padStart(2, "0")}</span>
        </span>
        <span class="nj-track-main">
          <span class="nj-track-title">${t(item.slugKey)}</span>
          <span class="nj-track-meta">${t(item.creditKey)}</span>
          ${lang === "en" ? `<span class="nj-track-module">${t(item.moduleKey)}</span>` : ""}
        </span>
        <span class="nj-pixel-hand" aria-hidden="true">☞</span>`;
      list.appendChild(a);
    });
  }

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function scrollToAnchor(hash) {
    const el = document.querySelector(hash);
    if (!el) return;
    const nav = document.getElementById("site-nav");
    const navH = nav?.classList.contains("is-docked") ? 12 : nav?.offsetHeight || 64;
    const target = el.getBoundingClientRect().top + window.scrollY - navH - 8;
    const start = window.scrollY;
    const dist = target - start;
    const duration = 800;
    const t0 = performance.now();
    function step(now) {
      const p = Math.min((now - t0) / duration, 1);
      window.scrollTo(0, start + dist * easeOutCubic(p));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function initInPageNav() {
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      if (a.classList.contains("nav-hub-link")) {
        scrollToAnchor("#hero");
        setTimeout(showHeroDirectory, 500);
        return;
      }
      scrollToAnchor(hash);
      history.replaceState(null, "", hash);
    });
  }

  function lockScrollHome() {
    window.scrollTo(0, 0);
  }

  function showHeroDirectory() {
    document.getElementById("hero-directory-stack")?.classList.add("is-visible");
  }

  /** @type {{ src: string, titleKey: string }[]} */
  const MUSIC_TRACKS = [
    { src: "music/59a69b9bc4664c0cf3c6bded5a61996a.mp4", titleKey: "music.trackTitle" },
  ];

  function initHeroMusic() {
    const shell = document.getElementById("px-music");
    const audio = document.getElementById("px-music-audio");
    const playBtn = document.getElementById("px-music-play");
    const coverBtn = document.getElementById("px-music-cover-btn");
    const lcdTag = document.getElementById("px-music-lcd-tag");
    const timeEl = document.getElementById("px-music-time");
    const trackLabel = document.getElementById("px-music-track-label");
    if (!shell || !audio || !playBtn || MUSIC_TRACKS.length === 0) return;

    let trackIndex = 0;
    let isPlaying = false;

    const formatTime = (sec) => {
      if (!Number.isFinite(sec) || sec < 0) return "0:00";
      const m = Math.floor(sec / 60);
      const s = Math.floor(sec % 60);
      return `${m}:${String(s).padStart(2, "0")}`;
    };

    const updateTime = () => {
      if (!timeEl) return;
      timeEl.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
    };

    const setPlayingUi = (playing) => {
      isPlaying = playing;
      shell.classList.toggle("is-playing", playing);
      if (lcdTag) lcdTag.textContent = playing ? t("music.lcdPlay") : t("music.lcdStop");
      const aria = playing ? t("music.pauseAria") : t("music.playAria");
      playBtn.setAttribute("aria-label", aria);
      coverBtn?.setAttribute("aria-label", aria);
    };

    const loadTrack = (index) => {
      trackIndex = index;
      const track = MUSIC_TRACKS[trackIndex];
      audio.src = track.src;
      if (trackLabel && track.titleKey) trackLabel.textContent = t(track.titleKey);
      updateTime();
    };

    const play = () => {
      audio.play().then(() => setPlayingUi(true)).catch(() => setPlayingUi(false));
    };

    const pause = () => {
      audio.pause();
      setPlayingUi(false);
    };

    const toggle = () => {
      if (isPlaying) pause();
      else play();
    };

    loadTrack(0);

    playBtn.addEventListener("click", toggle);
    coverBtn?.addEventListener("click", toggle);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateTime);
    audio.addEventListener("ended", () => {
      setPlayingUi(false);
      audio.currentTime = 0;
      updateTime();
    });
    audio.addEventListener("pause", () => {
      if (!audio.ended) setPlayingUi(false);
    });
    audio.addEventListener("play", () => setPlayingUi(true));
  }

  function initProfileInfoToggle() {
    const profileWin = document.getElementById("profile-win");
    const profileVisual = document.getElementById("profile-visual");
    const winMinBtn = document.getElementById("profile-win-minimize");
    const winMaxBtn = document.getElementById("profile-win-maximize");
    const closeBtn = document.getElementById("profile-win-close");
    const infoRestore = document.getElementById("profile-info-restore");
    const photoRestore = document.getElementById("profile-photo-restore");
    const winRestore = document.getElementById("profile-win-restore");
    const winMain = document.getElementById("profile-win-main");
    const visualMain = document.getElementById("profile-visual-main");
    const winTitle = profileWin?.querySelector(".profile-win-title");
    const collage = document.getElementById("profile-collage");
    if (!profileWin || !profileVisual || !winMinBtn || !winMaxBtn || !closeBtn || !infoRestore || !photoRestore || !winRestore || !collage) return null;

    let infoMinimized = false;
    let contentMaximized = false;
    let infoClosed = false;

    const syncWinTitle = () => {
      if (!winTitle || infoClosed) return;
      const key = infoMinimized ? "profile.folderLabel" : "profile.winTitle";
      winTitle.setAttribute("data-i18n", key);
      winTitle.textContent = t(key);
    };

    const syncAria = () => {
      winMinBtn.setAttribute("aria-label", t("profile.minimizeAria"));
      winMaxBtn.setAttribute("aria-label", t("profile.maximizeAria"));
      closeBtn.setAttribute("aria-label", t("profile.closeAria"));
      winMaxBtn.setAttribute("aria-pressed", contentMaximized ? "true" : "false");
      infoRestore.setAttribute("aria-label", t("profile.restoreInfoAria"));
      photoRestore.setAttribute("aria-label", t("profile.restorePhotoAria"));
      winRestore.setAttribute("aria-label", t("profile.closeRestoreAria"));
      syncWinTitle();
    };

    const setInfoMinimized = (minimized) => {
      infoMinimized = minimized;
      profileWin.classList.toggle("is-minimized", minimized);
      if (winMain) winMain.hidden = minimized;
      infoRestore.hidden = !minimized;
      syncWinTitle();
    };

    const setContentMaximized = (maximized) => {
      contentMaximized = maximized;
      collage.classList.toggle("is-content-maximized", maximized);
      profileVisual.classList.toggle("is-photo-folded", maximized);
      profileWin.classList.toggle("is-maximized", maximized);
      if (visualMain) visualMain.hidden = maximized;
      photoRestore.hidden = !maximized;
      syncAria();
    };

    const setInfoClosed = (closed) => {
      if (closed) {
        if (infoMinimized) setInfoMinimized(false);
        if (contentMaximized) setContentMaximized(false);
      }
      infoClosed = closed;
      collage.classList.toggle("is-info-closed", closed);
      profileWin.hidden = closed;
      winRestore.hidden = !closed;
      profileWin.setAttribute("aria-hidden", closed ? "true" : "false");
      syncAria();
    };

    winMinBtn.addEventListener("click", () => setInfoMinimized(true));
    infoRestore.addEventListener("click", () => setInfoMinimized(false));
    winMaxBtn.addEventListener("click", () => setContentMaximized(true));
    photoRestore.addEventListener("click", () => setContentMaximized(false));
    closeBtn.addEventListener("click", () => setInfoClosed(true));
    winRestore.addEventListener("click", () => setInfoClosed(false));
    syncAria();

    return { onLangChange: syncAria };
  }

  function initProfileBlurbTypewriter() {
    const blurb = document.querySelector(".profile-blurb");
    const section = document.getElementById("profile");
    if (!blurb || !section) return null;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer = null;
    let hasPlayed = false;

    function clearTimer() {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    }

    function finish(fullText) {
      blurb.textContent = fullText;
      blurb.classList.remove("is-typing");
      blurb.removeAttribute("aria-busy");
    }

    function type(fullText) {
      clearTimer();
      if (reducedMotion) {
        finish(fullText);
        return;
      }
      blurb.textContent = "";
      blurb.classList.add("is-typing");
      blurb.setAttribute("aria-busy", "true");

      const chars = [...fullText];
      let i = 0;

      const step = () => {
        if (i >= chars.length) {
          finish(fullText);
          return;
        }
        blurb.textContent += chars[i];
        i += 1;
        const ch = chars[i - 1];
        let delay = 58;
        if (/[，。、；：！？…]/.test(ch)) delay = 140;
        else if (/[,.!?;:]/.test(ch)) delay = 110;
        else if (/\s/.test(ch)) delay = 36;
        timer = setTimeout(step, delay);
      };
      step();
    }

    function play() {
      hasPlayed = true;
      type(t("profile.blurb"));
    }

    blurb.textContent = reducedMotion ? t("profile.blurb") : "";

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed) {
          play();
          io.disconnect();
        }
      },
      { threshold: 0.28, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(section);

    const rect = section.getBoundingClientRect();
    if (!hasPlayed && rect.top < window.innerHeight * 0.82 && rect.bottom > window.innerHeight * 0.12) {
      play();
      io.disconnect();
    }

    return {
      onLangChange() {
        if (!hasPlayed) return;
        play();
      },
    };
  }

  function initProfileSection() {
    profileBlurbTypewriter = initProfileBlurbTypewriter();
    profileInfoToggle = initProfileInfoToggle();

    const photos = [...document.querySelectorAll(".profile-photo")];
    const dotsWrap = document.getElementById("profile-dots");
    const btnPrev = document.getElementById("profile-carousel-prev");
    const btnNext = document.getElementById("profile-carousel-next");
    const photoView = document.getElementById("profile-photo-view");
    const photoCounter = document.getElementById("profile-photo-counter");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxClose = document.getElementById("lightbox-close");
    if (!photos.length) return;

    let photoIdx = 0;
    let photoTimer;

    function updateCounter() {
      if (!photoCounter) return;
      const n = String(photos.length).padStart(2, "0");
      const cur = String(photoIdx + 1).padStart(2, "0");
      photoCounter.textContent = `${cur} / ${n}`;
    }

    function goPhoto(i, userAction = false) {
      const nextIdx = ((i % photos.length) + photos.length) % photos.length;
      if (nextIdx === photoIdx) return;
      const cur = photos[photoIdx];
      const next = photos[nextIdx];
      cur?.classList.add("fade-out");
      setTimeout(() => {
        cur?.classList.remove("fade-out", "is-active");
        cur.hidden = true;
        photoIdx = nextIdx;
        next.hidden = false;
        next.classList.add("is-active");
        dotsWrap?.querySelectorAll("button").forEach((b, j) => b.classList.toggle("active", j === photoIdx));
        updateCounter();
      }, 380);
      if (userAction) resetPhotoTimer();
    }

    function resetPhotoTimer() {
      clearInterval(photoTimer);
      photoTimer = setInterval(() => goPhoto(photoIdx + 1), 5500);
    }

    photos.forEach((img, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("role", "tab");
      b.setAttribute("aria-label", `${i + 1}`);
      if (i === 0) b.classList.add("active");
      b.addEventListener("click", () => goPhoto(i, true));
      dotsWrap?.appendChild(b);
    });

    btnPrev?.addEventListener("click", () => goPhoto(photoIdx - 1, true));
    btnNext?.addEventListener("click", () => goPhoto(photoIdx + 1, true));
    photoView?.addEventListener("click", openLightbox);

    updateCounter();
    resetPhotoTimer();

    function openLightbox() {
      const img = photos[photoIdx];
      if (!lightbox || !lightboxImg || !img?.src) return;
      lightboxImg.src = img.src;
      lightboxImg.alt = t("profile.lightboxAlt");
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      if (!lightbox) return;
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    lightboxClose?.addEventListener("click", closeLightbox);
    lightbox?.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox?.classList.contains("open")) closeLightbox();
    });
  }

  function initSectionPanels() {
    document.querySelectorAll("main > section:not(#hero)").forEach((section) => {
      const seaNote = section.querySelector(":scope > .sea-note-box");
      if (seaNote) {
        section.classList.add("section-shell", "section-shell--contact");
        seaNote.classList.add("section-panel");
        return;
      }

      if (section.classList.contains("footer-section")) {
        section.classList.add("section-shell", "section-shell--partner");
        return;
      }

      const container =
        section.querySelector(":scope > .container") ||
        section.querySelector(":scope > .container-student");
      if (!container || container.dataset.panelWrapped === "1") return;
      container.dataset.panelWrapped = "1";

      const title = container.querySelector(":scope > .section-title");
      const lead = container.querySelector(":scope > .section-lead");
      const rest = [...container.children].filter(
        (el) =>
          el !== title &&
          el !== lead &&
          !el.classList.contains("section-shell__head") &&
          !el.classList.contains("section-panel")
      );

      if (title || lead) {
        const head = document.createElement("header");
        head.className = "section-shell__head";
        if (title) head.appendChild(title);
        if (lead) head.appendChild(lead);
        container.insertBefore(head, container.firstChild);
      }

      if (rest.length === 0) {
        section.classList.add("section-shell", "section-shell--minimal");
        return;
      }

      const panel = document.createElement("div");
      panel.className = "section-panel";
      rest.forEach((el) => panel.appendChild(el));
      container.appendChild(panel);
      section.classList.add("section-shell");
    });
  }

  function initSectionReveal() {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sections = document.querySelectorAll("section:not(#hero)");

    sections.forEach((section) => {
      section.classList.add("section-reveal");
      const container =
        section.querySelector(":scope > .container") ||
        section.querySelector(".y2k-win__client > .container") ||
        section.querySelector(":scope > .sea-note-box") ||
        section.querySelector(".y2k-win__client > .sea-note-box");
      if (!container) return;

      const targets =
        section.id === "contact"
          ? [container]
          : [...container.children];

      targets.forEach((el, i) => {
        el.classList.add("section-reveal__item");
        el.style.setProperty("--reveal-delay", `${i * 0.11}s`);
      });

      if (reducedMotion) {
        section.classList.add("is-inview");
      }
    });

    if (reducedMotion) {
      initContentSectionFX();
      return;
    }

    const revealIfVisible = (section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.72 && rect.bottom > window.innerHeight * 0.08) {
        section.classList.add("is-inview");
        return true;
      }
      return false;
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-inview");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
    );

    sections.forEach((section) => {
      if (!revealIfVisible(section)) io.observe(section);
    });

    initContentSectionFX();
  }

  const CONTENT_TEEN_SLOTS = ["hero", "tl", "tr", "br"];

  function teenImageUrl(filename) {
    return `teen/${encodeURIComponent(filename)}`;
  }

  async function loadTeenManifest() {
    try {
      const res = await fetch("teen/manifest.json", { cache: "no-store" });
      if (!res.ok) return [];
      const data = await res.json();
      return Array.isArray(data) ? data.filter((f) => typeof f === "string" && f.trim()) : [];
    } catch {
      return [];
    }
  }

  function initContentTeenCollage() {
    const root = document.getElementById("content-teen-collage");
    if (!root) return;

    loadTeenManifest().then((files) => {
      if (!files.length) return;

      root.classList.add("has-photos");

      CONTENT_TEEN_SLOTS.forEach((slot, i) => {
        const file = files[i];
        if (!file) return;
        const img = root.querySelector(`[data-teen-slot="${slot}"]`);
        if (!img) return;
        const piece = img.closest(".content-collage-piece");
        img.addEventListener(
          "error",
          () => {
            if (piece) piece.remove();
            else img.remove();
          },
          { once: true }
        );
        img.src = teenImageUrl(file);
      });

      const thumbsEl = document.getElementById("content-teen-thumbs");
      const thumbFiles = files.slice(CONTENT_TEEN_SLOTS.length, CONTENT_TEEN_SLOTS.length + 5);
      if (thumbsEl && thumbFiles.length) {
        thumbsEl.innerHTML = thumbFiles
          .map(
            (file) =>
              `<figure class="content-collage-thumb"><img class="content-collage-img" src="${teenImageUrl(file)}" alt="" width="52" height="70" loading="lazy" decoding="async" /></figure>`
          )
          .join("");
        thumbsEl.setAttribute("aria-hidden", "false");
      }
    });
  }

  function initContentSectionFX() {
    const section = document.getElementById("content");
    if (!section) return;

    const runFX = () => {
      section.querySelectorAll(".stat-bar__fill").forEach((bar) => bar.classList.add("is-filled"));
    };

    if (section.classList.contains("is-inview")) {
      runFX();
      return;
    }

    const fxObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          runFX();
          fxObserver.disconnect();
        });
      },
      { threshold: 0.22, rootMargin: "0px 0px -6% 0px" }
    );
    fxObserver.observe(section);
  }

  function initSiteNav() {
    const nav = document.getElementById("site-nav");
    const hero = document.getElementById("hero");
    if (!nav || !hero) return;

    const setDocked = (docked) => nav.classList.toggle("is-docked", docked);

    const io = new IntersectionObserver(
      ([entry]) => setDocked(!entry.isIntersecting),
      { threshold: 0.12, rootMargin: "-8% 0px -55% 0px" }
    );
    io.observe(hero);

    if (hero.getBoundingClientRect().bottom < window.innerHeight * 0.35) {
      setDocked(true);
    }
  }

  function initHeroDirectory() {
    const hero = document.getElementById("hero");
    const stack = document.getElementById("hero-directory-stack");
    if (!hero || !stack) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => stack.classList.toggle("is-visible", entry.isIntersecting));
      },
      { threshold: 0.2 }
    );
    io.observe(hero);

    if (hero.getBoundingClientRect().top < window.innerHeight * 0.85) {
      requestAnimationFrame(() => stack.classList.add("is-visible"));
    }
  }

  const PROJECTS = [
    {
      cover: "30/3E14A5B3BA10BE13423E8F0E73F19AEB.png",
      img: "2/2026-05-27 164806.png",
      badges: {
        zh: "2篇SCI · 国赛二等奖/省赛一等奖 · 1项专利",
        en: "2 SCI Papers · National 2nd / Prov 1st · 1 Patent",
      },
      title: {
        zh: "「铁卫」锂电池哨兵 - DMC 锂电池热失控预警系统",
        en: '"Iron Guard Battery Sentry" - DMC Lithium Battery Thermal Runaway Early Warning System',
      },
      shortTitle: { zh: "铁卫·电池哨兵", en: "Iron Guard · Battery Sentry" },
      meta: { zh: "项目负责人 · 2024.09 - 2025.12", en: "Project Leader · Sep 2024 - Dec 2025" },
      pain: {
        zh: "针对现有DMC气体检测技术成本高、选择性差、响应慢的行业痛点，填补5-50ppm低浓度监测空白。",
        en: "Addresses high cost, poor selectivity, and slow response of existing DMC gas detection, filling the 5-50ppm low-concentration monitoring gap.",
      },
      mainContent: {
        zh: "针对储能安全领域锂电池热失控预警核心挑战，解决现有 DMC 气体检测技术成本高、选择性差、响应慢的行业痛点，开发低成本高性能检测方案，填补 5-50ppm DMC 监测的行业空白。项目获大连理工大学优秀本科生科研项目及 2 万元专项科研经费，发表 SCI 论文 2 篇，申请实用新型专利 1 项，获「明石杯」全国大学生微纳传感技术与智能应用大赛国家级二等奖、省级一等奖。",
        en: 'Addresses the core challenge of lithium battery thermal runaway early warning in energy storage safety, solves industry pain points of high cost, poor selectivity and slow response of existing DMC gas detection technologies, and develops a low-cost and high-performance detection solution to fill the industry gap in 5-50ppm DMC monitoring. Awarded Excellent Undergraduate Research Project of Dalian University of Technology with 20,000 RMB special research funding, published 2 SCI papers, applied for 1 utility model patent, and won the National Second Prize and Provincial First Prize in the "Mingshi Cup" National College Students Micro-nano Sensing Technology and Intelligent Application Competition.',
      },
      tech: {
        zh: "NiFe₂O₄纳米材料特异性吸附 · STM32双层主控 · LoRa+Wi-Fi双模无线 · 跨平台IoT可视化监控",
        en: "NiFe₂O₄ Nanomaterial Specific Adsorption · STM32 Dual-layer Master Control · LoRa+Wi-Fi Dual-mode Wireless · Cross-platform IoT Visualization",
      },
      tags: {
        zh: ["跨学科整合", "MOF材料研发", "STM32", "锂电池安全"],
        en: ["Cross-disciplinary", "MOF Materials", "STM32", "Battery Safety"],
      },
      backTitle: { zh: "核心贡献", en: "Key Contributions" },
      backItems: {
        zh: [
          "担任项目负责人，统筹 3 人团队全流程研发，实现从基础材料研发到终端产品的全链条落地",
          "主导镍铁氧体 (NiFe₂O₄) 纳米材料合成工艺开发，通过金属盐前驱体配位调控结合氧化还原校正技术，实现 DMC 检测从「非选择性物理吸附」到「特异性化学吸附」的突破",
          "帮助队员进行基于 STM32 单片机的检测控制系统设计，绘制双层 PCB 主控板，将硬件系统成本控制在 51-61 元，仅为同类竞品的 1/10",
          "设计 3D 打印卡扣式外壳 (公差 ±0.1mm)，支持 5 秒快速拆装和传感器头更换，解决传统设备「一机一用」的刚性限制",
          "参与搭建分层架构物联网监控平台，开发跨平台可视化监控系统，支持 PC 和移动端实时数据查看与异常报警",
          "作为「气体安全盾」项目第三负责人，将 STM32 检测技术应用于三乙胺气体监测，该项目获「建行杯」辽宁省大学生创新创业大赛省级银奖",
        ],
        en: [
          "Served as project leader, coordinated the end-to-end R&D of the 3-person team, and realized the full-chain implementation from basic material R&D to terminal products",
          'Led the development of nickel ferrite (NiFe₂O₄) nanomaterial synthesis process, and achieved the breakthrough from "non-selective physical adsorption" to "specific chemical adsorption" for DMC detection through metal salt precursor coordination control combined with redox correction technology',
          "Helped team members with STM32 microcontroller-based detection and control system design, drew the double-layer PCB main control board, and controlled the hardware system cost at 51-61 RMB, only 1/10 of similar competing products",
          'Designed a 3D printed snap-on housing (tolerance ±0.1mm) that supports quick disassembly and assembly within 5 seconds and sensor head replacement, solving the rigid limitation of "one machine for one use" of traditional equipment',
          "Participated in building a layered architecture IoT monitoring platform, developed a cross-platform visual monitoring system supporting real-time data viewing and abnormal alarms on PC and mobile terminals",
          'As the third person in charge of the "Gas Safety Shield" project, applied STM32 detection technology to triethylamine gas monitoring, which won the Provincial Silver Award in the "CCB Cup" Liaoning Provincial College Students Innovation Competition',
        ],
      },
      links: [
        { label: "Chen Y et al. ACS Applied Nano Materials, 2025", url: "https://doi.org/10.1021/acsanm.5c02393" },
        { label: "Song X Z et al. Inorganic Chemistry Frontiers", url: "https://doi.org/10.1039/d5qi02410b" },
      ],
    },
    {
      cover: "30/2F3B9B14CF9C249A54F888A9063B0F90.png",
      img: "3/1.png",
      badges: {
        zh: "50阶模态分析 · 创新预警体系 · 院级二等奖",
        en: "50-Order Modal Analysis · Innovative Warning · School 2nd Prize",
      },
      title: {
        zh: "基于甲板振动响应数据的智能预警系统研究",
        en: "Research on Intelligent Early Warning System Based on Deck Vibration Response Data",
      },
      shortTitle: { zh: "甲板振动智能预警", en: "Deck Vibration Warning" },
      meta: {
        zh: "独立项目负责人 · 2024.09 - 2026.03",
        en: "Independent Project Leader · Sep 2024 - Mar 2026",
      },
      summary: {
        zh: "独立发起并主导的海洋工程安全项目，构建了「建模-仿真-数据-算法-预警」全链条船舶结构健康监测方案。",
        en: 'Independently initiated and led marine engineering safety project, building a "modeling-simulation-data-algorithm-warning" full-chain structural health monitoring solution.',
      },
      mainContent: {
        zh: "针对船舶航行过程中振动过大导致的结构疲劳、设备故障和人员舒适度下降问题，以 14000 载重吨成品油船为研究对象，构建「仿真建模 - 数据采集 - 智能分析 - 安全评估」全链条技术方案。项目为校级大学生创新创业训练计划项目，2026 年 3 月顺利结题，获 DLI EXPLORE 海报设计大赛二等奖，参与学校「攀登杯」创新大赛路演。",
        en: 'Addresses the problems of structural fatigue, equipment failure and personnel comfort reduction caused by excessive vibration during ship navigation. Taking a 14,000 DWT product oil tanker as the research object, constructs a full-chain technical solution of "simulation modeling - data acquisition - intelligent analysis - safety assessment". A university-level College Students\' Innovation and Entrepreneurship Training Program project, successfully concluded in March 2026, won the second prize in the DLI EXPLORE Poster Design Competition, and participated in the roadshow of the university\'s "Climbing Cup" Innovation Competition.',
      },
      tags: {
        zh: ["独立科研", "CAD", "Patran", "Nastran", "Origin"],
        en: ["Independent Research", "CAD", "Patran", "Nastran", "Origin"],
      },
      backTitle: { zh: "核心贡献", en: "Key Contributions" },
      backItems: {
        zh: [
          "独立发起项目，完成问题定义、技术路线设计和核心方案实施，在导师指导下顺利结题",
          "自主学习 Patran 有限元建模、Nastran 结构分析、MySQL 数据库管理和 Origin 数据可视化等专业软件",
          "通过 Nastran 软件完成 50 阶固有模态分析，计算主机、螺旋桨和发电机额定转速下的激励频率，评估各部位频率储备值，精准识别船舶结构高风险振动区域",
          "设计 50 个典型测点布置方案，采集整理不同工况下振动速度、激励频率等核心数据，构建标准化振动响应数据库",
          "使用 MySQL 数据库对原始数据进行清洗、去噪和标准化处理，通过 Origin 软件实现振动时域和频域数据的多维度可视化分析",
          "创新性融合 CCS 规范频率储备阈值和 ISO 振动幅值标准，建立二维分级预警系统，实现「正常 - 需关注 - 预警」三级安全评估",
        ],
        en: [
          "Independently initiated the project, completed problem definition, technical route design and core solution implementation, and successfully concluded the project under supervisor's guidance",
          "Self-learned professional software including Patran finite element modeling, Nastran structural analysis, MySQL database management and Origin data visualization",
          "Completed 50 fundamental mode analyses through Nastran software, calculated excitation frequencies of main engine, propeller and generator at rated speeds, evaluated frequency reserve values of each part, and accurately identified high-risk vibration areas of ship structure",
          "Designed the layout plan of 50 typical measuring points, collected and sorted core data such as vibration velocity and excitation frequency under different working conditions, and built a standardized vibration response database",
          "Used MySQL database to clean, denoise and standardize original data, and realized multi-dimensional visual analysis of vibration time-domain and frequency-domain data through Origin software",
          'Innovatively integrated CCS specification frequency reserve threshold and ISO vibration amplitude standard, established a two-dimensional hierarchical early warning system, and realized three-level safety assessment of "normal - need attention - early warning"',
        ],
      },
    },
    {
      cover: "30/786DFC4AFFA3ECBA0C8614069FB648B1.png",
      img: "4/B9C2CB4045EA7BD9F98A5C403A211763.png",
      badges: {
        zh: "双层控制架构 · 100米图传 · 2026.07下水测试",
        en: "Dual-layer Control · 100m Video Link · July 2026 Water Test",
      },
      title: {
        zh: "「Punch Out」小型双体无人水面艇",
        en: '"Punch Out" Small Catamaran Unmanned Surface Vehicle',
      },
      shortTitle: { zh: "Punch Out 无人艇", en: "Punch Out USV" },
      meta: { zh: "控制系统负责人 · 2026.02 - 至今", en: "Control System Leader · Feb 2026 - Present" },
      summary: {
        zh: "跨学科系统工程项目，负责控制系统与视觉传输设计，打造浅水环境智能海洋观测平台。",
        en: "Cross-disciplinary systems engineering project, responsible for control system and vision transmission design, creating an intelligent marine observation platform for shallow water.",
      },
      mainContent: {
        zh: "EG2006 综合工程设计课程最终成果，旨在开发适用于浅水环境的轻量化、模块化无人水面艇，可用于自主观测、避障、视觉传输和智能导航任务。6 人跨学科团队涵盖船体设计、结构工程、控制工程和动力系统等专业领域，目前已完成完整概念设计报告，计划 2026 年 7 月初完成实物原型建造并进行水上测试和迭代优化。",
        en: "The final outcome of the EG2006 Integrated Engineering Design course, aiming to develop a lightweight and modular unmanned surface vehicle suitable for shallow water environments, which can be used for autonomous observation, obstacle avoidance, visual transmission and intelligent navigation tasks. A 6-person interdisciplinary team covering hull design, structural engineering, control engineering and power system. The complete concept design report has been completed, and physical prototype construction and water testing with iterative optimization are planned to be completed in early July 2026.",
      },
      tags: {
        zh: ["控制系统", "飞控", "跨部门协作", "产品设计", "Xmind"],
        en: ["Control System", "Flight Control", "Cross-dept Collaboration", "Product Design", "Xmind"],
      },
      backTitle: { zh: "核心贡献", en: "Key Contributions" },
      backItems: {
        zh: [
          "作为核心成员，负责控制系统和视觉传输系统的设计工作",
          "主导核心控制器方案对比选型，确定「树莓派上层决策 + Pixhawk 2.4.8 底层执行」的双层控制架构",
          "完成控制系统硬件架构和接口规范设计，规划「地面站 - 树莓派 - Pixhawk - 电调 - 电机 - 传感器」完整硬件链路，明确各模块间通信协议和数据交互标准",
          "对比多种视频传输方案，最终选用独立 S1232T 5.8G 图传方案，不占用主控制器核心计算资源，目标实现≥100 米有效传输距离和≤300ms 画面延迟",
          "负责系统硬件选型和采购工作，为 7 月原型制作和集成测试做准备",
          "与船体设计、结构工程和动力系统等不同专业背景的学生紧密合作，及时解决接口匹配问题，确保项目按计划推进",
        ],
        en: [
          "As a core member, responsible for the design of the control system and visual transmission system",
          'Led the comparison and selection of core controller solutions, and determined the two-layer control architecture of "Raspberry Pi upper-layer decision-making + Pixhawk 2.4.8 underlying execution"',
          'Completed the hardware architecture and interface specification design of the control system, planned the complete hardware link of "ground station - Raspberry Pi - Pixhawk - ESC - motor - sensor", and clarified communication protocols and data interaction standards between each module',
          "Compared multiple video transmission solutions, finally selected the independent S1232T 5.8G video transmission solution which does not occupy core computing resources of the main controller, aiming to achieve ≥100 meters effective transmission distance and ≤300ms picture delay",
          "Responsible for system hardware selection and procurement work, preparing for prototype production and integration testing in July",
          "Worked closely with students from different professional backgrounds including hull design, structural engineering and power system, solved interface matching problems in a timely manner to ensure the project progressed as planned",
        ],
      },
    },
    {
      cover: "30/B80DDC5EC8F5082C41683F6DF5A619B2.png",
      img: "5/20260527_1743.png",
      badges: {
        zh: "可拆卸相机 · 实时健康监测 · 精准防丢定位",
        en: "Detachable Camera · Real-time Health · Precise Anti-lost",
      },
      title: {
        zh: "Pawspective 一体化智能宠物项圈",
        en: "Pawspective Integrated Smart Pet Collar",
      },
      shortTitle: { zh: "Pawspective 项圈", en: "Pawspective Collar" },
      meta: { zh: "项目创始人/CEO · 2026.03 - 至今", en: "Project Founder/CEO · Mar 2026 - Present" },
      summary: {
        zh: "打造有温度的智能宠物穿戴产品，用科技深化人与宠物的情感联结。",
        en: "Creating a warm smart pet wearable, using technology to deepen the emotional connection between humans and pets.",
      },
      tags: {
        zh: ["战略规划", "商业模拟", "领导力", "image2", "CAD"],
        en: ["Strategic Planning", "Business Simulation", "Leadership", "image2", "CAD"],
      },
      backTitle: { zh: "关键突破", en: "Key Breakthroughs" },
      backItems: {
        zh: [
          "功能创新：首创「安全+健康+社交」三位一体设计。",
          "体验优化：可拆卸相机兼顾实用性与内容创作。",
          "社会价值：减少宠物走失与流浪动物数量。",
          "商业闭环：硬件销售+内容生态双驱动模式。",
        ],
        en: [
          'Functional Innovation: Pioneered "Safety + Health + Social" three-in-one design.',
          "Experience Optimization: Detachable camera balances utility and content creation.",
          "Social Value: Reduces lost pets and stray animal populations.",
          "Business Loop: Dual-driven model of hardware sales + content ecosystem.",
        ],
      },
    },
  ];

  let projectIndex = 0;
  let projectModalOpen = false;
  let projectView = "grid";

  function projectTagsHtml(p) {
    return p.tags[lang].map((tag) => `<span class="proj-tag-pill">${tag}</span>`).join("");
  }

  function projectBrief(p) {
    return p.pain?.[lang] || p.summary?.[lang] || "";
  }

  function projectContribHtml(p) {
    let html = "";
    if (p.backText?.[lang]) {
      html += `<p class="proj-modal__text">${p.backText[lang]}</p>`;
    }
    if (p.backItems?.[lang]?.length) {
      html += `<ol class="proj-back-list">${p.backItems[lang].map((item) => `<li>${item}</li>`).join("")}</ol>`;
    }
    if (p.links?.length) {
      html += `<ul class="proj-links">${p.links
        .map((l) => `<li><a href="${l.url}" target="_blank" rel="noopener noreferrer">${l.label}</a></li>`)
        .join("")}</ul>`;
    }
    return html;
  }

  function renderProjectModal() {
    const panel = document.getElementById("project-modal-panel");
    const modal = document.getElementById("project-modal");
    if (!panel || !modal) return;
    const p = PROJECTS[projectIndex];
    if (!p) return;

    const mainBlock = p.mainContent?.[lang]
      ? `<div class="proj-modal__block"><h4 class="proj-modal__label">${t("projects.mainContentLabel")}</h4><p class="proj-modal__text">${p.mainContent[lang]}</p></div>`
      : "";
    const techBlock = p.tech?.[lang]
      ? `<div class="proj-modal__block"><h4 class="proj-modal__label">${t("projects.techLabel")}</h4><p class="proj-modal__text">${p.tech[lang]}</p></div>`
      : "";
    const contribBlock = projectContribHtml(p)
      ? `<div class="proj-modal__block"><h4 class="proj-modal__label">${p.backTitle?.[lang] || t("projects.contribLabel")}</h4>${projectContribHtml(p)}</div>`
      : "";

    panel.innerHTML = `
      <article class="proj-win98 proj-win98--modal">
        <header class="proj-win98__titlebar">
          <span class="proj-win98__icon" aria-hidden="true">📁</span>
          <h3 class="proj-win98__title" id="project-modal-title">${p.title[lang]}</h3>
          <button type="button" class="proj-win98__close" id="project-modal-close" aria-label="${t("projects.closeAria")}">×</button>
        </header>
        <div class="proj-win98__body proj-modal__body">
          <div class="proj-modal__cover">
            <img src="${p.img}" alt="" loading="lazy" />
          </div>
          <p class="proj-modal__badges">${p.badges[lang]}</p>
          <h4 class="proj-modal__heading">${p.title[lang]}</h4>
          <p class="proj-modal__meta">${p.meta[lang]}</p>
          <div class="proj-modal__tags">${projectTagsHtml(p)}</div>
          <p class="proj-modal__text">${projectBrief(p)}</p>
          ${mainBlock}
          ${techBlock}
          ${contribBlock}
        </div>
      </article>`;

    panel.querySelector("#project-modal-close")?.addEventListener("click", closeProjectModal);
  }

  function openProjectModal(index) {
    projectIndex = index;
    projectModalOpen = true;
    const modal = document.getElementById("project-modal");
    const stage = document.getElementById("project-stage");
    if (!modal) return;
    renderProjectModal();
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    stage?.classList.add("is-modal-open");
    requestAnimationFrame(() => modal.classList.add("is-open"));
    document.body.style.overflow = "hidden";
  }

  function closeProjectModal() {
    projectModalOpen = false;
    const modal = document.getElementById("project-modal");
    const stage = document.getElementById("project-stage");
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    stage?.classList.remove("is-modal-open");
    document.body.style.overflow = "";
    window.setTimeout(() => {
      if (!projectModalOpen) {
        modal.hidden = true;
        const panel = document.getElementById("project-modal-panel");
        if (panel) panel.innerHTML = "";
      }
    }, 300);
  }

  function setProjectView(view) {
    projectView = view;
    const grid = document.getElementById("project-grid");
    const timeline = document.getElementById("project-timeline");
    const btnGrid = document.getElementById("project-view-grid");
    const btnTimeline = document.getElementById("project-view-timeline");
    const isGrid = view === "grid";
    grid?.classList.toggle("is-active", isGrid);
    timeline?.classList.toggle("is-active", !isGrid);
    if (grid) grid.hidden = !isGrid;
    if (timeline) timeline.hidden = isGrid;
    btnGrid?.classList.toggle("is-active", isGrid);
    btnTimeline?.classList.toggle("is-active", !isGrid);
    btnGrid?.setAttribute("aria-selected", isGrid ? "true" : "false");
    btnTimeline?.setAttribute("aria-selected", !isGrid ? "true" : "false");
  }

  function bindProjectCardOpens(root) {
    if (!root) return;
    root.querySelectorAll("[data-open]").forEach((el) => {
      el.addEventListener("click", () => openProjectModal(Number(el.dataset.open)));
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openProjectModal(Number(el.dataset.open));
        }
      });
    });
  }

  function renderProjects() {
    const grid = document.getElementById("project-grid");
    const timeline = document.getElementById("project-timeline");
    if (!grid || !timeline) return;

    grid.innerHTML = PROJECTS.map(
      (p, i) => `
      <article class="proj-grid-card" data-index="${i}" data-open="${i}" role="button" tabindex="0" aria-label="${p.title[lang]}">
        <div class="proj-grid-card__cover">
          <img src="${p.cover}" alt="" loading="lazy" draggable="false" />
        </div>
        <h3 class="proj-grid-card__title">${p.shortTitle[lang]}</h3>
        <div class="proj-grid-card__tags">${projectTagsHtml(p)}</div>
        <p class="proj-grid-card__brief">${projectBrief(p)}</p>
      </article>`
    ).join("");

    timeline.innerHTML = PROJECTS.map(
      (p, i) => `
      <article class="proj-strip-item" data-index="${i}" data-open="${i}" role="button" tabindex="0" aria-label="${p.title[lang]}">
        <div class="proj-strip-item__media">
          <img src="${p.cover}" alt="" loading="lazy" draggable="false" />
        </div>
        <div class="proj-strip-item__body">
          <p class="proj-strip-item__meta">${p.meta[lang]}</p>
          <p class="proj-strip-item__brief">${projectBrief(p)}</p>
          <div class="proj-strip-item__tags">${projectTagsHtml(p)}</div>
          <span class="proj-win98-btn">${t("projects.viewDetails")}</span>
        </div>
      </article>`
    ).join("");

    bindProjectCardOpens(grid);
    bindProjectCardOpens(timeline);
    setProjectView(projectView);
  }

  function initProjectGallery() {
    projectView = "grid";
    document.getElementById("project-view-grid")?.addEventListener("click", () => setProjectView("grid"));
    document.getElementById("project-view-timeline")?.addEventListener("click", () => setProjectView("timeline"));
    document.getElementById("project-modal-backdrop")?.addEventListener("click", closeProjectModal);
    renderProjects();
    setProjectView("grid");
  }

  buildTypeBridge();
  applyI18n();
  buildPhoneFeed();
  initProjectGallery();
  initContentTeenCollage();
  initShopComputer();
  initAbroadSection();
  abroadStoryTypewriter = initAbroadStoryTypewriter();
  initSectionPanels();
  initInPageNav();
  initSiteNav();
  initSectionReveal();
  initMemberFanFX();
  initInternSummaryWrite();
  initHeroDirectory();
  initHeroMusic();
  initHeroScrollSearch();
  initProfileSection();
  initCollageFloats();
  lockScrollHome();
  requestAnimationFrame(lockScrollHome);
  window.addEventListener("load", lockScrollHome, { once: true });
})();
