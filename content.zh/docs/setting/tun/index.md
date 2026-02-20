---
title: Tun 设置
weight: 1
---

这里提供一些关于 VPN 的可选配置。

# Tun

Tun 设备，您可以将其理解为一张虚拟网卡。当 VPN 启动时，操作系统将新建一个 Tun 设备，接管系统的所有网络流量。

## DNS

这里有两个 DNS 配置，一个 IPv4 地址和一个 IPv6 地址。请注意，地址不包含端口号。在 VPN 启动时，这两个地址会被设置到 Tun 设备上。

这两个 DNS 地址将成为系统的默认 DNS。当其他应用发起 DNS 查询时，它们得到的 DNS 查询结果“看起来”是从这两个地址得到的。
之所以说“看起来”，因为 DNS 查询流量到达 Xray-core 后，会被 Xray-core 接管。

这里的 DNS 配置还有另外一个作用，就是用来解析您的服务器地址。
当您的节点配置中，`address` 为域名形式时，该域名的查询会交由这里配置的 DNS 去执行，而不是您在“Xray 设置”中指定的 DNS。

### DNS Over TLS

该配置项仅适用于 iOS 和 macOS 系统。

当开启 DoT 时，Xray-core 将不再接管 DNS 流量，但可通过路由配置将 DoT 流量进行分流。可参考路由配置中的 dnsDoT 规则。

注：开启该选项有助于缓解 iOS 上的内存问题，可参考 [iOS packet tunnel provider limit](https://github.com/XTLS/Xray-core/issues/4422) 。

## 优先级

该配置项仅适用于 Linux 系统。

在 Linux 系统中，您会看到 Tun 配置中有一个“优先级”配置项，默认值为 20。这个优先级实际上是 Tun 设备在路由表中的优先级。
当 VPN 启动时，App 会修改系统路由表，其效果等效于下面这两条指令。

```shell
sudo ip route add default dev OneXrayTun metric 20
sudo ip -6 route add default dev OneXrayTun metric 20
```

若您在 Linux 中使用 App 时遇到路由表相关的问题，可尝试修改“优先级”配置。

# 网卡

该配置项仅适用于 Linux 和 Windows 系统。

当 VPN 开启时，App 将为 VPN 流量指定一张网卡。您可自行指定一张物理网卡。

请注意：当您未指定网卡时，App 将自动选择符合条件的第一张网卡，但并不一定总会得到正确的结果，它有可能会选择一张错误的网卡。
尤其是当您安装了 Vmware Workstation 或 VirtualBox 等虚拟化软件时，它们将会创建几张虚拟网卡。App 有可能会选择这些虚拟网卡。

# 按需开启

该配置项仅适用于 iOS 和 macOS 系统。

支持按网卡配置规则。

# 按应用开启

该配置项仅适用于 Android 系统。

当您需要指定特定 App 使用 VPN 时，您可以配置该选项。配置后，只有那些指定的 App 才会被代理。
当您未指定任何 App 时，则所有 App 均会被代理。
