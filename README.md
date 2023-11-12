# LogTowa Frontend

<!-- #region badges -->
<!-- [![Quality Gate Status](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_cloud-logger-backend_AYs1m5fJPhYnLbS8eM75&metric=alert_status&token=sqb_3d39e1d1780a89e4556a708c98085dad1933e598)](https://sq.srv.tobiaswaelde.com/dashboard?id=tobiaswaelde_cloud-logger-backend_AYs1m5fJPhYnLbS8eM75)
[![Maintainability Rating](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_cloud-logger-backend_AYs1m5fJPhYnLbS8eM75&metric=sqale_rating&token=sqb_3d39e1d1780a89e4556a708c98085dad1933e598)](https://sq.srv.tobiaswaelde.com/dashboard?id=tobiaswaelde_cloud-logger-backend_AYs1m5fJPhYnLbS8eM75)
[![Security Rating](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_cloud-logger-backend_AYs1m5fJPhYnLbS8eM75&metric=security_rating&token=sqb_3d39e1d1780a89e4556a708c98085dad1933e598)](https://sq.srv.tobiaswaelde.com/dashboard?id=tobiaswaelde_cloud-logger-backend_AYs1m5fJPhYnLbS8eM75)
[![Vulnerabilities](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_cloud-logger-backend_AYs1m5fJPhYnLbS8eM75&metric=vulnerabilities&token=sqb_3d39e1d1780a89e4556a708c98085dad1933e598)](https://sq.srv.tobiaswaelde.com/dashboard?id=tobiaswaelde_cloud-logger-backend_AYs1m5fJPhYnLbS8eM75)
[![Bugs](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_cloud-logger-backend_AYs1m5fJPhYnLbS8eM75&metric=bugs&token=sqb_3d39e1d1780a89e4556a708c98085dad1933e598)](https://sq.srv.tobiaswaelde.com/dashboard?id=tobiaswaelde_cloud-logger-backend_AYs1m5fJPhYnLbS8eM75)
[![Duplicated Lines (%)](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_cloud-logger-backend_AYs1m5fJPhYnLbS8eM75&metric=duplicated_lines_density&token=sqb_3d39e1d1780a89e4556a708c98085dad1933e598)](https://sq.srv.tobiaswaelde.com/dashboard?id=tobiaswaelde_cloud-logger-backend_AYs1m5fJPhYnLbS8eM75) -->
<!-- #endregion -->

> [!WARNING]  
> This project is still in development. It will be usable as soon as it reaches v1.x

This is the frontend of LogTowa.

## Environment
| Variable          | Description                               | Required | Default Value |
| ----------------- | ----------------------------------------- | -------- | ------------- |
| VITE_APP_TITLE    | Custom app title.                         | no       | LogTowa       |
| VITE_API_BASE_URL | The API URL.                              | yes      |               |
| VITE_API_TOKEN    | Token to authenticate API requests.       | yes      |               |
| VITE_SOCKET_TOKEN | Token to authenticate socket connections. | yes      |               |