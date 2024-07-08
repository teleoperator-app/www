## Question

stwórz docke i dockercompose

## Answer

Aby stworzyć konteneryzowaną aplikację za pomocą Docker i Docker Compose, musimy utworzyć plik `Dockerfile` do budowania kontenera dla aplikacji oraz plik `docker-compose.yml` do orkiestracji wielu kontenerów. Będziemy koncentrować się na tworzeniu kontenera dla aplikacji frontendowej React oraz backendowej Express.

### Krok 1: Tworzenie Dockerfile

#### 1. Dockerfile dla aplikacji React.js

Utwórz plik `Dockerfile` w katalogu głównym projektu React.js (np. `monitoring-installer-app`):

```Dockerfile
# Użyj obrazu Node.js jako obraz bazowy
FROM node:14

# Ustaw katalog roboczy w kontenerze
WORKDIR /app

# Skopiuj plik package.json i package-lock.json do katalogu roboczego
COPY package*.json ./

# Zainstaluj zależności
RUN npm install

# Skopiuj pozostałe pliki do katalogu roboczego
COPY .. .

# Build aplikacji React
RUN npm run build

# Użyj obrazu serwera Nginx do serwowania statycznych plików
FROM nginx:stable-alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Eksponuj port 80
EXPOSE 80

# Domyślne polecenie do uruchomienia serwera Nginx
CMD ["nginx", "-g", "daemon off;"]
```

### Krok 2: Tworzenie Dockerfile dla backendu (Express.js)

Załóżmy, że masz już katalog dla backendu o nazwie `backend`. Utwórz plik `Dockerfile` w tym katalogu:

```Dockerfile
# Użyj obrazu Node.js jako obraz bazowy
FROM node:14

# Ustaw katalog roboczy w kontenerze
WORKDIR /app

# Skopiuj plik package.json i package-lock.json do katalogu roboczego
COPY package*.json ./

# Zainstaluj zależności
RUN npm install

# Skopiuj pozostałe pliki do katalogu roboczego
COPY . .

# Eksponuj port na którym działa aplikacja
EXPOSE 5000

# Domyślne polecenie do uruchomienia aplikacji
CMD ["npm", "start"]
```

### Krok 3: Tworzenie docker-compose.yml

Utwórz plik `docker-compose.yml` w katalogu głównym projektu, który będzie zarządzał uruchamianiem obu kontenerów (frontendu i backendu):

```yaml
version: '3'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "80:80"
    depends_on:
      - backend

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
```

### Krok 4: Struktura katalogów

Upewnij się, że Twoje katalogi mają poniższą strukturę:

```
monitoring-installer-app/
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   └── ...inne_pliki_backendu...
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── InstallerList.js
│   │   ├── Marketplace.js
│   │   ├── Dashboard.js
│   │   └── ...
│   ├── App.js
│   ├── App.css
│   └── index.js
├── Dockerfile
├── docker-compose.yml
├── package.json
├── package-lock.json
└── ...inne_pliki_frontendu...
```

### Krok 5: Uruchamianie kontenerów

Zbuduj i uruchom kontenery za pomocą Docker Compose:

```sh
docker-compose up --build
```

### Krok 6: Dalsze opcje

#### 1. **Debugowanie**: Jeśli wystąpią problemy, sprawdź logi za pomocą:

```sh
docker-compose logs
```

#### 2. **Zatrzymywanie kontenerów**:

```sh
docker-compose down
```

### Podsumowanie

Stworzenie plików `Dockerfile` i `docker-compose.yml` umożliwia konteneryzację Twojej aplikacji React.js i backendu Express, co sprawia, że aplikacja staje się bardziej przenośna i łatwa do wdrożenia. Dzięki Docker i Docker Compose możesz uruchomić złożone środowiska wielokontenerowe jedną komendą, co znacznie upraszcza zarządzanie i skalowanie aplikacji.
