# Тестовое приложение для демонстрации деплоя на сервер

## Содержимое проекта

* `client` — клиентское приложение на React. Подтягивает данные с сервера `http://localhost:5000/api/`
* `server` — серверное приложение, умеет подцепляться к `Postgres`, содержит единственный end (entry) point `/api/`, в качестве результата возвращает `Our deployed project!`

## Создание виртуальной машины

Подробная документация по созданию LXD-контейнера на Yellow-сервере находится в нашей [вики](https://wiki.jetstyle.in/display/YEL/Sites+and+LXD), тут приведен упрощенный и краткий справочник команд. Предполагается, что у вас есть доступ на хост машину Yellow (есть пользователь и прописаны публичные ключи), в противном случае, необходимо попросить выполнить эти операции тимлида.

```
# создаем lxd-контейнер
lxc launch ubuntu2004-docker CONTAINER_NAME -p default -p docker

# создаем nginx конфиг для нашего проекта на основе шаблона
sudo cp /etc/nginx/sites/.template /etc/nginx/sites/HOST_NAME.nginx

# редактируем шаблон и заменяем все {site_name} и {container_name} 
# на соответствующие значение: HOST_NAME (хост будет вида HOST_NAME.yellow.jetstyle.ru)
# и CONTAINER_NAME
sudo nano /etc/nginx/sites/HOST_NAME.nginx

# перезапускаем nginx, чтобы применить конфиг
sudo systemctl reload nginx

# Выясняем последний номер занятого порта
lxd-proxy-list-py | tail -n 1

# Пробрасываем ssh-тоннель до lxd контейнера. Вместо CONTAINER_NAME — имя контейнера,
# вместо EXT_PORT — последний номер порта + 1
lxc config device add CONTAINER_NAME sshproxy proxy listen=tcp:0.0.0.0:EXT_PORT connect=tcp:0.0.0.0:22 bind=host

# Создаем сетевое правило для iptables
sudo iptables -A TCP -p tcp -m tcp --dport EXT_PORT -j ACCEPT

# Прописываем свой ssh-ключ на lxd-контейнере
lxc exec deploy-example --user=1001 -T -- bash -c 'echo "YOUR_SSH_PUB_KEY" >> ~/.ssh/authorized_keys'
```

Где:
* `CONTAINER_NAME` — название вашего LXD-контейнера, slug для проекта
* `HOST_NAME` — хост, по которому будет доступен ваш проект в интернете (адрес будет вида `https://HOST_NAME.yellow.jetstyle.ru`)

В конечном итоге, ваш сайт будет доступ:
* по http на адресе `https://HOST_NAME.yellow.jetstyle.ru`
* по ssh `ssh -p EXT_PORT jetadmin@yellow.jetstyle.ru`


## Запуск в режиме разработки

Для начала, инициализируем файл с переменными окружения:
```bash
ln -s ./environments/dev.env .env
```

**Серверное приложение:**
```bash
$ docker-compose up -d postgres # поднимаем БД
$ cd ./service/server
$ node index.js
```
Приложение будет запущено по адресу [http://localhost:5000/api/](http://localhost:5000/api/)


**Клиентское:**
```
$ cd ./service/client
$ yarn start
```
Приложение будет запущено по адресу [http://localhost:3000/](http://localhost:3000/)

## Запуск в режиме {stage|prod} окружения

```bash
$ ln -s ./environments/{stage|prod}.env .env
$ docker-compose up -d
```