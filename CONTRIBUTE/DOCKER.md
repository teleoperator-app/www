## Uruchamianie kontenerów

Pliki `Dockerfile` i `docker-compose.yml` umożliwiaj konteneryzację aplikacji React.js (src) i backendu Express, co sprawia, że aplikacja staje się bardziej przenośna i łatwa do wdrożenia. 
Dzięki Docker i Docker Compose możesz uruchomić złożone środowiska wielokontenerowe jedną komendą, co znacznie upraszcza zarządzanie i skalowanie aplikacji.



```sh
cd backend
docker build -t .
```


```sh
cd ..
```

```sh
cd src
docker build .
```

### Zbuduj i uruchom kontenery za pomocą Docker Compose:

```sh
docker compose up --build
```

### Debugowanie
Jeśli wystąpią problemy, sprawdź logi za pomocą:

```sh
docker compose logs
```

### Zatrzymywanie kontenerów

```sh
docker compose down
```


If you need your build to connect to services running on the host, you can use the special host-gateway value for --add-host. In the following example, build containers resolve host.docker.internal to the host's gateway IP.
```sh
docker build --add-host host.docker.internal=host-gateway .
```
