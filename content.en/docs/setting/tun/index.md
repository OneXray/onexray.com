---
title: Tun Setting
weight: 1
---

Here are some optional configurations for VPN.

# Tun

You can think of the Tun device as a virtual network card. When the VPN is started, the operating system will create a new Tun device to take over all network traffic of the system.

## DNS

There are two DNS configurations here, one IPv4 address and one IPv6 address. Please note that the address does not include the port number. When the VPN is started, these two addresses will be set to the Tun device.

These two DNS addresses will become the default DNS for the system. When other applications initiate DNS queries, the DNS query results they get "seem" to be obtained from these two addresses.
The reason why I say "seem" is that after the DNS query traffic reaches Xray-core, it will be taken over by Xray-core.

The DNS configuration here has another function, which is to resolve your server address.
When `address` in your outbound configuration is in the form of a domain name, the query of the domain name will be executed by the DNS configured here, not the DNS you specified in "Xray Setting".

## Priority

This configuration item is only applicable to Linux systems.

In Linux systems, you will see a "priority" configuration item in the Tun configuration, with a default value of 20. This priority is actually the priority of the Tun device in the routing table.
When the VPN is started, the App will modify the system routing table, which is equivalent to the following two instructions.

```shell
sudo ip route add default dev OneXrayTun metric 20
sudo ip -6 route add default dev OneXrayTun metric 20
```

If you encounter issues with the routing table when using the App in Linux, try modifying the "Priority" configuration.

# Network Interface

This configuration item is only available for Linux and Windows systems.

When VPN is turned on, the app will specify a network card for VPN traffic. You can specify a physical network card yourself.

Please note: When you do not specify a network card, the app will automatically select the first network card that meets the conditions, but it may not always get the right result and it may select the wrong network card.
Especially if you have virtualization software such as Vmware Workstation or VirtualBox installed, they will create several virtual network cards. The app may select these virtual network cards.

# Always-on

This configuration item is only applicable to iOS and macOS systems.

When this configuration item is turned on, the system will automatically start the VPN, regardless of whether the system is restarted or the VPN process is killed.
If you want to turn this option off, please restart the VPN once after turning it off for the option to take effect.

The "Always-on" function of the Android system requires you to turn it on in the system settings. Since the firmware of each brand is different, here is only one operation path:
System "Settings" App ➡️ VPN (it may be in the homepage, network or sharing) ➡️ OneXray ➡️ Always-on VPN.

# Per-app VPN

This configuration item is only applicable to Android systems.

When you need to specify specific apps to use VPN, you can configure this option. After configuration, only those specified apps will be proxied.
If you do not specify any apps, all apps will be proxied.
