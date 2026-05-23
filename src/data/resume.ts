// 简历数据 — 在这里编辑你的内容,网站会自动渲染
// 支持: 文本、超链接、图片、视频、证明材料(可点开查看)

export type LinkText = {
  type: 'text'
  content: string
} | {
  type: 'link'
  content: string
  href: string
}

export type RichParagraph = LinkText[]

export interface Profile {
  name: string
  enName?: string
  title: string
  tagline: string
  avatar: string
  location: string
  email: string
  phone?: string
  wechat?: string
  birth?: string
  gender?: string
  meta?: { label: string; value: string }[]
  links: { label: string; href: string; icon?: string }[]
  highlights: { label: string; value: string; suffix?: string }[]
}

export interface MediaItem {
  type: 'image' | 'video'
  src: string
  poster?: string
  caption?: string
}

export interface Proof {
  title: string
  description?: string
  type: 'image' | 'pdf' | 'link'
  src: string
  thumbnail?: string
}

export interface ExperienceItem {
  company: string
  role: string
  period: string
  location?: string
  logo?: string
  /** 该工作岗位关联的产品(可选) */
  product?: {
    name: string
    description: string
    href?: string
    logo?: string
  }
  /** 轮播图 */
  gallery?: { src: string; caption?: string }[]
  summary: RichParagraph
  bullets: RichParagraph[]
  media?: MediaItem[]
  proofs?: Proof[]
  tags?: string[]
}

export interface ProjectItem {
  name: string
  role: string
  period: string
  /** 单张封面图(向后兼容,优先级低于 gallery) */
  cover?: string
  /** 轮播图,提供多张时左右切换;不传则使用 cover */
  gallery?: { src: string; caption?: string }[]
  description: RichParagraph
  highlights: RichParagraph[]
  media?: MediaItem[]
  proofs?: Proof[]
  tags?: string[]
  links?: { label: string; href: string }[]
}

export interface EducationItem {
  school: string
  degree: string
  major: string
  period: string
  logo?: string
  detail?: RichParagraph
  proofs?: Proof[]
}

export interface SkillGroup {
  name: string
  skills: { name: string; level: number /* 0-100 */ }[]
}

export interface AwardItem {
  title: string
  issuer: string
  date: string
  description?: RichParagraph
  proof?: Proof
}

export interface SelfEvalItem {
  title: string
  icon: 'sparkles' | 'target' | 'shield' | 'rocket'
  content: RichParagraph
}

// ============ 在下方修改为你自己的内容 ============

export const profile: Profile = {
  name: '李哲',
  enName: 'Li Zhe',
  title: 'AI Native',
  tagline:
    '擅长用 AI 与代码把各种任务做成可复制的工程化能力,从 0 到 1 跑通过完整项目闭环。',
  // 你的真实头像可以替换为 /avatar.jpg 后放到 public 目录
  avatar:
    'https://api.dicebear.com/9.x/notionists/svg?seed=LiZhe&backgroundColor=b6e3f4',
  location: '浙江 · 杭州',
  email: '3240215750@qq.com',
  phone: '13326372934',
  wechat: 'L3215663031',
  birth: '2003.07',
  gender: '男',
  meta: [
    { label: '出生年月', value: '2003.07' },
    { label: '民族', value: '汉族' },
    { label: '政治面貌', value: '共青团员' },
    { label: '婚姻状况', value: '未婚' },
  ],
  links: [
    { label: '邮箱', href: 'mailto:3240215750@qq.com' },
    { label: '电话', href: 'tel:13326372934' },
  ],
  highlights: [
    { label: 'AI 电商总 GMV', value: '15', suffix: '万+' },
    { label: '累计产出视频', value: '200', suffix: '+' },
    { label: '精准留资', value: '300', suffix: '+' },
    { label: '业务提效率', value: '100', suffix: '%+' },
  ],
}

