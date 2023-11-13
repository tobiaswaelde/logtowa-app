# LogTowa Frontend

<!-- #region badges -->
[![Quality Gate Status](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_cloud-logger-frontend_AYs6866NPhYnLbS8eM8p&metric=alert_status&token=sqb_5d156e965ad4fe1bb6b2563f262cf9dc268ca7a7)](https://sq.srv.tobiaswaelde.com/dashboard?id=tobiaswaelde_cloud-logger-frontend_AYs6866NPhYnLbS8eM8p)
[![Maintainability Rating](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_cloud-logger-frontend_AYs6866NPhYnLbS8eM8p&metric=sqale_rating&token=sqb_5d156e965ad4fe1bb6b2563f262cf9dc268ca7a7)](https://sq.srv.tobiaswaelde.com/dashboard?id=tobiaswaelde_cloud-logger-frontend_AYs6866NPhYnLbS8eM8p)
[![Security Rating](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_cloud-logger-frontend_AYs6866NPhYnLbS8eM8p&metric=security_rating&token=sqb_5d156e965ad4fe1bb6b2563f262cf9dc268ca7a7)](https://sq.srv.tobiaswaelde.com/dashboard?id=tobiaswaelde_cloud-logger-frontend_AYs6866NPhYnLbS8eM8p)
[![Vulnerabilities](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_cloud-logger-frontend_AYs6866NPhYnLbS8eM8p&metric=vulnerabilities&token=sqb_5d156e965ad4fe1bb6b2563f262cf9dc268ca7a7)](https://sq.srv.tobiaswaelde.com/dashboard?id=tobiaswaelde_cloud-logger-frontend_AYs6866NPhYnLbS8eM8p)
[![Bugs](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_cloud-logger-frontend_AYs6866NPhYnLbS8eM8p&metric=bugs&token=sqb_5d156e965ad4fe1bb6b2563f262cf9dc268ca7a7)](https://sq.srv.tobiaswaelde.com/dashboard?id=tobiaswaelde_cloud-logger-frontend_AYs6866NPhYnLbS8eM8p)
[![Duplicated Lines (%)](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_cloud-logger-frontend_AYs6866NPhYnLbS8eM8p&metric=duplicated_lines_density&token=sqb_5d156e965ad4fe1bb6b2563f262cf9dc268ca7a7)](https://sq.srv.tobiaswaelde.com/dashboard?id=tobiaswaelde_cloud-logger-frontend_AYs6866NPhYnLbS8eM8p)
<!-- #endregion -->

> [!WARNING]  
> This project is still in development. It will be usable as soon as it reaches v1.x

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
      VITE_APP_TITLE: LogTowa # optional
      VITE_API_BASE_URL: http://localhost:3001
      VITE_API_TOKEN: secret
      VITE_SOCKET_TOKEN: secret
```

## Environment
| Variable          | Description                               | Required | Default Value |
| ----------------- | ----------------------------------------- | -------- | ------------- |
| VITE_APP_TITLE    | Custom app title.                         | no       | LogTowa       |
| VITE_API_BASE_URL | The API URL.                              | yes      |               |
| VITE_API_TOKEN    | Token to authenticate API requests.       | yes      |               |
| VITE_SOCKET_TOKEN | Token to authenticate socket connections. | yes      |               |