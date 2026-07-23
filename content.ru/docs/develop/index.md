---
title: Develop
weight: 4
---

Эта страница описывает границы import и runtime.

# Import Boundary

1. Выполняется trim текста.
2. Если он начинается с `https://`, каждая валидная HTTPS-строка становится subscription entry.
3. Иначе полный текст передается libXray, а приложение сохраняет валидные Outbound models.

Fragment не сохраняется в URL. Обычный import не запускает manual-save Xray config test и не создает Full Config, Raw Json, Xray Profile или GeoData.

# Runtime Boundary

Хранимые node/profile data не являются прямым контрактом процесса Xray-core. Перед запуском OneXray формирует Final Config, применяет Rule/Global/Direct, переписывает runtime-owned fields и сохраняет `xray.json`.

Release работает через platform TUN/VPN. Proxy run mode — внутренний Debug-only инструмент, а не публичная функция или стабильный API.

# Desktop Integration

Жизненный цикл desktop-пакета управляется UI OneXray. Стабильного локального control API для внешних инструментов нет.