export const experiences: ExperienceItem[] = [
  {
    company: '安托盟丘(杭州)科技有限公司',
    role: '技术内容运营实习生',
    period: '2025.10 — 2026.02',
    location: '杭州',
    logo: 'https://api.dicebear.com/9.x/shapes/svg?seed=Antoumq',
    product: {
      name: 'AutoMQ',
      description:
        'AutoMQ 是云原生 Kafka 替代方案，GitHub 10k+ Stars，已服务爱奇艺、京东、腾讯音乐、吉利汽车等国内头部大厂。通过将存储层卸载至 S3，实现存算分离与秒级弹性，帮助企业降低 Kafka 运维成本 70%+。',
      href: 'https://www.automq.com/',
      logo: '/logos/automq.png',
    },
    gallery: [
      { src: '/images/automq/独立完成官网blog页面.png', caption: '独立完成官网 Blog 页面' },
      { src: '/images/automq/全blog banner一致性设计.png', caption: '全 Blog Banner 一致性设计' },
      { src: '/images/automq/独立撰写的blog.png', caption: '独立撰写的 Blog' },
    ],
    summary: [
      { type: 'text', content: '负责官网 Blog 的视觉体系与海内外社媒扩散,并自研 ' },
      { type: 'link', content: 'Python', href: 'https://www.python.org/' },
      { type: 'text', content: ' 自动化工具消除运营冗余动作。' },
    ],
    bullets: [
      [
        { type: 'text', content: '封面与 UI 定义:负责官网 Blog 页面视觉体系重构,制定封面设计标准化规范,产出 60+ 高质量封面;利用 ' },
        { type: 'link', content: 'Cursor', href: 'https://cursor.com/' },
        { type: 'text', content: ' 等编程工具 Vibe Coding 独立完成 Blog 界面 UI 样式落地。' },
      ],
      [
        { type: 'text', content: '提效工具自研:独立编写 Python 自动化工具,实现页面批量提交操作与多维数据整合,消除冗余动作,大幅提升工作效率。' },
      ],
      [
        { type: 'text', content: '海内外社媒运营:在 ' },
        { type: 'link', content: 'X', href: 'https://x.com/' },
        { type: 'text', content: '、' },
        { type: 'link', content: 'LinkedIn', href: 'https://www.linkedin.com/' },
        { type: 'text', content: '、' },
        { type: 'link', content: 'Slack', href: 'https://slack.com/' },
        { type: 'text', content: '、' },
        { type: 'link', content: 'Medium', href: 'https://medium.com/' },
        { type: 'text', content: ' 等海外社媒撰写并扩散 post;在微信公众号、' },
        { type: 'link', content: 'OSC', href: 'https://www.oschina.net/' },
        { type: 'text', content: ' 等开源技术社区进行国内社媒扩散。' },
      ],
      [
        { type: 'text', content: 'SEO 增长:利用 ' },
        { type: 'link', content: 'Gemini', href: 'https://gemini.google.com/' },
        { type: 'text', content: ' 等 AI 工具创作内容,提升 ' },
        { type: 'link', content: 'Google', href: 'https://www.google.com/' },
        { type: 'text', content: ' 搜索权重;修复 130+ 异常页面,将未索引量稳定控制在个位数。' },
      ],
      [
        { type: 'text', content: 'SOP 治理:负责团队知识库沉淀,构建包括新人 Landing、文案规范在内的多项 SOP;将孤岛 SOP 分类串联合并,确保部门协作流程的标准化产出。' },
      ],
    ],
    tags: ['Vibe Coding', 'Python 自动化', 'SEO', '海外社媒', 'SOP', 'Cursor', 'Gemini'],
    // 你可以在这里补充截图与证明材料,例如:
    // media: [{ type: 'image', src: '/proof/blog-cover-01.jpg', caption: '官网 Blog 封面规范' }],
    // proofs: [{ title: '实习证明', type: 'image', src: '/proof/intern-01.jpg', thumbnail: '/proof/intern-01.jpg' }],
  },
  {
    company: '杭州阿思拓集团有限公司',
    role: '内容运营实习生',
    period: '2025.06 — 2025.09',
    location: '杭州',
    logo: 'https://api.dicebear.com/9.x/shapes/svg?seed=Astuo',
    product: {
      name: '91再生',
      description: '91再生（原中国再生资源交易网）是国内领先的再生资源 B2B 交易平台，注册会员 200万+，平台产品信息 1700万+ 条，覆盖废塑料、废金属、废纸等大宗再生物资，是行业内规模最大的数字化交易平台之一。',
      href: 'https://www.zz91.com/',
      logo: '/logos/91zs.png',
    },
    gallery: [
      { src: '/images/91zs/自研快速获取各账号数据工具.jpg', caption: '自研快速获取各账号数据工具' },
      { src: '/images/91zs/数据快速同步工具.png', caption: '数据快速同步工具' },
      { src: '/images/91zs/团队工作量信息获取工具.png', caption: '团队工作量信息获取工具' },
    ],
    summary: [
      { type: 'text', content: '负责短视频矩阵账号的内容产出与数据增长,并自研数据管理工具实现留资与播放量自动统计。' },
    ],
    bullets: [
      [
        { type: 'text', content: '矩阵账号运营:运营多个短视频账号,实现单条视频最高 ' },
        { type: 'text', content: '5 万+ 播放,累计精准获取留资 300+。' },
      ],
      [
        { type: 'text', content: '自动化工具自研:独立开发数据管理工具,实现留资与播放量自动统计,提升运营数据分析效率 100%。' },
      ],
      [
        { type: 'text', content: '选题策划:负责选题策划与脚本撰写,累计产出 200+ 视频,通过内容迭代将账号转化率提升。' },
      ],
      [
        { type: 'text', content: '短视频制作发布:经历从选题规划、脚本设计到拍摄剪辑、发布全流程,掌握短视频内容从 0 到 1 的完整周期。' },
      ],
    ],
    tags: ['短视频矩阵', '选题策划', 'Python 自动化', '数据分析', '账号增长'],
  },
]

