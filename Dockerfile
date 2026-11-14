FROM nginx:alpine

LABEL org.opencontainers.image.source="https://github.com/WilliansRico/williansrico.dev"

RUN rm -f /etc/nginx/conf.d/default.conf \
    && rm -rf /usr/share/nginx/html
    
COPY site/ /usr/share/nginx/html/

EXPOSE 443