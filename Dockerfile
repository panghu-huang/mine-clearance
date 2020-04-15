FROM node:11.12.0
WORKDIR /home/mine-clearance
COPY . /home/mine-clearance
RUN yarn config set registry https://registry.npm.taobao.org/
RUN yarn
RUN yarn build
EXPOSE 3001
CMD yarn start