export const projects: ProjectItem[] = [
  {
    name: '视频号 AI 电商创业',
    role: '总负责人',
    period: '2024.07 — 2025.01',
    cover:
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600',
    gallery: [
      { src: '/images/project/一些直播盯盘后台.jpg', caption: '直播盯盘后台' },
      { src: '/images/project/部分出单账单.png', caption: '部分出单账单' },
      { src: '/images/project/自研提效工具.png', caption: '自研提效工具' },
      { src: '/images/project/大学科技园入驻协议书.jpg', caption: '大学科技园入驻协议书' },
    ],
    description: [
      { type: 'text', content: '主导一支 4 人团队,以 AI 数字人口播 + ' },
      { type: 'link', content: '视频号小店', href: 'https://channels.weixin.qq.com/' },
      { type: 'text', content: ' 为载体,从选品定位、内容生产到投放转化全链路自闭环。' },
    ],
    highlights: [
      [
        { type: 'text', content: 'AI 电商:主导 AI 数字人口播短视频项目,通过选品定位与内容优化,实现总 GMV ' },
        { type: 'text', content: '15 万+。' },
      ],
      [
        { type: 'text', content: '流程产品化:设计并优化全链路 SOP,利用 ' },
        { type: 'link', content: 'Python', href: 'https://www.python.org/' },
        { type: 'text', content: ' 自动化实现视频发布效率提升 200%。' },
      ],
      [
        { type: 'text', content: '增长优化:负责自动化流程设计与内容文案迭代,有效推动直播间及橱窗转化率提升。' },
      ],
      [
        { type: 'text', content: '团队调度:管理 4 人团队并定期复盘,通过任务拆解与流程优化,确保销售额有效稳定产出。' },
      ],
    ],
    tags: ['AI 数字人', 'GMV 15万+', 'Python SOP', '团队管理'],
    // 想加项目截图、销售后台截图、视频成品时,在这里追加:
    // media: [{ type: 'image', src: '/proof/gmv.jpg', caption: '视频号小店 GMV 截图' }],
    // proofs: [{ title: '销售数据截图', type: 'image', src: '/proof/sales.jpg', thumbnail: '/proof/sales.jpg' }],
  },
]

