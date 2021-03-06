# Trying TODO TS

Preparación de las clases del BootCamp online.

Incorporación de **Firebase** en un proyecto de React para utilizar

-   Autenticación
-   Bases de datos (RealTime Firebase & CloudFirestore)

La **arquitectura** del proyecto incluye 3 grandes bloques

-   **Features**: carpetas da cada una de las features que darán lugar a cada una de las páginas de la aplicación
-   **Infrastructure**: elementos comunes a la aplicación (core)
-   **Layout**: componentes empleados para crear el layout común a todas las páginas

## Infraestructura y layout

-   Componentes básicos de la aplicación

    -   `components/App`, proporciona contexto global al layout y al router, al tiempo que define las rutas de la aplicación
    -   `components/AppRoutes`, crea las rutas de la aplicación cargando de forma lazy la página principal correspondiente a cada una de ellas

-   Componentes genéricos preparados para ser integrados en otros componentes de la aplicación

    -   `components/AppInput`
    -   `components/AppButton`
    -   `components/AppModal`

-   Elementos necesarios para el proceso de autenticación basado en firebase

    -   `services/firebase` con la conexión al SDK de Firebase
    -   `models/user` con el interface de los datos del usuario
    -   `hooks/use.login` con la lógica de los procesos login y logout
        -   En ella se incluye la persistencia de los datos del usuario logado en localStore
        -   `services/local.store` encapsula las conexiones a localStore
    -   `context/context` con el contexto que da acceso a los estados `isLogged` y `userLogged`)
    -   `context/provider` con el provider del anterior, que define los estados)
    -   `components/login`, que incluye el botón para que el usuario desencadene los procesos de login o logout

-   Componentes utilizados en el layout:

    -   `components/layout/layout`
    -   `components/layout/header`
    -   `components/layout/footer`
    -   `components/layout/menu`

### Repositorios: acceso a los datos del backend

Para homogenizar los repositorios se crea un interfaz con los métodos y sus firmas

A partir de el se implementan las clases específicas de los distintos accesos a backend que se utilizarán

-   Http REST
-   RealTime Firebase
-   Cloud Firestore

[ToDo] Testing de los repositorios

## Features

Las distintas features se utilizarán para implementar los diferentes patrones de arquitectura y conexiones al back (Firebase)

-   **Home**: **Contadores**
    -   Ejemplos iniciales del estado de Redux
-   **About**
    -   Utilizada inicialmente para probar las funciones de enrutamiento
    -   Se añade un formulario de contacto para probar componentes genéricos (input, button, modal)
-   **Tasks**
    -   Uso del contexto para almacenar el estado
    -   Uso de un custom hook para la lógica de la feature
    -   Uso de una instancia del repositorio RTFirebase para almacenas la lista de tareas
-   **Recipes**
    -   Uso del patrón Redux completo (react-redux / redux-toolkit)
    -   En el Store se almacenan dos ramas de estado diferentes (recetas e ingredientes), correspondientes a dos reducers
    -   La lógica de la feature se guarda en componentes "monolítico" para la lista de recetas y la lista de ingredientes
    -   Se usa una instancia del repositorio CFirestore para almacenar listas de recetas e ingredientes
-   **Notes**
    -   [ToDo] Uso del patrón Flux/Redux basado en hooks nativos de react

## Enrutamiento

# Instalación y componentes iniciales

## Instalación

1.  Scaffolding del proyecto con **Create React App** y el template de **Typescript**

    ```shell
    create react app <project> --template typescript

    ```

    Incluye la instalación de

        - **Typescript**
        - **Jest** (sin que figure como dependencia directa) / **Testing Library**
        - **ESLint** (sin que figure como dependencia directa), con las extensiones "react-app" y "react-app/jest"

    ### Dependencias

    `typescript: 4.7.3`,
    `@types/node`
    `web-vitals`

    `react: 18.1.0`,
    `react-dom: 18.1.0`,
    `react-scripts`
    `@types/react`
    `@types/react-dom`

    `@types/jest`:
    `@testing-library/jest-dom`
    `@testing-library/react`
    `@testing-library/user-event`

    ### Configuración de TS

2.  Editor Config

