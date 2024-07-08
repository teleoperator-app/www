
# [teleoperator.app](www.teleoperator.app) [<span style='font-size:20px;'>&#x270D;</span>](https://github.com/teleoperator-app/www/edit/main/docs/HEAD.md)

![teleoperator-app.png](img/teleoperator-app.png)

## Cel projektu [<span style='font-size:20px;'>&#x270D;</span>](https://github.com/teleoperator-app/www/edit/main/docs/MAIN.md)

Celem projektu jest kompleksowa aplikacja dla instalatorów kamer i systemów monitoringu, producentów oraz klientów końcowych.

---

Aplikacja dla instalatorów kamer i systemów monitoringu, market place dla producentów do tworzenia oferta oraz panel dla klientów do zamawiania produktów i usług oraz rozliczania i supportu. Jak najlepiej wykonać taką aplikację podaj przykład specyfikacji interfejsu.


Przykłady użycia aplikacji:
- klient końcowy szuka instalatora, który pracuje w regionie i wykonuje daną usługę. Klient wybiera z listy dostępne terminy i maksymalny koszt usługi.
- instalator otrzymuje powiadomienie o zleceniu i akceptuje bądź proponuje inne warunki wykonania usługi, lub prosi o dodatkowe dane.
- klient udostępnia fotografie obiektu, opisuje głosowo lub tekstowo oczekiwania,
- instalator warunki wykonania zlecenia, oferuje listę usług oraz produktów z marketplace
- system tworzy umowę dla zleceniodawcy i zleceniobiorcy
- w panelu klienta pojawia się  umowa do akceptacji i zapłaty, status wykonania zlecenia,
- po wykonaniu zlecenia zleceniodawca  otrzymuje zapłatę za usługę i wystawia ocenę dla zlecniodawcy
- zleceniobiorca wystawia ocenę zleceniodawcy


Stworzenie aplikacji, która łączy instalatorów kamer i systemów monitoringu, producentów oraz klientów końcowych, wymaga starannego zaprojektowania zarówno interfejsu użytkownika (UI) jak i funkcjonalności backendu.


### Specyfikacja Interfejsu UI/UX:

#### 1. Strona Główna
- **Menu Główne**: Zakładki takie jak "Znajdź Instalatora", "Produkty", "Moje konto", "Pomoc".
- **Pole Wyszukiwania**: Umożliwiające wyszukiwanie instalatorów lub produktów.
- **Panel Logowania/Rejestracji**: Korzystający z systemu mogą się zalogować, zarejestrować lub odzyskać hasło.

#### 2. Panel Klienta
- **Wyszukiwanie Instalatora**:
    - **Filtry Wyszukiwania**: Lokalizacja, dostępność, recenzje, koszt maksimum.
    - **Lista Instalatorów**: Z profilem, dostępnością terminów, recenzjami i cenn


Profesjonalnie brzmiąca, sugeruje związek z technologią i systemami monitoringu.


Może być myląca, jako że "tele" może kierować myśli w stronę telekomunikacji lub operatorów telewizji kablowej.

## install python [<span style='font-size:20px;'>&#x270D;</span>](https://github.com/teleoperator-app/www/edit/main/docs/INSTALL.md)

Zainstaluj biblioteki Pythona, jeśli jeszcze tego nie zrobiłeś. Możesz to zrobić używając `pip`:

```bash
py -m pip install --upgrade pip
py -m pip install --upgrade setuptools
py -m pip install --upgrade wheel
py -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```

```bash
py -m pip install -r requirements.txt
```

