FROM node:14

# Ustaw katalog roboczy w kontenerze
WORKDIR /app

# Skopiuj plik package.json i package-lock.json do katalogu roboczego
COPY package*.json ./

# Zainstaluj zależności
RUN npm install

# Skopiuj pozostałe pliki do katalogu roboczego
COPY src .

# Build aplikacji React
RUN npm run build

# Domyślne polecenie do uruchomienia serwera Nginx
CMD ["nginx", "-g", "daemon off;"]
