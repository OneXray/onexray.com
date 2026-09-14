---
title: "VPN Tunnel по задаче"
description: "Платформенные требования превращаются в действия интерфейса, не в выдуманные поля импорта."
weight: -20
ai_order: 100
lastmod: 2026-09-14
---

VPN Tunnel независим от outbound/Custom/Raw. Ответ должен указывать платформу/пакет, страницу, опцию, значение, причину, переподключение и проверку.

Уточните iOS, macOS App Store, OneXraySE, Android, Windows EXE/ZIP, Windows MSIX или Linux. «Настольная версия» недостаточно.

## Таблица решений

| Требование | Настройка | Граница |
| --- | --- | --- |
| Внутренние имена | Local DNS маршрута + чистое direct-domain правило | Не только DNS туннеля |
| Системный DNS туннеля | Дополнительно → VPN Tunnel → DNS | IP нужного семейства; имя Apple DoT не search domain |
| Исходящий адаптер | Windows/Linux → Xray outbound interface | Явный выбор по имени; Raw не переопределяет |
| Только некоторые приложения | Android system VPN → Only selected apps | Раздельные include/exclude списки, не localOS |
| Wi-Fi connect/disconnect | Apple → Always on off → On-demand on → SSID | Точные имена, без пересечения списков |
| Cellular/Ethernet | Cellular на iOS, Ethernet на macOS | Платформенные опции |
| Полный обход VPN подсетью | Apple с Capture all traffic off; Windows MSIX exclusions | Системный маршрут раньше Xray; не предлагайте эту страницу для EXE/Linux |
| Полный захват Apple | Capture all traffic | Проверить исключения и предупреждение о недоступной сети |

## DNS/IPv6

В VPN Tunnel адреса TUN только для чтения. DNS по умолчанию: 8.8.8.8, 2001:4860:4860::8888, dns.google. Имя — только для Apple DNS over TLS.

Для другого DoT нужны согласованные IP и имя сертификата. DoH URL не помещается в поле IPv4. На платформах без эффекта имени менять его незачем. DNS маршрута и Raw независимы.

Use IPv6 управляет туннелем/запросами, не универсальной блокировкой IPv6. MSIX сохраняет свою реализацию. Сохраните; эффективные изменения активного туннеля требуют переподключения. Restore defaults меняет черновик, который нужно сохранить.

## Wi-Fi Apple

1. Дополнительно → VPN Tunnel → Apple system VPN.
2. Always on выключить, On-demand включить.
3. Точный домашний SSID добавить в disconnect; в connect — только явно запрошенные сети.
4. Отдельно выбрать действие cellular на iOS или Ethernet на macOS.
5. Сохранить и проверить сменой сети.

Неуказанный Wi-Fi сохраняет текущее поведение, а не «подключаться везде кроме дома». Always on использует on-demand, не supervised Always On VPN и не непреодолимый kill switch.

## Android

Выберите Only selected apps, затем хотя бы одно установленное приложение по имени/пакету. All except selected apps хранит другой список. Значки помогают различать приложения. Сохраните, при необходимости переподключите; к попавшему в туннель трафику далее применяются правила.

localOS: ["android"] не выбирает пакет Android, а относится ко всему Core на этой ОС.

## Windows/Linux

Откройте список исходящих интерфейсов и выберите реальный интернет-адаптер. Отметка текущего интернет-интерфейса — подсказка, не автоматический выбор. Loopback и TUN OneXray исключены.

Сохраняется имя, перед запуском проверяется наличие. Пропавший адаптер выбирается заново, без автоматического fallback. Оба Windows-пакета привязывают Xray, не VCore. При активном VPN — Save and reconnect.

## Bypass и direct

Xray direct сначала проходит через туннель и обработку Core; системное исключение обходит Xray раньше. Для LAN discovery или другого VPN-клиента уточните нужное поведение. Ни один вариант не создаёт split DNS автоматически.

Исключённые сети Apple действуют при Capture all traffic off. Четыре исключения-переключателя видны только при полном захвате. Без конкретной причины оставляйте значения по умолчанию: неверные параметры могут сделать сеть недоступной.

Подробности: [Apple]({{< relref "/docs/advanced/apple" >}}), [Android]({{< relref "/docs/advanced/android" >}}), [Windows]({{< relref "/docs/advanced/windows" >}}), [общий туннель]({{< relref "/docs/advanced/vpn-tunnel" >}}).