## Question [<span style='font-size:20px;'>&#x270D;</span>](https://github.com/teleoperator-app/www/edit/main/docs/DOCKER.md)

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

 [<span style='font-size:20px;'>&#x270D;</span>](https://github.com/teleoperator-app/www/edit/main/docs/INIT.md)


 [<span style='font-size:20px;'>&#x270D;</span>](https://github.com/teleoperator-app/www/edit/main/docs/STRUCTURE.md)

### Inicjalizacja projektu React.js

1. **Zainstaluj Node.js i npm**: Najpierw upewnij się, że masz zainstalowany Node.js i npm.
2. **Utworzenie nowego projektu React**:
   ```sh
   git clone 
   cd www
   npx create-react-app .   
   npm start
   ```


### Struktura Folderów

```
teleoperator-app/
├── public/
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
├── package.json
└── ...
```

## Techniczne Zasady i Wymagania [<span style='font-size:20px;'>&#x270D;</span>](https://github.com/teleoperator-app/www/edit/main/docs/PLAN.md)
Plan zapewnia pełne pokrycie ważnych funkcjonalności dla wszystkich użytkowników aplikacji, dostosowane do potrzeb instalatorów, producentów oraz klientów końcowych.

- **Backend**: Architektura oparta na mikrousługach, np. RESTful API.
- **Frontend**: Technologie jak React.js, Angular albo Vue.js.
- **Baza Danych**: Relacyjna baza danych jak PostgreSQL lub MySQL.
- **System Powiadomień**: Push notifications, email, SMS.
- **Bezpieczeństwo**: Autoryzacja i uwierzytelnianie przez OAuth2.0, ochrona danych użytkowników, szyfrowanie.
- **Hosting**: Chmura (AWS, Google Cloud, Azure) dla skalowalności i niezawodności.
- **Integracje Płatności**: PayPal, Stripe, tradycyjne przelewy bankowe.

 [<span style='font-size:20px;'>&#x270D;</span>](https://github.com/teleoperator-app/www/edit/main/docs/PANEL.md)
Specyfikacja Interfejsu UI/UX:

#### Strona Główna

- **Menu Główne**: Zakładki takie jak "Znajdź Instalatora", "Produkty", "Moje konto", "Pomoc".
- **Pole Wyszukiwania**: Umożliwiające wyszukiwanie instalatorów lub produktów.
- **Panel Logowania/Rejestracji**: Korzystający z systemu mogą się zalogować, zarejestrować lub odzyskać hasło.

 [<span style='font-size:20px;'>&#x270D;</span>](https://github.com/teleoperator-app/www/edit/main/docs/KLIENT.md)

#### 2. Panel Klienta
- **Wyszukiwanie Instalatora**:
  - **Filtry Wyszukiwania**: Lokalizacja, dostępność, recenzje, koszt maksimum.
  - **Lista Instalatorów**: Z profilem, dostępnością terminów, recenzjami i cennikami usług.
  - **Rezerwacja Terminu**: Kalendarz z wolnymi terminami do rezerwacji.
  - **Opcje Komunikacji**: Formularz do opisu zlecenia tekstowo, oraz możliwość dodania zdjęć obiektu i notatek głosowych.

- **Marketplace**: 
  - **Przeglądanie**: Katalog produktów i usług. 
  - **Szczegóły Produktu**: Opis, specyfikacja, cena, opinie.
  - **Dodanie do Koszyka**: Możliwość zakupu produktów dołączonych do zlecenia.

- **Panel Zamówień i Zleceń**:
  - **Moje Zlecenia**: Lista aktywnych i zakończonych zleceń.
  - **Status Zlecenia**: Krok po kroku, od akceptacji zlecenia, przez realizację, po akceptację końcową.
  - **Umowy i Płatności**: Sekcja do przeglądania umów, wykonywania płatności i monitorowania statusu.

- **Oceny i Recenzje**:
  - **Wystawianie Oceny**: Po zakończeniu zlecenia możliwość ocenienia instalatora.
  - **Podgląd Recenzji**: Możliwość przeglądania wystawionych opinii.


#### 3. Panel Instalatora
- **Dashboard**:
  - **Powiadomienia**: Informacje o nowych zleceniach, wymaganych akcjach, wiadomościach od klientów.
  - **Mój Kalendarz**: Widok dostępnych terminów i zarezerwowanych usług.

- **Zarządzanie Zleceniami**:
  - **Akceptacja/Propozycje Zmian**: Opcje do przyjęcia zlecenia, sugerowania zmian lub żądania dodatkowych danych.
  - **Wysyłanie Ofert**: Wybór produktów i usług z marketplace do załączenia w ofercie.

- **Umowy i Rozliczenia**: 
  - **Podgląd Umowy**: Czytanie, zatwierdzanie i podpisywanie umów.
  - **Statusy Płatności**: Monitorowanie płatności za zlecenia.

- **Oceny Klientów**: 
  - **Wystawianie Oceny**: Możliwość ocenienia klientów po zakończeniu zlecenia.

#### 4. Panel Producenta
- **Dodawanie Produktów**:
  - **Formularz Dodawania**: Formularz do wprowadzania informacji o nowych produktach, w tym opisów, zdjęć, cen, stanów magazynowych.

- **Zarządzanie Ofertami**: 
  - **Edycja Produktów**: Możliwość aktualizacji informacji o istniejących produktach.
  - **Śledzenie Zamówień**: Widok wszystkich zamówień, statusy realizacji.

#### 5. Support i Helpdesk
- **Baza Wiedzy**: Artykuły, FAQ, poradniki.
- **Kontakt**: Formularz kontaktowy, live chat, numer telefonu do wsparcia.

### Przykład Scenariuszy Użycia:

#### Scenariusz 1: Klient szuka instalatora
1. **Klient** loguje się do aplikacji i wybiera opcję "Znajdź Instalatora".
2. **Klient** używa filtrów, aby zawęzić wyszukiwanie do instalatorów działających w jego regionie i posiadających odpowiednie oceny oraz pasujący koszt usługi.
3. **Klient** przegląda profile instalatorów i wybiera interesującego go instalatora.
4. **Klient** rezerwuje dostępny termin w kalendarzu instalatora oraz załącza zdjęcia obiektu i opis wymagań.
5. **Instalator** otrzymuje powiadomienie o nowym zleceniu, przegląda szczegóły i akceptuje zlecenie lub sugeruje zmiany.
6. **System** automatycznie tworzy i przesyła proponowaną umowę do klienta.
7. **Klient** akceptuje umowę i dokonuje płatności przez panel.
8. **Instalator** realizuje zlecenie.
9. **Klient** ocenia instalatora po zakończeniu usługi.
10. **Instalator** ocenia klienta.

#### Scenariusz 2: Producent dodaje nowy produkt
1. **Producent** loguje się do swojego panelu.
2. **Producent** wybiera opcję "Dodaj Produkt".
3. **Producent** wypełnia formularz, dołączając wszystkie niezbędne informacje i zdjęcia.
4. **Produkt** pojawia się w marketplace, gotowy do przeglądania przez klientów i instalatorów.

### Techniczne Zasady i Wymagania:
- **Backend**: Architektura oparta na mikrousługach, np. RESTful API.
- **Frontend**: Technologie jak React.js, Angular albo Vue.js.
- **Baza Danych**: Relacyjna baza danych jak PostgreSQL lub MySQL.
- **System Powiadomień**: Push notifications, email, SMS.
- **Bezpieczeństwo**: Autoryzacja i uwierzytelnianie przez OAuth2.0, ochrona danych użytkowników, szyfrowanie.
- **Hosting**: Chmura (AWS, Google Cloud, Azure) dla skalowalności i niezawodności.
- **Integracje Płatności**: PayPal, Stripe, tradycyjne przelewy bankowe.

Ten plan zapewnia pełne pokrycie ważnych funkcjonalności dla wszystkich użytkowników aplikacji, dostosowane do potrzeb instalatorów, producentów oraz klientów końcowych.

## Panel Instalatora [<span style='font-size:20px;'>&#x270D;</span>](https://github.com/teleoperator-app/www/edit/main/docs/INSTALATOR.md)

- **Dashboard**:
  - **Powiadomienia**: Informacje o nowych zleceniach, wymaganych akcjach, wiadomościach od klientów.
  - **Mój Kalendarz**: Widok dostępnych terminów i zarezerwowanych usług.

- **Zarządzanie Zleceniami**:
  - **Akceptacja/Propozycje Zmian**: Opcje do przyjęcia zlecenia, sugerowania zmian lub żądania dodatkowych danych.
  - **Wysyłanie Ofert**: Wybór produktów i usług z marketplace do załączenia w ofercie.

- **Umowy i Rozliczenia**: 
  - **Podgląd Umowy**: Czytanie, zatwierdzanie i podpisywanie umów.
  - **Statusy Płatności**: Monitorowanie płatności za zlecenia.

- **Oceny Klientów**: 
 - **Wystawianie Oceny**: Możliwość ocenienia klientów po zakończeniu zlecenia.

## Panel Producenta [<span style='font-size:20px;'>&#x270D;</span>](https://github.com/teleoperator-app/www/edit/main/docs/PRODUCENT.md)
- **Dodawanie Produktów**:
  - **Formularz Dodawania**: Formularz do wprowadzania informacji o nowych produktach, w tym opisów, zdjęć, cen, stanów magazynowych.

- **Zarządzanie Ofertami**: 
  - **Edycja Produktów**: Możliwość aktualizacji informacji o istniejących produktach.
  - **Śledzenie Zamówień**: Widok wszystkich zamówień, statusy realizacji.

#### Support i Helpdesk [<span style='font-size:20px;'>&#x270D;</span>](https://github.com/teleoperator-app/www/edit/main/docs/SUPPORT.md)

- **Baza Wiedzy**: Artykuły, FAQ, poradniki.
- **Kontakt**: Formularz kontaktowy, live chat, numer telefonu do wsparcia.

 [<span style='font-size:20px;'>&#x270D;</span>](https://github.com/teleoperator-app/www/edit/main/docs/USECASE.md)
### Przykład Scenariuszy Użycia

#### Scenariusz 1: Klient szuka instalatora

1. **Klient** loguje się do aplikacji i wybiera opcję "Znajdź Instalatora".
2. **Klient** używa filtrów, aby zawęzić wyszukiwanie do instalatorów działających w jego regionie i posiadających odpowiednie oceny oraz pasujący koszt usługi.
3. **Klient** przegląda profile instalatorów i wybiera interesującego go instalatora.
4. **Klient** rezerwuje dostępny termin w kalendarzu instalatora oraz załącza zdjęcia obiektu i opis wymagań.
5. **Instalator** otrzymuje powiadomienie o nowym zleceniu, przegląda szczegóły i akceptuje zlecenie lub sugeruje zmiany.
6. **System** automatycznie tworzy i przesyła proponowaną umowę do klienta.
7. **Klient** akceptuje umowę i dokonuje płatności przez panel.
8. **Instalator** realizuje zlecenie.
9. **Klient** ocenia instalatora po zakończeniu usługi.
10. **Instalator** ocenia klienta.

#### Scenariusz 2: Producent dodaje nowy produkt

1. **Producent** loguje się do swojego panelu.
2. **Producent** wybiera opcję "Dodaj Produkt".
3. **Producent** wypełnia formularz, dołączając wszystkie niezbędne informacje i zdjęcia.
4. **Produkt** pojawia się w marketplace, gotowy do przeglądania przez klientów i instalatorów.

 [<span style='font-size:20px;'>&#x270D;</span>](https://github.com/teleoperator-app/www/edit/main/docs/FOOT.md)


---
+ Modular Documentation made possible by the [FlatEdit](http://www.flatedit.com) project.
