---
title: Subscriptions
weight: 3
---

Subscriptions управляет удаленными источниками Outbound-узлов.

# Поддерживаемый контент

Подписки импортируют только Outbound-узлы. OneXray читает поддерживаемые Xray share links, Clash.Meta YAML или Xray JSON через встроенный libXray API и сохраняет результат как `CoreConfigType.outbound`.

Подписки не импортируют Raw Json, Xray Profile, GeoData, DNS, routing, inbounds, policy, stats, metrics или logs.

# Поведение списка

Страница Subscriptions показывает источники подписок. Для строки подписки доступны refresh, ping, share как HTTPS URL, edit, delete и clean.

При нажатии на подписку открывается список Outbound-узлов этой подписки. Эта страница предназначена для просмотра и управления: нажатие на узел не выбирает его как активный узел Home.

# Восстановление

Backup сохраняет записи подписок и URL, но не строки узлов подписок. При restore OneXray создает записи подписок заново и обновляет URL, чтобы загрузить узлы.

Связанные страницы:

- [Add and Import]({{< relref path="../home/add/index.md" lang="ru" >}})
- [Share]({{< relref path="../share/index.md" lang="ru" >}})
- [Backup and Restore]({{< relref path="../setting/backup/index.md" lang="ru" >}})
