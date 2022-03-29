
## docker инструкции

* Скачать docker клиента по адресу https://www.docker.com/products/docker-desktop/
* Клонировать репозиторий`https://github.com/abdulgalimov/qnextDocs.md` в каталог `docs-src`
* в терминале открыть каталог с проектом `cd <app dir>`
* в терминале в каталоге с проектом выполнить `docker-compose -f docker-compose-dev.yml up --force-recreate --build --exit-code-from core`
