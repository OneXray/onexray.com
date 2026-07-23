---
title: 订阅
weight: 3
---

订阅是远程 Outbound 节点源。

# 支持内容

OneXray 通过 libXray 解析受支持的 Xray 分享链接、Clash / Mihomo YAML 和 Xray JSON，只保存有效 Outbound。

订阅不会创建 Full Config、Raw Json、Xray 配置、GeoData、DNS、routing、inbound、log、policy、stats 或 metrics 记录。

# 添加与批量导入

独立添加页接收一个 HTTPS URL。通用文本/文件/剪贴板导入可批量添加订阅，条件是去除首尾空白后的文本以 `https://` 开头，且每行一个链接。

URL fragment 用作初始名称，但不会保存到 URL：

```text
https://example.com/sub#工作
```

保存 URL 为 `https://example.com/sub`，名称为“工作”。下载接收超时为 60 秒。

# 列表行为

订阅可打开、刷新、测速、分享、编辑、清理或删除。订阅节点页复用 Home 的列表与搜索，但点击卡片不会修改 Home 当前节点。

批量导入会跳过自动测速队列，避免大量节点阻塞桌面端。单条导入和正常刷新仍可安排测速。

# 备份恢复

备份保存订阅源记录，不保存已下载的订阅节点行。恢复后会重新请求各订阅 URL。
