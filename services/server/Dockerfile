ARG NODE_VERSION

FROM node:${NODE_VERSION}-alpine
LABEL maintainer="vitaly_d@jetstyle.ru"

WORKDIR /app

COPY . ./
ADD https://raw.githubusercontent.com/eficode/wait-for/master/wait-for ./wait-for.sh
RUN chmod +x ./docker-entrypoint.sh ./wait-for.sh

RUN npm install

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD [ "node", "./index.js" ]
EXPOSE 5000
