---
title: 开发
weight: 4
---

本页概述导入与运行时边界。

# 导入边界

UI 导入判定保持简单：

1. 去除文本首尾空白。
2. 若以 `https://` 开头，则把每个有效 HTTPS 行解析为订阅。
3. 否则把完整文本交给 libXray，只保留有效 Outbound model。

订阅 URL 不保存 fragment。通用导入不执行手动保存 Xray 配置时的测试，也不会创建 Full Config、Raw Json、Xray 配置或 GeoData。

# 运行时边界

OneXray 保存的节点/Profile 数据不是 Xray-core 的直接进程契约。启动前 App 会合成最终配置，应用规则/全局/直连模式，修正运行时所有权字段，再写出 `xray.json`。

Release 版本使用平台 TUN/VPN。Proxy run mode 只是内部 Debug 功能，不应被视为公开用户功能或稳定集成 API。

# 桌面集成

桌面包通过 OneXray UI 暴露生命周期操作，不提供供外部工具使用的稳定本机控制 API。
