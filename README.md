# 个人简历网站

一份现代化的个人简历单页,支持文本超链接、图片、视频、证明材料,所有内容由 `src/data/resume.ts` 驱动。

## 本地开发

```bash
npm install
npm run dev      # 本地预览  http://localhost:5173
npm run build    # 产出 dist/
npm run preview  # 本地预览 build 产物
```

修改个人内容只需要改一个文件:`src/data/resume.ts`。

把头像、证明材料图片放到 `public/` 下,然后在 `resume.ts` 用 `/avatar.jpg`、`/proof/xxx.jpg` 这样的路径引用。

---

## 部署:Vercel(推荐 · 最简单)

**方式 A:网页部署(零命令)**

1. 把当前 `resume-site/` 目录推到一个 GitHub 仓库
2. 打开 https://vercel.com → 用 GitHub 登录
3. 点 **Add New → Project**,选中你的仓库,**Framework** 会被自动识别为 **Vite**
4. **保持默认设置直接 Deploy**(已经有 `vercel.json` 帮你配好了)
5. 30 秒后拿到 `https://你的项目名.vercel.app`

后续每次 `git push` 都会自动重新部署,PR 还会自动给一个预览链接。

**方式 B:命令行部署**

```bash
npm i -g vercel
vercel login
vercel              # 第一次:跟着提示选 scope / 项目名
vercel --prod       # 部署到生产环境
```

**绑定自己的域名**:Vercel 项目页 → Settings → Domains → 填入域名,按提示加 CNAME / A 记录。

---

## 部署:Cloudflare Pages(免费额度更大、国内速度更稳)

**方式 A:网页部署**

1. 推到 GitHub 仓库
2. 打开 https://dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git
3. 选择仓库,构建配置填:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**:如果整个仓库就是这个项目,留空即可;如果 `resume-site` 是子目录,填 `resume-site`
4. Save and Deploy

`public/_redirects` 和 `public/_headers` 已经帮你配好 SPA 路由回退和缓存策略。

**方式 B:命令行部署(无需 Git)**

```bash
npm i -g wrangler
wrangler login
npm run build
wrangler pages deploy dist --project-name=resume-site
```

**方式 C:GitHub Actions 自动部署**

仓库已带 `.github/workflows/deploy.yml`。在 GitHub 仓库 **Settings → Secrets and variables → Actions** 添加两个 Secret:

| Secret 名 | 怎么拿 |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | Cloudflare Dashboard → My Profile → API Tokens → Create Token,模板选 **Edit Cloudflare Pages** |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare Dashboard 右侧栏的 Account ID |

然后把 `deploy.yml` 里的 `--project-name=resume-site` 改成你在 Pages 创建的项目名,推送 `main` 分支就会自动构建并发布。

---

## 两个平台怎么选

| | Vercel | Cloudflare Pages |
| --- | --- | --- |
| 上手难度 | ⭐⭐⭐⭐⭐ 三步搞定 | ⭐⭐⭐⭐ 略多一步 |
| 国内访问速度 | 一般 | 较好(Cloudflare CDN) |
| 免费额度 | 100GB 流量/月 | 无限流量 + 500 次构建/月 |
| 国内是否墙 | 偶尔抽风 | 域名个别地区会被污染,建议自定义域名 + 国内 DNS |

**个人建议**:第一次发布、想最快看到上线效果,选 **Vercel**。如果是要发给大量国内 HR 看,绑自己的域名 + Cloudflare Pages 体验更好。
