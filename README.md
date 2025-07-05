# Explorador de países

Una aplicación web interactiva desarrollada con Next.js que permite explorar una lista de países, buscar por nombre, filtrar por región y ver detalles específicos de cada nación.

## Demo

Para ver la aplicación ingresar al siguiente link https://6868c03aa8173c0078c6a31f--strong-lolly-4bc778.netlify.app/

## Características

* **Lista de países:** Muestra una cuadrícula de todas los países.
* **Búsqueda por nombre:** Filtra países en tiempo real a medida que el usuario escribe.
* **Filtro por región:** Permite seleccionar una región para ver solo los países de esa área. Las opciones de región se generan dinámicamente desde los datos de la API.
* **Detalles del país:** Información detallada como capital, población, región, subregión, monedas, idiomas y países fronterizos.
* **Diseño responsivo:** Interfaz completamente adaptada para funcionar y verse bien tanto en dispositivos móviles como en escritorios.
* **Estados de carga y error:** Proporciona retroalimentación visual durante la carga de datos (skeletons) y muestra mensajes amigables en caso de errores o si no se encuentran resultados.

## Decisiones técnicas clave

### 1. Arquitectura y estructura del proyecto

El proyecto sigue una estructura modular y escalable, organizando el código en las siguientes capas:

* `src/app/`: Contiene las rutas de la aplicación (usando el App Router de Next.js 13+).
* `src/components/`: Componentes reutilizables de UI (`CountryCard`, `SearchFilter`).
* `src/components/ui/`: Componentes UI genéricos y atómicos (`Input`, `Select`, `Button`, `SkeletonCard`).
* `src/hooks/`: Custom Hooks de React para encapsular lógica con estado y reutilizarla (`useCountries`).
* `src/lib/api/`: Servicios para interactuar con la API `Rest Countries API`.
* `src/types/`: Definiciones de tipos con TypeScript para asegurar la consistencia de los datos.

Esta organización facilita la mantenibilidad, la escalabilidad y la colaboración en el proyecto.

### 2. Next.js y estrategia de renderizado

Para este proyecto, se ha elegido principalmente **Client-Side Rendering (CSR)** para las vistas interactivas (la página principal de listado y filtros, y la página de detalles de país).

* **`'use client'` directiva:** Se utiliza la directiva `'use client'` al inicio de los componentes que requieren interactividad del lado del cliente (manejo de estado, eventos de usuario, hooks como `useState`, `useEffect`).
* **Razonamiento del CSR:**
    - Interactividad en tiempo real
    - Flexibilidad de la API
    - Reducción de carga del servidor

### 3. Manejo de estado en react

El estado de la aplicación se gestiona de forma eficiente utilizando los **Hooks nativos de React** (`useState`, `useEffect`, `useCallback`, `useMemo`).

* El **`useCountries` hook** centraliza la lógica de obtención de datos, manejo de estados de carga/error y aplicación de filtros, proporcionando una interfaz limpia a los componentes de UI. Esto permite que los componentes se centren únicamente en cómo renderizar la información, delegando la complejidad del fetching al hook.
* El uso de `useCallback` y `useMemo` optimiza el rendimiento al memorizar funciones y valores calculados, evitando re-renderizados innecesarios.

### 4. UI/UX y Tailwind CSS

* **Diseño:** La interfaz de usuario se inspira en una estética limpia, profesional y moderna, caracterizada por:
    - Layout limpio y espacioso
    - Jerarquía tipográfica fuerte
    - Paleta de colores sutil
    - Sombras y bordes 

* **Responsividad:** El uso de clases utilitarias de Tailwind CSS garantiza que la interfaz se adapte perfectamente a diferentes tamaños de pantalla, desde dispositivos móviles hasta escritorios.
* **Atención al detalle:** Se incluyen animaciones de transición, estados de `hover` para interactividad y estados de `focus` para accesibilidad, proporcionando una experiencia de usuario pulida.

### 5. Buenas prácticas en el manejo de errores

    * Las llamadas a la API están encapsuladas en bloques `try...catch` para manejar fallos de red o respuestas inesperadas.
    * La aplicación distingue entre un error de la API y la ausencia de resultados (ej. "País no encontrado"), mostrando mensajes de usuario apropiados y controlando el estado de la UI para evitar que se "rompa".
    * Se muestra un mensaje claro al usuario si no se pudieron cargar los datos o si una búsqueda no devuelve resultados.

## Cómo instalar y ejecutar el proyecto localmente?

### Prerrequisitos

Tener instalado

* Node.js (versión 18.x o superior recomendada)
* npm (viene con Node.js) o Yarn

### Pasos de instalación

1.  **Clonar el repositorio**

    ```bash
    git clone https://github.com/dcastrillonc/explorador-propiedades.git
    cd explorador-propiedades
    ```

2.  **Instalar dependencias**
    Navegar al directorio del proyecto y ejecutar el siguiente comando para instalar todas las dependencias:

    ```bash
    npm install
    # o si usas Yarn
    # yarn install
    ```

### Ejecutar el proyecto

Una vez que las dependencias estén instaladas, iniciar el servidor de desarrollo.

```bash
npm run dev
# o si usas Yarn
# yarn dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador para ver la página web.
