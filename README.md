# Nerja actividades

Aplicacion estatica para ir guardando actividades, playas, comidas y notas de las vacaciones en Nerja.

## Como usarla

Abre `index.html` en el navegador. La app guarda los cambios en este dispositivo usando `localStorage`, asi que puedes anadir ideas, marcarlas como hechas, poner favoritas y editar notas sin instalar nada.

## Verla desde el iPhone

La forma comoda es publicarla con GitHub Pages. Este repositorio ya incluye el workflow `.github/workflows/pages.yml`.

1. Sube los cambios a GitHub en la rama `main`.
2. En GitHub, entra en `Settings` > `Pages`.
3. En `Build and deployment`, elige `GitHub Actions`.
4. Espera a que termine la accion `Deploy GitHub Pages`.
5. Abre esta URL desde Safari:

```text
https://daviddel28.github.io/vacaciones_nerja/
```

En Safari puedes tocar `Compartir` > `Anadir a pantalla de inicio` para usarla como app.

Si quieres probarla como PWA instalable, sirve la carpeta con un servidor local:

```bash
python3 -m http.server 8000
```

Despues abre `http://localhost:8000`.