3.  Plugin de Prettier para ESLint

    ```shell
    npm i -D eslint-config-prettier
    ```

    -   En la configuración de **ESLint** en el _package.json_ (`"eslintConfig"`) se añade la extensión de Prettier

    ```json
    "extends": ["...", "prettier"]
    ```

    -   En la configuración de **Prettier** en el _package.json_ (`"prettier"`) se configura el uso de comillas simples

    ```json
    "singleQuote": true
    ```

## Componentes iniciales

-   carpeta app
    -   componente app: <Layout> + <Páginas> (más adelante con el router)
-   carpeta /layout
    -   components: layout - header - footer - menu
    -   interfaces: menu-options
-   carpeta features/home
    -   pages: HomePage

### Uso de module.css

-   Añadir Globals.d.ts en la carpeta sources
    ```ts
    declare module '*.module.css';
    declare module '*.module.scss';
    ```

### Testing

Se configura para estos test iniciales
Parámetros en el script de npm:

```json
"test": "react-scripts test --watchAll --collect-coverage"
```

Se testa: app - layout - header - footer - menu
Ficheros a excluir:

-   src/index.tsx
-   src/reportWebVitals.js

```json
"coveragePathIgnorePatterns": ["index.tsx", "reportWebVitals.js"]
```

## Home Page

Components (counters): counter, counter-clicks, counter-states

### Testing

Test completos de la página y los componentes

## Firebase

