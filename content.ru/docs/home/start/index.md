---
title: Запуск и остановка
weight: 5
---

Кнопка питания внизу Home запускает или останавливает VPN.

# Запуск

OneXray:

1. Читает режим маршрутизации Home.
2. Загружает выбранный Xray Profile или использует Simple Profile.
3. Загружает Outbound, Full Config или Raw Json; Direct не требует узла.
4. Формирует Final Config и применяет Final Outbound.
5. Применяет преобразование Rule, Global или Direct.
6. Записывает runtime `tunIn`, дополнительные inbounds выбранного Profile и `pingIn`, а также случайные порты, metrics, пути GeoData, interface/route и platform fixes.
7. Сохраняет `xray.json` и запускает системный VPN/TUN.

# Смена режима

Смена Rule, Global или Direct при активном подключении выполняет restart: текущий Core останавливается, создается новый Final Config и Core запускается снова. Ошибка stop/start отображается на Home.

# Остановка

Остановка завершает VPN/Core и только затем очищает running state. Выбранный узел остается готовым к следующему запуску Rule или Global.

# Ошибки запуска

| Случай | Значение |
| --- | --- |
| Нет узла | В Rule или Global не выбран узел. |
| Invalid outbound | Узел нельзя преобразовать в Xray outbound. |
| Final Outbound отсутствует или некорректен | Выбранная запись удалена или не является Outbound. |
| Одинаковые узлы | Один локальный Outbound выбран как Home node и Final Outbound. |
| Invalid Raw Json | JSON нельзя нормализовать или использовать для runtime config. |
| Нет зависимости | Global не находит `proxy` или зависимость `dialerProxy`. |
