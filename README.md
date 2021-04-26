# Тестовое приложение для демонстрации деплоя на сервер

## Содержимое проекта

* `client` — клиентское приложение на React. Подтягивает данные с сервера `http://localhost:5000/api/`
* `server` — серверное приложение, умеет подцепляться к `Postgres`, содержит единственный end (entry) point `/api/`, в качестве результата возвращает `Our deployed project!`

## Запуск

**Серверное приложение:**
```
$ cd ./server
$ node index.js
```
Приложение будет запущено по адресу [http://localhost:5000/api/](http://localhost:5000/api/)


**Клиентское:**
```
$ cd ./client
$ yarn start
```
Приложение будет запущено по адресу [http://localhost:3000/](http://localhost:3000/)