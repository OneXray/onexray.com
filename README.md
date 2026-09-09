# OneXray 文档站

基于 Hugo Extended 与 Hextra 的静态产品首页和使用文档。包含英语、简体中文、俄语，不需要应用后端。

## 内容结构

- `content.en/`、`content.zh/`、`content.ru/`：三种语言保持相同页面路径。
- 各语言 `_index.md`：独立产品首页，介绍连接、智能路由、自定义路由、Raw JSON、平台能力和下载。
- `docs/`：安装、首次连接、升级说明，以及连接／服务器／高级／设置四个产品入口。
- `docs/privacy/`：App 使用的 HTTPS 隐私政策；此入口保持有效。
- `static/images/screenshots/`：本轮替换为 26.9.1 实际运行图，来自 App README 与 appStore v3 成品。
- `hugo.toml`、`i18n/`、`layouts/`：主题、多语言、搜索与 SEO；`assets/css/custom.css` 只保留少量首页样式。

本轮按 `OneXray` 的 `v26.8.4..f3c5863a` 共 11 个主线提交重写，以最终代码行为为准，不把随后删除的中间功能写成现有能力。旧页面直接删除，不保留 alias、旧链接或重定向。

## 内容依据

- App 的 `README.md`、`readme/FIRST_RUN.*.md` 与 `docs/` 中当前有效的功能定义。
- App 页面、ARB 文案、系统权限、配置编译和平台实现。
- `appStore/store/` 的当前商店文案；审核专用测试链接不发布到文档站。

重点保持这些边界一致：普通导入只提取节点；完整配置走 Raw/Custom；流量仅显示本次连接；不再提供备份恢复、旧 Profile/Full Config；MSIX 与 EXE/ZIP 的权限、数据目录和退出行为不同。

Wintun 的来源和分发许可入口保留在三种语言的致谢页。不要把“无分析服务”描述成“没有任何网络请求”，或把平台排除设置误写为所有流量都必然经过 VPN。

## 本地预览

需要 Hugo Extended（最低版本见 `hugo.toml`）与 Go。Hextra 版本由 `go.mod` / `go.sum` 固定，不需要 npm 构建步骤。

```shell
hugo server --bind 127.0.0.1 --port 1313 --disableFastRender --renderToMemory
```

英语 `/`，中文 `/zh/`，俄语 `/ru/`。不要将开发服务器暴露到公网。

## 构建与核对

```shell
hugo --gc --minify --cleanDestinationDir
git diff --check
```

`public/` 是生成产物，不手工编辑。发布时替换整个输出目录，避免部署端残留已删除的旧页面。无需保留旧 URL。

修改内容后核对：三语路径一致、站内链接和图片存在、首页与目录可用、搜索可以找到新文档，以及 canonical、hreflang、描述、Open Graph、sitemap 正确。不要提交本地预览地址、审核凭据或验证产物。

验证脚本、下载资料与临时证据放在已忽略的 `references/`，不作为网站页面。
