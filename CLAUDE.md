# Albero Frontend

## Stack
- Angular 19
- Apollo Angular 14 (GraphQL)
- Angular Material
- TypeScript

## Deploy
- **Plataforma**: Vercel
- **URL**: tu-frontend.vercel.app
- **Build**: ng build --configuration production

## Configuración importante
- `.npmrc` con `legacy-peer-deps=true` (necesario por incompatibilidad apollo-angular@14 con Angular 19)
- Variables de entorno en `src/environments/environment.production.ts` (hardcodeadas en build, no en runtime)
- `environment.production.ts` apunta a la URL del backend en Render

## Estado actual
- Deploy funcionando en Vercel
- Autenticación conectada al backend

## Repos relacionados
- Backend: github.com/eugemore/albero-backend