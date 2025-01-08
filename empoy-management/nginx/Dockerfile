FROM nginx
COPY ./nginx-default.conf /etc/nginx/conf.d/default.conf
RUN apt-get update && apt-get install net-tools iputils-ping -y