[Consola](https://console.firebase.google.com/?pli=1)

usuario: alejandro.cerezo@skylab.com

### Crear un proyecto

Nombre del proyecto: <todo-react>
Organización: <isdi.es>
ID: <alce65-todo-react>
No habilitar Analytics

### Proyecto todo-react

Inicio: Agregar firestore a tu app

-   Android
-   iOS
-   **Web**
-   Unity
-   Flutter

Opciones disponibles

-   Authentication (++)
-   Cloud Firestore
-   RealTime Database (++)
-   Storage
-   Functions ...

### Registrar aplicación Web

Nombre: <Todo-App>
No configurar Firebase Hosting

Agrega el SDK de Firebase

```shell
npm i firebase
```

Datos para el fichero de inicialización `firebase.ts`

Los valores personales se trasladan a un fichero .env
Este fichero debe quedar excluido en el .gitignore
Para ser usadas en React, las variables deben denominarse REACT_APP...

    -   REACT_APP_APIKEY
    -   REACT_APP_AUTHDOMAIN
    -   REACT_APP_DB=
    -   REACT_APP_PID=
    -   REACT_APP_SB=
    -   REACT_APP_SID=
    -   REACT_APP_APPID=
    -   REACT_APP_MID=

# Autenticación. Contexto, persistencia y custom hook

## Autenticación con Firebase

Agrega método(s) de acceso y comenzar a utilizar Firebase Auth

-   Google
-   GitHub ...

### Google

Nombre público del proyecto: alce65-todo-react
Correo electrónico de asistencia del proyecto: alejandro.cerezo@skylabcoders.com

Comprobar "Dominios autorizados"

### Github

[Registra tu app](https://github.com/settings/applications/new) como aplicación de desarrollador en GitHub y obtén el ID de cliente y el Secreto de cliente de OAuth 2.0.

## Contexto

Se crea un contexto para la aplicación (`AppContext`) con su correspondiente Provider
Este último se utiliza como wrapper en App

En el contexto se incluye y se exporta un estado (`isLogged`) y su setter (`setIsLogged`)

## Componente login

Inicialmente se crea con **Google** como proveedor.
Se añade un botón con la capacidad de login / logout

El estado manipulado desde este componente corresponde al creado en el contexto.

Se incorpora el componente en el header (layout/header) para que sea renderizado.

### Test del componente login

Se crea un mock del módulo de Firebase,
Se le suministra al componente un contexto con los datos adecuados para el test.

## LocalStore service

Se encapsula en un servicio genérico las operaciones con localStorage.

Se le asigna un tipo genérico T para luego poder manejar ese tipo o arrays del mismo

-   `getItem(): T` / `getItems(): T[]`
-   `setItem(T)` / `setItems(T[])`
-   `removeItems()`

## Persistencia en el login

Se añade al contexto un nuevo estado y su setter (`userLogged` / `setUserLogged`).

Se refactoriza el componente Login para que utilice el estado recién creado.

Se añade persistencia al login,

-   guardando los datos del estado en `localStorage` después de hacer login
-   leyendo los datos del `localStorage` al iniciar, para actualizar el estado con los datos del usuario logado, en caso de que existan

### Logout

Se realiza a tres niveles

    -   se ejecuta el método `singOut` de Firebase
    -   se borran los datos del estado correspondientes al usuario
    -   se eliminan los datos el el `localStorage`

## Refactorización: custom Hook

Antes se define en Git la versión 1

El estado se mantiene en el contexto, de forma que puede ser compartido por los distintos componentes

> Custom Hooks are a mechanism to reuse stateful logic (such as setting up a subscription and remembering the current value), but every time you use a custom Hook, all state and effects inside of it are fully isolated.

En nuestro caso, la lógica en el **custom hook** es responsable de interaccionar con `localStorage` y Firebase para gestionar los procesos de login/logout. Al inicio del hook y al final de sus procesos se setean también los estados recibidos desde el contexto

# Enrutamiento. Features Tasks y About. Repositorios de Firebase

## Enrutamiento (Routing)

Se instala en modulo de `react-router-dom`

```shell
npm i react-router-dom
```

La App, o la pare de ella que debe enrutar se envuelve en el componente **Router**

```jsx
import { BrowserRouter as Router } from 'react-router-dom';

<Router>...</Router>;
```

### Rutas lazy

Se crea un componentes Routes que se instancia en App

En Routes se definen los componentes virtuales (`Home`, `Tasks`, `About`...), que de forma lazy harán el import condicional de los componentes Page desde sus correspondientes módulos

Se definen las rutas correspondientes a cada unos de eses "componentes virtuales"

```jsx
<Route
    path={menuOptions[n].path}
    element={
        <React.Suspense>
            <Component />
        </React.Suspense>
    }
></Route>
```

Se modifican los enlaces del menu utilizando en lugar de <a> el componente <Link> de react-router-dom

### Test de las Rutas lazy

Los test se pueden realizar en App, que incluye AppRoutes, o, de forma más correcta en este último.

Se utiliza MemoryRouter para poder darle valorees al enrutador al instanciarlo

```jsx
<Router initialEntries={entries} initialIndex={0}>
    <AppRoutes menuOptions={menuOptions}></AppRoutes>
</Router>
```

Los test son asíncronos, para permitir la carga lazy de las rutas.

## Firebase RealTime Database

Se crea una **Realtime Database** en la consola de Firebase

-   Ubicación: Bélgica
-   Habilitar

DBName: alce65-todo-react-default-rtdb (añadir en .env: REACT_APP_DB)
DBRegion: europe-west1 (añadir en .env: REACT_APP_DBR)
DbUrl: https://alce65-todo-react-default-rtdb.europe-west1.firebasedatabase.app/

Se modifica el servicio de inicialización de Firebase `firebase.ts`

-   se importa `getDatabase` desde `'firebase/database'`;
-   se ejecuta `getDatabase` pasándole como argumento la app de **Firebase**

### Servicio de acceso a los datos

Se crea el interface para los servicios de acceso a datos (repositorios)

```TS
    getAllItems: () => Promise<Array<T>>;
    getItem: (id: T['id']) => Promise<T>;
    addItem: (item: T) => Promise<T>;
    updateItem: (item: Partial<T>) => Promise<T>;
    deleteItem: (id: T['id']) => Promise<R>;
```

Se crea un nuevo servicios de acceso general a datos de la **Realtime Database**
(`RTFirebase`) basado en la clase **Repository<T, R>** con los métodos

```TS
-   getAllItems(): Promise<Array<T>>
-   getItem(dataID: string): Promise<T>
-   setItem(dataID: string, data: T): Promise<void>
-   addItem(data: T): Promise<T>
-   updateItem(dataID: string, data: Partial<T>): Promise<T>
-   deleteItem(dataID: string): Promise<R>
```

## Nuevas páginas (features): About

Páginas y componentes

-   Se añade la carpeta correspondiente en features (e.g. about)
-   Se añade la carpeta de la página about/page
-   Se crea en ella el componente about con su css.module y su test

Rutas

-   Se añade la definición de la ruta lazy al app.routes

```ts
const About = React.lazy(() => import('../../../features/about/pages/about'));
```

-   Se añade la ruta

```jsx
<Route
    path={menuOptions[n].path}
    element={
        <React.Suspense>
            <Component />
        </React.Suspense>
    }
></Route>
```

Opciones del menú y de la aplicación

Se añade la entrada en la lista de opciones definida en el componente App

## Componentes de input genérico

En el componente correspondiente a un input genérico

-   se parametrizan las características del input
-   entre ellas se incluye la información del formulario que lo incluirá:
    -   setFormState
    -   setValidState
    -   formRef
-   se define su estado local, que será manejado en el handle de onChange
-   en el handleBlur se gestiona la validación del campo de acuerdo con sus restricciones basadas en los atributos HTML5

### Test del componente

Para testar el componente, al ser totalmente genérico y parametrizado, se incluye en el test un componente para las pruebas, con un formulario que consume el input genérico

### Implementación: formulario de contacto

Para termina de probar de forma realista el input genérico, se crea un componente con un formulario que lo consume con el tipo _text_ y el tipo _email_

Se comprueba el funcionamiento de la validación

Se añade un botón submit que cuyo manejador da al usuario un sencillo feedback de la información suministrada

## Componente genérico button

Children con el texto que mostrara el botón
Propos con las diferentes opciones posibles; en muchas casos opcionales y con un valor por defecto.

### Testing

De nuevo, al ser totalmente genérico y parametrizado, se incluye en el test un componente para las pruebas que consume el button genérico.

## Componentes y contexto para la feature Tasks

Se usa el esquema de tres componentes habitual en las listas con CRUD

-   List
-   Add
-   Task

Se necesita definir el estado correspondiente a la lista y los procesos del CRUD.

-   Lo primero será un nuevo contexto con el estado
    -   tasks
    -   isLoading, para diferenciar el proceso de carga
-   Lo segundo, un custom hook responsable de las operaciones, que será el único que acceda directamente al contexto
    -   getContext
    -   loadTasks
    -   addTask
    -   completeTask
    -   deleteTask

### Testing components

### Modificación del componente add como add/edit

En el contexto se añade un estado con la tarea a editar (taskToEdit) y su setter (setTaskToEdit), siendo sus valores posibles una tarea o null.

El custom Hook (useTask) accede a este nuevo estado y lo exporta junto con un método capaz de setearlo.

Tanto en task como en addOrEdit se accede a este estado:

-   el botón de editar en task setea el estado con la tarea a editar
-   el formulario de adOrEdit carga los datos de la tarea para que sean editados.
-   el botón añadir/guardar del formulario distingue entre los dos procesos
-   en caso de guardar, se utiliza el correspondiente método del hook que envía los datos al api y actualiza toso los estados necesarios

### Testing componentes

Se modifican los tests de acuerdo con los cambios y se añaden los necesarios para las nuevas situaciones

## Firebase Cloud Firestore

Se crea una **Cloud Firestore** en la consola de Firebase

-   Ubicación: Bélgica
-   Habilitar

Se modifica el servicio de inicialización de Firebase `firebase.ts`

-   se importa `getFirestore` desde `'firebase/firestore'`;
-   se ejecuta `getFirestore` pasándole como argumento la app de **Firebase**

Se crea un nuevo servicios de acceso general a datos de la **Cloud Firestore** (`CFirestore`)
basado en la clase **Repository<T>** con los métodos

```TS
-   getAllItems(): Promise<Array<T>>
-   getItem(dataID: string): Promise<T>
-   addItem(data: T): Promise<T>
-   updateItem(dataID: string, data: Partial<T>): Promise<T>
-   deleteItem(dataID: string): Promise<R>
```

## Componente genérico modal

## Uso del modal en un componente about/ContactForm

# Feature Recipes con React-Redux

## Instalación de react-redux

## Reducer básico, Store y Provider

## Acciones y reducer

# E2E Testing

## Cypress Installation

```shell
npm i cypress eslint-plugin-cypress -D
```

En la configuaración del ESLint en package.json se añade

```json
    "plugins": [
        "cypress"
    ],
    "env": {
        "cypress/globals": true
    }
```

Se añade npm script

```json
"e2e": "cypress open"
```

Para probar los test de ejemplo se ejecuta el script
Normalmente habrá que permitir el acceso al firewall que pueda haber en el equipo

El GUI para la configuración añade al proyecto los ficheros necesarios
A continuación permite elegir el navegador
Finalmente es posible generar una serie de ejemplos o un

## Test writing and running
