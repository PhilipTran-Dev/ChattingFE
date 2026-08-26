# Stage 1: Build React
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
# Cài đặt bỏ qua kiểm tra xung đột peer và tắt telemetry/audit
RUN npm install --legacy-peer-deps --no-audit --no-fund

COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]