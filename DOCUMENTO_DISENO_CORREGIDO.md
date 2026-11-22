# Documento de Diseño Corregido — FoKo (Avance 70%)

## 1. Requerimientos Funcionales (Local-First)
- **RF1 (100%):** Registrar una nueva tarea (título, descripción, fecha límite) en el almacenamiento local del dispositivo.
- **RF2 (100%):** Marcar o desmarcar una tarea existente como completada o pendiente en tiempo real.
- **RF3 (100%):** Eliminar una tarea del almacenamiento local.
- **RF4 (100%):** Filtrar dinámicamente las tareas almacenadas por estado (Todas, Pendientes, Completadas) y búsqueda por texto.
- **RF5 (UI lista / Lógica pendiente):** Registrar y marcar hábitos diarios en almacenamiento local independiente.
- **RF6 (Parcial - Tareas integradas):** Visualizar el porcentaje de avance diario en el Dashboard.

## 2. Wireframes en Tres Páginas (Uno por Pantalla)
1. **Pantalla 1: Dashboard / Tablero (`src/app/pages/dashboard/dashboard.page.ts`)**
2. **Pantalla 2: Gestión de Tareas + Modal (`src/app/pages/tareas/tareas.page.ts`)**
3. **Pantalla 3: Hábitos Diarios (`src/app/pages/habitos/habitos.page.ts`)**

## 3. Instrucciones de Compilación (APK con Capacitor / Ionic)
```bash
npm install
ionic build
npx cap add android
npx cap sync android
cd android && ./gradlew assembleDebug
```
El archivo compilado se ubicará en: `android/app/build/outputs/apk/debug/app-debug.apk`.
