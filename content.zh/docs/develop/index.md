---
title: "开发"
description: "OneXray 当前开发环境、架构合同、打包脚本和贡献入口，避免使用过时的配置模型说明。"
weight: 100
lastmod: 2026-09-09
---

OneXray 使用 Flutter 开发，通过 libXray 接入 Xray-core，并使用各平台 VPN 能力。文档站是独立的 Hugo/Hextra 静态工程。

## 从仓库开始

- [本地开发](https://github.com/OneXray/OneXray/blob/main/readme/FIRST_RUN.zh_CN.md)：工具、原生库、路由数据、代码生成和 Debug 运行。
- [App 合同](https://github.com/OneXray/OneXray/blob/main/docs/README.md)：导航、启动、数据、路由和分享。
- [构建脚本](https://github.com/OneXray/OneXray/blob/main/build_scripts/README.md)：打包与发布边界。
- [Windows 构建](https://github.com/OneXray/OneXray/blob/main/docs/windows-build.md)：EXE/ZIP 和 MSIX。

依赖版本需匹配 App checkout。替换原生库后应完全重启 App，热重载不会加载新的原生代码。

## 运行边界

普通连接由节点选择、智能／自定义规则及 App 平台设置组成。Raw JSON 有独立编译流程。Xray 配置校验以 libXray 为准，通过构建不代表网络可用。

iOS 模拟器仅使用 Swift 内部 SOCKS 适配，不是真实 VPN 验证，也不是面向用户的代理运行模式。

Flutter/Dart 生成、分析和测试应串行执行。实验数据放入 references，破坏性测试不要使用开发者真实配置。

## 参与项目

[提交 Issue](https://github.com/OneXray/OneXray/issues) 时说明平台、分发版本、App/Xray-core 版本及复现步骤，不要上传私密凭据。

[App 源码](https://github.com/OneXray/OneXray) · [网站源码](https://github.com/OneXray/onexray.com) · [Telegram](https://t.me/OneXrayApp)
