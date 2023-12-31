# CoinFlip (Нетранзитивная Орлянка)

## Описание

CoinFlip - это интерактивное веб-приложение, предназначенное для демонстрации концепции нетранзитивности в игре с подбрасыванием монетки. Пользователи могут задать длину последовательности (N) и количество итераций для симуляции, чтобы исследовать вероятности победы различных перестановок в игре.

## Особенности

- Генерация всех перестановок длины N из Орла и Решки.
- Симуляция подбрасывания монетки для каждой пары перестановок.
- Вычисление и отображение вероятностей победы для каждой перестановки.
- Интерактивный пользовательский интерфейс с возможностью настройки параметров симуляции.

## Технологии

- HTML
- CSS
- JavaScript
- Web Workers для асинхронных вычислений

## Установка и запуск

1. Склонируйте репозиторий:

```bash
git clone https://github.com/osovv/coinflip.git
```

2. Откройте `index.html` в вашем браузере.

## Использование

1. Введите желаемую длину последовательности (N) в соответствующее поле.
2. Введите количество итераций для симуляции.
3. Нажмите кнопку "Посчитать" для начала симуляции.
4. Результаты будут отображены в виде таблицы вероятностей после завершения вычислений.
