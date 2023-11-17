# LogTowa Frontend

<!-- #region badges -->
[![Quality Gate Status](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_cloud-logger-frontend_AYs6866NPhYnLbS8eM8p&metric=alert_status&token=sqb_5d156e965ad4fe1bb6b2563f262cf9dc268ca7a7)](https://sq.srv.tobiaswaelde.com/dashboard?id=tobiaswaelde_cloud-logger-frontend_AYs6866NPhYnLbS8eM8p)
[![Maintainability Rating](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_cloud-logger-frontend_AYs6866NPhYnLbS8eM8p&metric=sqale_rating&token=sqb_5d156e965ad4fe1bb6b2563f262cf9dc268ca7a7)](https://sq.srv.tobiaswaelde.com/dashboard?id=tobiaswaelde_cloud-logger-frontend_AYs6866NPhYnLbS8eM8p)
[![Security Rating](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_cloud-logger-frontend_AYs6866NPhYnLbS8eM8p&metric=security_rating&token=sqb_5d156e965ad4fe1bb6b2563f262cf9dc268ca7a7)](https://sq.srv.tobiaswaelde.com/dashboard?id=tobiaswaelde_cloud-logger-frontend_AYs6866NPhYnLbS8eM8p)
[![Vulnerabilities](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_cloud-logger-frontend_AYs6866NPhYnLbS8eM8p&metric=vulnerabilities&token=sqb_5d156e965ad4fe1bb6b2563f262cf9dc268ca7a7)](https://sq.srv.tobiaswaelde.com/dashboard?id=tobiaswaelde_cloud-logger-frontend_AYs6866NPhYnLbS8eM8p)
[![Bugs](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_cloud-logger-frontend_AYs6866NPhYnLbS8eM8p&metric=bugs&token=sqb_5d156e965ad4fe1bb6b2563f262cf9dc268ca7a7)](https://sq.srv.tobiaswaelde.com/dashboard?id=tobiaswaelde_cloud-logger-frontend_AYs6866NPhYnLbS8eM8p)
[![Duplicated Lines (%)](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_cloud-logger-frontend_AYs6866NPhYnLbS8eM8p&metric=duplicated_lines_density&token=sqb_5d156e965ad4fe1bb6b2563f262cf9dc268ca7a7)](https://sq.srv.tobiaswaelde.com/dashboard?id=tobiaswaelde_cloud-logger-frontend_AYs6866NPhYnLbS8eM8p)
<!-- #endregion -->

This is the frontend of LogTowa.

### Dashboard
![Dashbard](assets/dashboard.png)

### Logs + Details
![Log Information](assets/log-details.png)

### Logs Filter
![Logs Filter](assets/logs-filter.png)

## Installation
```yml
# docker-compose.yml
version: '3.9'

services:
  logtowa-app:
    container_name: logtowa-app
    image: tobiaswaelde/logtowa-app:latest
    restart: always
    ports:
      - '3000:3000'
    environment:
      APP_TITLE: LogTowa # optional
      API_BASE_URL: http://localhost:3001
      API_TOKEN: secret
      SOCKET_TOKEN: secret
```

## Environment
| Variable     | Description                               | Required | Default Value |
| ------------ | ----------------------------------------- | -------- | ------------- |
| APP_TITLE    | Custom app title.                         | no       | LogTowa       |
| API_BASE_URL | The API URL.                              | yes      |               |
| API_TOKEN    | Token to authenticate API requests.       | yes      |               |
| SOCKET_TOKEN | Token to authenticate socket connections. | yes      |               |