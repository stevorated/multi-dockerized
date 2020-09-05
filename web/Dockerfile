FROM node:alpine
RUN echo "[START]: production build start..."
WORKDIR /application/app
COPY package.json .
RUN yarn
COPY . .
RUN yarn build
RUN echo "[DONE]: production build done"

FROM nginx
EXPOSE 80
COPY --from=0 /application/app/dist /usr/share/nginx/html
RUN echo "[DONE]: ngnix server running in port 80"