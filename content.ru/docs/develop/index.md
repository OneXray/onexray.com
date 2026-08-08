---
title: Develop
weight: 4
---

Эта страница описывает границы import и runtime.

# Import Boundary

1. Выполняется trim текста.
2. Если он начинается с `onexray://`, разбирается каждая валидная OneXray Link.
3. Если он начинается с `https://`, каждая валидная HTTPS-строка становится subscription entry.
4. Иначе полный текст передается libXray, а приложение сохраняет валидные Outbound models.

Fragment не сохраняется в URL. Обычный HTTPS/share-text import не запускает manual-save Xray config test и не создает Full Config, Raw Json, Xray Profile или GeoData. OneXray Links используют отдельные typed import paths.

# OneXray Link Contract

Публичная scheme — `onexray://onexray.com`; поддерживаются только:

```text
/config/add?type=outbound|profile|full|raw&data=<percent-encoded-base64-json>
/sub/add?url=<percent-encoded-https-url>[&age=x25519|hybrid]
/dat/add?type=domain|ip&url=<percent-encoded-https-url>
```

Fragment URL является необязательным display name. Старый `type=setting`, backup import и другие команды отклоняются. Age link описывает тип ключа; получатель создает новую пару и не импортирует secret отправителя.

# Runtime Boundary

Хранимые node/profile data не являются прямым контрактом процесса Xray-core. Перед запуском OneXray формирует Final Config, применяет Rule/Global/Direct, переписывает runtime-owned fields и сохраняет `xray.json`.

Release работает через platform TUN/VPN. Proxy run mode — внутренний Debug-only инструмент, а не публичная функция или стабильный API.

# Desktop Integration

Жизненный цикл desktop-пакета управляется UI OneXray. Windows EXE/winget и Linux DEB регистрируют `onexray://`, ZIP-пакеты — нет. Стабильного локального control API для внешних инструментов нет.
