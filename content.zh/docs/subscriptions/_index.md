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

# Age 加密订阅

只有订阅供应商支持 Age 加密时才应填写 **Encryption**，普通订阅请将两个密钥字段留空。

OneXray 支持填写已有密钥对，或生成以下类型：

- X25519
- Mihomo 兼容 Hybrid（`ML-KEM-768 + X25519`）

首次下载与后续刷新时，OneXray 都会通过 `X-Age-Public-Key` 请求头发送已保存的公钥。私钥只保留在设备上，并在本地解密响应。密钥对会持续复用，直到用户替换或清除；订阅 URL 仍必须使用 HTTPS。

解密后的订阅上限为 16 MiB。替换密钥对后，新私钥无法解密针对旧公钥加密的响应。

# 列表行为

订阅可打开、刷新、测速、分享、编辑、清理或删除。订阅节点页复用 Home 的列表与搜索，但点击卡片不会修改 Home 当前节点。

批量导入会跳过自动测速队列，避免大量节点阻塞桌面端。单条导入和正常刷新仍可安排测速。

# 备份恢复

备份保存订阅源记录和 Age 密钥对，但不保存已下载的订阅节点行。恢复后会重新请求各订阅 URL。

备份 ZIP 未加密，可能包含订阅 URL 和 Age 私钥，请按敏感文件妥善保管。
