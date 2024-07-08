FROM node:14

# Ustaw katalog roboczy w kontenerze
WORKDIR /app

# Skopiuj plik package.json i package-lock.json do katalogu roboczego
COPY package*.json ./

# Zainstaluj zależności
RUN npm install

# Skopiuj pozostałe pliki do katalogu roboczego
COPY .. .

# Eksponuj port na którym działa aplikacja
EXPOSE 5000

# Domyślne polecenie do uruchomienia aplikacji
CMD ["npm", "start"]