export const education: EducationItem[] = [
  {
    school: '九江学院',
    degree: '本科',
    major: '网络工程',
    period: '2022.09 — 2026.06',
    logo: 'https://api.dicebear.com/9.x/shapes/svg?seed=JJU',
    detail: [
      { type: 'text', content: '主修课程:数据结构、计算机组成原理、操作系统、数据结构与算法、网络安全、基础编程语言(Python / C++ / Java)等。' },
    ],
  },
]

export const skills: SkillGroup[] = [
  {
    name: '运营技能',
    skills: [
      { name: '短视频策划 · 视频剪辑', level: 92 },
      { name: '电商运营 · 转化优化', level: 88 },
      { name: '账号增长 · 社媒运营', level: 90 },
    ],
  },
  {
    name: 'AI 技能',
    skills: [
      { name: 'Cursor / Vibe Coding', level: 92 },
      { name: 'Gemini · 提示词工程', level: 90 },
      { name: 'AI 内容产出', level: 88 },
    ],
  },
  {
    name: '编程技能',
    skills: [
      { name: 'Python 爬虫 · 自动化', level: 86 },
      { name: '数据处理 · 多维整合', level: 82 },
      { name: 'Vibe Coding 工程落地', level: 88 },
    ],
  },
  {
    name: '设计技能',
    skills: [
      { name: '剪映 · 视频剪辑', level: 90 },
      { name: 'Photoshop · Canva', level: 82 },
      { name: 'Figma', level: 78 },
    ],
  },
]

export const awards: AwardItem[] = [
  {
    title: '大学英语六级 (CET-6)',
    issuer: '教育部考试中心',
    date: '在校期间',
    description: [
      { type: 'text', content: '具备良好的英文读写能力,可独立完成海外社媒 post 撰写。' },
    ],
  },
  {
    title: '蓝桥杯大赛 省级三等奖',
    issuer: '蓝桥杯组委会',
    date: '在校期间',
    description: [
      { type: 'text', content: '算法与编程能力获得省级赛事认可。' },
    ],
  },
  {
    title: '全国计算机等级考试 二级',
    issuer: '教育部考试中心',
    date: '在校期间',
  },
]

export const selfEvaluation: SelfEvalItem[] = [
  {
    title: 'AI 技术驱动',
    icon: 'sparkles',
    content: [
      { type: 'text', content: '深谙 AI 提效工作流,熟练运用 ' },
      { type: 'link', content: 'Cursor', href: 'https://cursor.com/' },
      { type: 'text', content: ' / ' },
      { type: 'link', content: 'Gemini', href: 'https://gemini.google.com/' },
      { type: 'text', content: ' / Python 独立开发自动化工具,曾将业务提效率 100%+,具备较强的技术落地与产品化思维。' },
    ],
  },
  {
    title: '结果导向',
    icon: 'target',
    content: [
      { type: 'text', content: '具备从 0 到 1 的项目闭环能力,主导 AI 电商短视频项目实现 15 万+ GMV,擅长通过数据分析驱动策略迭代。' },
    ],
  },
  {
    title: '高标准执行',
    icon: 'shield',
    content: [
      { type: 'text', content: 'ENTJ 人格,善于将碎片化业务抽象为标准化 SOP,处理各种问题并实现体系化治理。' },
    ],
  },
  {
    title: '高适应性 · Owner 精神',
    icon: 'rocket',
    content: [
      { type: 'text', content: '快速学习并实操前沿工具,具备独立负责复杂模块的抗压能力,追求在不确定环境下通过工具化手段实现降本增效。' },
    ],
  },
]
