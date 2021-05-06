#!/bin/sh
set -e

/app/wait-for.sh ${POSTGRES_HOST}:${POSTGRES_PORT}
echo "Postgres is up"

# тут могут быть ваши миграции или другие команды, нужные для запуска
echo "Migration are applied"

echo "Waiting complete. Starting $@"
exec $@