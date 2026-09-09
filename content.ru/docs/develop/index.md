---
title: "Разработка"
description: "Актуальная настройка OneXray, архитектурные контракты, сценарии сборки и участие в проекте."
weight: 100
lastmod: 2026-09-09
---

OneXray — Flutter-приложение с Xray-core через libXray и платформенными VPN-интеграциями. Сайт — отдельный статический проект Hugo/Hextra.

## Начните с репозитория

- [Локальная разработка](https://github.com/OneXray/OneXray/blob/main/readme/FIRST_RUN.ru.md): инструменты, нативные библиотеки, данные, генерация и Debug.
- [Контракты приложения](https://github.com/OneXray/OneXray/blob/main/docs/README.md): навигация, запуск, данные, маршруты и обмен.
- [Сборка](https://github.com/OneXray/OneXray/blob/main/build_scripts/README.md): пакеты и публикация.
- [Windows](https://github.com/OneXray/OneXray/blob/main/docs/windows-build.md): EXE/ZIP и MSIX.

Ревизии зависимостей должны соответствовать App checkout. После замены нативных библиотек полностью перезапустите приложение; hot reload их не обновляет.

## Границы выполнения

Обычный режим объединяет выбор серверов, умные/собственные правила и настройки платформы. Raw JSON компилируется отдельно. Корректность конфигурации определяет libXray; успешная сборка не доказывает доступность сети.

iOS Simulator использует внутреннюю адаптацию SOCKS в Swift. Это не реальный VPN-тест и не публичный режим прокси.

Команды Flutter/Dart выполняйте последовательно. Экспериментальные данные храните в references; не используйте настоящую базу разработчика для разрушительных тестов.

## Участие

В [Issue](https://github.com/OneXray/OneXray/issues) укажите платформу, издание, версии App/Xray-core и шаги воспроизведения. Не публикуйте приватные учётные данные.

[Исходники приложения](https://github.com/OneXray/OneXray) · [Исходники сайта](https://github.com/OneXray/onexray.com) · [Telegram](https://t.me/OneXrayApp)
