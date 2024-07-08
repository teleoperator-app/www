# Nginx do serwowania statycznych plików
FROM nginx:stable-alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Eksponuj port 80
EXPOSE 80

# Domyślne polecenie do uruchomienia serwera Nginx
CMD ["nginx", "-g", "daemon off;"]
