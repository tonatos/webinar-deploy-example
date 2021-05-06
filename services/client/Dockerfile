ARG NODE_VERSION

# Step 1
FROM node:${NODE_VERSION}-alpine as builder
LABEL maintainer="vitaly_d@jetstyle.ru"

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL ${REACT_APP_API_URL}

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn

COPY . ./
RUN yarn build

# Step 2
FROM node:${NODE_VERSION}-alpine as production

WORKDIR /app

COPY --from=builder /app/build ./build
RUN yarn global add local-web-server

CMD [ "ws", "--directory", "./build" ]
EXPOSE 3000