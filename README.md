# PaginaPokemones

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.11.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


# Creación de la pagina WEB de Pokémones
En este trabajo se abordara la cracion de la pagina web que tendra como objetivo tener usuarios y poder ver los diferentes pokemones que alberga esta.


## Creación de servicios generales de Pokemones

Este servicio se creo para controlar las peticiones hacia los pokemones del api que se creó en laravel usando el comando npm generate service pokemon a continuación se describen los métodos para acceder a los pokemones del api.

La url usada para acceder a los pokemones del API es la siguiente: 'http://127.0.0.1:8000/api/pokemons'

```javascript
import { HttpClient } from '@angular/common/http'; // Importa HttpClient para hacer solicitudes HTTP.
import { Injectable } from '@angular/core'; // Importa el decorador Injectable para que el servicio sea inyectado.
import { BehaviorSubject, map, Observable } from 'rxjs'; // Importa BehaviorSubject, map y Observable de RxJS.

@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible de forma global en la aplicación.
})
export class PokemonService {

  private apiUrl = 'http://127.0.0.1:8000/api/pokemons'; // URL de la API para interactuar con los Pokémon.

  constructor(private http: HttpClient) { } // Inyecta HttpClient para hacer solicitudes HTTP.

  // Método para obtener todos los Pokémon desde la API
  getPokemons(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe( // Realiza una solicitud GET para obtener todos los Pokémon
      map(response => response.pokemons) // Mapea la respuesta para obtener solo el array de Pokémon
    );
  }

  // Método para buscar un Pokémon por nombre
  buscarPokemon(nombre: any): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/buscar/${nombre}`).pipe( // Realiza una solicitud GET para buscar un Pokémon por nombre
      map(response => response.pokemons) // Extrae los Pokémon de la respuesta
    );
  }

  // Método para eliminar un Pokémon por ID
  eliminarPokemon(id: any) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`); // Realiza una solicitud DELETE para eliminar un Pokémon
  }

  // Método para editar un Pokémon
  editarPokemon(pokemon: any) {
    return this.http.put<any>(`${this.apiUrl}/${pokemon.id}`, pokemon); // Realiza una solicitud PUT para editar los datos de un Pokémon específico
  }

  // Método para agregar un nuevo Pokémon
  agregarPokemon(pokemon: any) {
    return this.http.post<any>(this.apiUrl, pokemon); // Realiza una solicitud POST para agregar un nuevo Pokémon
  }
}
```

#### getpokemons
Este método sirve para obtener todos los pokemones que hay en el API para esto realiza una petición get a la URL del API posteriormente se mapea el resultado para obtener solo la lista de los pokemones ya que la api retorna también el mensaje de éxito el cual no interesa, finalmente se retorna la lista de los pokemones.

```javascript
 getPokemons(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.pokemons)
    );
  }
```

#### bsucarPokemon
Este método recibe un nombre y realiza una petición get, al URL de la API se le concatena la palabra buscar y el nombre a buscar, finalmente con pipe se accede a la lista de pokemones y lo retorna.

```javascript
 buscarPokemon(nombre: any): Observable<any[]> {
    return this.http.get<any>(this.apiUrl+'/buscar/'+nombre).pipe(
      map(response => response.pokemons)
    );
  }
```

#### eliminarPokemon
Este método recobe el id de un pokemon y sirve para eliminar un pokemon en base al id de este, para esto realiza una petición delete al API y a la URL se le concatena un ”/” mas el id del pokemon a eliminar.

```javascript
  eliminarPokemon(id: any){
    return this.http.delete<any>(this.apiUrl+'/'+id);
  }
```

#### editarPokemon
Este método sirve para editar un pokemon para lo cual recibe un JSON con los datos del pokemon a editar, para esto realiza una petición put al API y a la URL se le concatena el id del pokemon a editar el cual se encuentra en el JSON de los datos del pokemon y también a la petición se le pasan todos los datos del pokemon los cuales se van a editar.

```javascript
  editarPokemon(pokemon:any){
    return this.http.put<any>(this.apiUrl+'/'+pokemon.id,pokemon);
  }
```

#### agregarPokemon
Este método sirve para agregar un pokemon a la API para lo cual recibe un json con los datos del pokemon a a agregar, para esto realiza una petición post al API al cual se le pasa el json con los datos del pokemon.

```javascript
  agregarPokemon(pokemon:any){
    return this.http.post<any>(this.apiUrl,pokemon);
  }
```

## Creación de los servicios generales de usuarios

Este servicio sirve para acceder a los datos del API de los usuarios, tinee el mismo funcionamiento y los mismos metedotos que el servicio de pokemon y funcionan de la misma maenra, la unica diferencia es que esta enfocados a los usuarios del API asis mismo para acceder a los usuarios del API se usa la siguiente URL 'http://127.0.0.1:8000/api/usuarios'.

```javascript
import { Injectable } from '@angular/core'; // Importa el decorador Injectable para que el servicio pueda ser inyectado en otros componentes o servicios.
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; // Importa HttpClient para hacer solicitudes HTTP y HttpErrorResponse para manejar errores HTTP.
import { Observable, BehaviorSubject, throwError } from 'rxjs'; // Importa Observable para manejar flujos de datos, BehaviorSubject para el estado del usuario y throwError para manejar errores.
import { catchError, map } from 'rxjs/operators'; // Importa operadores de RxJS para manejar flujos de datos y errores.

@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible de forma global en la aplicación, sin necesidad de especificar un módulo.
})
export class GeneralService {
  private apiUrl = 'http://127.0.0.1:8000/api/usuarios'; // URL de la API para acceder a los usuarios.
  private currentUserSubject = new BehaviorSubject<any | null>(null); // Estado del usuario actual, inicialmente es null.

  constructor(private http: HttpClient) {} // Inyecta HttpClient para hacer solicitudes HTTP.

  // Método para obtener usuarios desde la API
  getUsers(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe( // Realiza una solicitud GET a la API
      map(response => response.usuarios), // Extrae los usuarios del objeto de respuesta
      catchError(this.handleError) // Maneja cualquier error que ocurra en la solicitud
    );
  }
  
  // Método alternativo para obtener usuarios (sin manejo de errores)
  getUsers2(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.usuarios) // Extrae los usuarios de la respuesta
    );
  }

  // Método para eliminar un usuario
  deleteUser(userId: any) {
    return this.http.delete<any>(`${this.apiUrl}/${userId}`).pipe( // Realiza una solicitud DELETE para eliminar el usuario
      map(response => response.usuarios) // Extrae la lista de usuarios de la respuesta
    );
  }

  // Método para buscar un usuario por nombre
  buscarUsuario(nombre: any): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/buscar/${nombre}`).pipe(); // Realiza una solicitud GET para buscar usuarios por nombre
  }

  // Método para guardar los datos del usuario autenticado
  setCurrentUser(user: any): void {
    this.currentUserSubject.next(user); // Actualiza el estado del usuario actual
  }

  // Método para obtener los datos del usuario autenticado
  getCurrentUser(): Observable<any | null> {
    return this.currentUserSubject.asObservable(); // Devuelve un Observable con el estado del usuario actual
  }

  // Método para actualizar los datos de un usuario
  updateUser(userId: string, updatedData: any): Observable<any> {
    const url = `${this.apiUrl}/${userId}`; // Crea la URL para actualizar el usuario específico
    return this.http.put<any>(url, updatedData).pipe( // Realiza una solicitud PUT para actualizar el usuario
      map(response => response.usuario), // Extrae los datos del usuario actualizado de la respuesta
      catchError(this.handleError) // Maneja cualquier error en la solicitud
    );
  }
  
  // Método para manejar errores HTTP
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error desconocido'; // Mensaje de error por defecto
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`; // Extrae el mensaje de error si es del lado del cliente
    } else {
      // Error del lado del servidor
      errorMessage = `Error código ${error.status}: ${error.message}`; // Extrae el código de estado y mensaje si es del servidor
    }
    console.error(errorMessage); // Imprime el mensaje de error en la consola
    return throwError(() => new Error(errorMessage)); // Lanza un error para que lo maneje quien haya llamado al servicio
  }

  // Método para registrar un nuevo usuario
  registerUser(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, userData).pipe(); // Realiza una solicitud POST para registrar un nuevo usuario
  }
}
```

## Componente pokemones 
Este componente contiene una tabla la cual se usa para mostrar la lista de los pokemones que hay en la API, desde aqui se puede buscar, agregar pokemones, editar, ver y eliminar pokemones asi tambien cuenta con una paginacion.

Para el funcionamiento en el typeScript están detallados las siguientes variables:
La variable data almacena los pokemones que se muestran en la tabla.
La variable selectedPokemon almacena al pokemon que fue seleccionado en la tabla.
La isInformacionOpen, isEditarOpen, isEliminarOpen, isAgregarOpen sirven para validar si se muestran las ventanas modales respectivamente o no.
Page size indica la cantidad de pokemones que se muestra en la tabla.
CurrentPage indica la pagina actual de la paginación.
paginatedData sirve para filtrar los pokemones que se mostrara la la página.
Buscar es la variable que almacene el texto escrito en la entrada de buscar.

```javascript
  data: any[] = []; 
  selectedPokemon: any = null; 
  isInformacionOpen = false;
  isEliminarOpen = false;
  isEditarOpen = false;
  isAgregarOpen = false;
  pageSize = 5;
  currentPage = 1;
  paginatedData = this.data.slice(0, this.pageSize);
  buscar = "";
```

Así también se encuentran los siguientes métodos que sirven para el funcionamiento del programa.
Este método se ejecuta al inicio de la carga de la pagina lo que hace es acceder al método getPokemons del servicio de pokemones para obtener la lista de pokemones y guardarlos en data, posteriormente se ejecuta el método updatePaginatedData.

```javascript
  ngOnInit(): void {
    this.pokemonservice.getPokemons().subscribe(resultado =>{
      this.data = resultado;
      this.updatePaginatedData();
    })
  }
```

Este método sirve para actualizar la paginación de la tabla modifica la cantidad de paginas a mostrar y modifica los pokemones que se muestran en la tabla, este se debe ejecutar cada que se modifique la cantidad de pokemones del api.

```javascript
  updatePaginatedData(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedData = this.data.slice(startIndex, endIndex);
  }
```

Los siguientes metodos sirven para controlar las ventanas modales, openModal sirve para controlar cuando se abre un modal para esto recibe un pokemon y lo guarda en selectedPokemon despues cambia el estado de la variable isOpen a true para que se abra la ventana  modal, los metodos closModal ponene en null la variable selectedPokemon y cambian el estado de isOpen a false para que se cierre el modal.

```javascript
  openModalInformacion(pokemon: any) {
    this.selectedPokemon = pokemon;
    this.isInformacionOpen = true;
  }

  closeModalInformacion() {
    this.selectedPokemon = null;
    this.isInformacionOpen = false;
  }

  openModalEditar(pokemon: any) {
    this.selectedPokemon = pokemon;
    this.isEditarOpen = true;
  }

  closeModalEditar() {
    this.selectedPokemon = null;
    this.isEditarOpen = false;
  }

  openModalEliminar(pokemon: any) {
    this.selectedPokemon = pokemon;
    this.isEliminarOpen = true;
  }

  closeModalEliminar() {
    this.selectedPokemon = null;
    this.isEliminarOpen = false;
  }

  openModalAgregar() {
    this.isAgregarOpen = true;
  }

  closeModalAgregar() {
    this.selectedPokemon = null;
    this.isAgregarOpen = false;
  }
```
El siguiente metodo  sirve para agregar un pokemon para lo cual recibe un pokemon el cual es un objeto con los datos del pokemon y llama al metodo agregarPomeon del servicio de pokemones al cual se pasa el pokemon que se agregar finalmente ejecuta ngOnInit para actualizar la tabla y aparezca el pokemon agregado. Si la api devuelve un error encontnces lo imprime en consola.

```javascript
  agregarPokemon(pokemon: any){
    this.pokemonservice.agregarPokemon(pokemon).subscribe(() => {
      console.log('Pokémon agregado');
      this.closeModalAgregar();
    }, (error) => {
      console.error('Error al agregar el Pokémon:', error);
    });
  }
```

Este metodo elimina un pokemon para lo cual recibe un objetos con los datos del pokemon a eliminar, llama al metodo eliminarPokemon que se encuentra en el servicio de pokemones y pasa solo el id del pokemon a eliminar, despues llama a ngOnInir para actualizar los datos de la tabla. Si hay un error en la API lo imprime 

```javascript
 eliminarPokemon(pokemon: any) {
    this.pokemonservice.eliminarPokemon(pokemon.id).subscribe(() => {
      this.ngOnInit();
      this.updatePaginatedData(); 
      this.closeModalEliminar();
    }, (error) => {
      console.error('Error al eliminar el Pokémon:', error);
    });
  }
```
Este metodo sirve para editar un pokemon para lo cual recibe un objeto con los datos a editar del pokemon, para esto llama al metodo editarPokemon del servicio de pokemon y pasa al objeto de pokemon para finalmente actualizar la tabla con ngOnInit, si hay un erro lo imprime en consola.

```javascript
 
  editarPokemon(pokemon: any) {
    this.pokemonservice.editarPokemon(pokemon).subscribe(() => {
      console.log('Pokémon ditado');
      this.ngOnInit();
    }, (error) => {
      console.error('Error al editar el Pokémon:', error);
    });
  }
```

El siguiente metodo sirve se usa para que el usuario pueda elejir la cantidad de pokemones que se muestren en la tabla, esto se controla con un dezplegable en el HTML en donde se puede elejir diferentes cantidades de paginas, cada que cambia se ejecuta este metodo que actualiza los pokemones que se muestran.


```javascript
 numeroPokemons(event: any): void {
    this.pageSize = parseInt(event.target.value, 10);
    this.currentPage = 1;
    this.updatePaginatedData();
  }

```

Los siguientes metodos controlan cuando se da clic en cambiar la pagina de tabla de los pokemones, con nextPage se pasa a la pagina siguiente y con previous page se para a la oagiuna anterior.

```javascript
nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedData();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedData();
    }
  }
```

El html de la tabla esta compuesto de la siguiente manera:


```html
<div class="pokedex-container">
  <!-- Contenedor principal de la Pokédex -->

  <div class="pokedex-header">
    <!-- Encabezado de la Pokédex -->
    <h1>Pokédex</h1>
  </div>

  <div class="pokedex-buscar">
    <!-- Sección de búsqueda y botón para agregar Pokémon -->
    <input type="text" [(ngModel)]="buscar" class="" 
           placeholder="Ingrese el nombre a buscar" 
           style="border-radius: 5px; color: black; padding: 5px; width: 50%;">
    <!-- Campo de texto enlazado al modelo 'buscar' para filtrar Pokémon -->
    <button (click)="buscarPokemon()" 
            style="margin-left: 20px; background-color:cornflowerblue; border-radius: 5px; padding: 5px;">
      Buscar
    </button>
    <!-- Botón que activa la búsqueda de Pokémon -->
    <button (click)="openModalAgregar()" 
            style="margin-left: 20px; background-color:cornflowerblue; border-radius: 5px; padding: 5px;" 
            class="">
      Agregar
    </button>
    <!-- Botón que abre el modal para agregar un nuevo Pokémon -->
  </div>

  <div class="pokedex-table">
    <!-- Tabla que muestra la lista de Pokémon -->
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Avatar</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let pokemon of paginatedData">
          <!-- Itera sobre los datos paginados para mostrar cada Pokémon -->
          <td>{{ pokemon.id }}</td>
          <!-- Muestra el ID del Pokémon -->
          <td>{{ pokemon.nombre }}</td>
          <!-- Muestra el nombre del Pokémon -->
          <td>
            <div class="centrado">
              <img class="avatar mx-auto" src="{{pokemon.avatar}}" alt="">
            </div>
            <!-- Muestra la imagen (avatar) del Pokémon -->
          </td>
          <td>
            <!-- Botones para interactuar con cada Pokémon -->
            <button class="accion" (click)="openModalInformacion(pokemon)">
              <img src="iconos/busqueda.png" alt="">
            </button>
            <!-- Botón para abrir el modal de información -->
            <button class="accion" (click)="openModalEditar(pokemon)">
              <img src="iconos/lapiz.png" alt="">
            </button>
            <!-- Botón para abrir el modal de edición -->
            <button class="accion" (click)="openModalEliminar(pokemon)">
              <img src="iconos/borrar.png" alt="">
            </button>
            <!-- Botón para abrir el modal de eliminación -->
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Modales para mostrar, editar, agregar y eliminar Pokémon -->
  <app-informacion 
    [data]="selectedPokemon" 
    [isOpen]="isInformacionOpen" 
    (close)="closeModalInformacion()">
  </app-informacion>
  <!-- Modal de información, recibe el Pokémon seleccionado y su estado -->

  <app-eliminar 
    [data]="selectedPokemon" 
    [isOpen]="isEliminarOpen" 
    (close)="closeModalEliminar()" 
    (confirmar)="eliminarPokemon($event)">
  </app-eliminar>
  <!-- Modal de eliminación, recibe el Pokémon seleccionado y emite un evento para confirmar -->

  <app-editar 
    [data]="selectedPokemon" 
    [isOpen]="isEditarOpen" 
    (close)="closeModalEditar()" 
    (confirmar)="editarPokemon($event)">
  </app-editar>
  <!-- Modal de edición, recibe el Pokémon seleccionado y emite un evento para confirmar -->

  <app-agregar 
    [isOpen]="isAgregarOpen" 
    (close)="closeModalAgregar()" 
    (confirmar)="agregarPokemon($event)">
  </app-agregar>
  <!-- Modal para agregar un nuevo Pokémon -->

  <div class="pokedex-pagination" (change)="numeroPokemons($event)">
    <!-- Controles de paginación -->
    <select id="paginas" name="paginas">
      <!-- Selector para elegir el número de elementos por página -->
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </select>
    <button (click)="previousPage()" [disabled]="currentPage === 1">Anterior</button>
    <!-- Botón para ir a la página anterior, desactivado si está en la primera página -->
    <span>Página {{ currentPage }} de {{ totalPages }}</span>
    <!-- Muestra el número de página actual y el total de páginas -->
    <button (click)="nextPage()" [disabled]="currentPage === totalPages">Siguiente</button>
    <!-- Botón para ir a la siguiente página, desactivado si está en la última página -->
  </div>
</div>

```

## Modal agregar pokemon 
Esta es una ventana modal que se muestra en donde se puede agregar un nuevo pokemon. El typscript esta compuesto por lo siguiente:

Esto sirve para determinar las entradas y salidas que tendra el modal, para esto con @Input se declara los datos de entrada que tiene el modal los cuales se especifican cuando se llama al componente desde el html, con Output se puede especificar datos o eventos que mandara cuando se cierre la ventana modal.

```html
 <app-agregar 
    [isOpen]="isAgregarOpen" 
    (close)="closeModalAgregar()" 
    (confirmar)="agregarPokemon($event)">
  </app-agregar>
```

```javascript
@Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Output() confirmar = new EventEmitter<any>();
```

lo siguiente es una estrictura de los datos que se requieren para crear un pokemon y una habilidad.

```javascript
pokemon: {
    id: number;
    nombre: string;
    avatar: string;
    descripcion: string;
    peso: number;
    altura: number;
    hp: number;
    ataque: number;
    defensa: number;
    ataque_especial: number;
    defensa_especial: number;
    velocidad: number;
    habilidades: any[];
  } = {
    id: 0,
    nombre: '',
    avatar: '',
    descripcion: '',
    peso: 0,
    altura: 0,
    hp: 0,
    ataque: 0,
    defensa: 0,
    ataque_especial: 0,
    defensa_especial: 0,
    velocidad: 0,
    habilidades: []
  };


  habilidad = {
    nombre: '',
    descripcion: ''
  };
```

Este metodo controla que la ventana modal se cierre.


```javascript
 closeModal() {
    this.close.emit(); 
  }
```

Este metodo emite un evento de confirmacion para que se agrege un pokemon y despues se cierra la ventana modal.

```javascript
  agregarPokemon() {
    this.confirmar.emit(this.pokemon); 
    this.closeModal();
  }
```

Este metrodo sirve para agregar un habilida al pokemon, para lo cual agregar la habilidad a la lista de habilidades de la variable de pokemon, esto permite agregar varias habilidades a un solo pokeon a travez de un boton en el html.

```javascript
  agregarHabilidad() {
    if (this.habilidad) {
      const nuevaHabilidad = { ...this.habilidad };
      this.pokemon.habilidades.push(nuevaHabilidad);
      this.habilidad.nombre = '';
      this.habilidad.descripcion = '';
    }
  }
```

Este metodo se ejecuta para eliminar una habilidad del pokemon. Esto se hace a travez de un boton en el html
```javascript
  eliminarHabilidad(habilidad: any) {
    this.pokemon.habilidades = this.pokemon.habilidades.filter(h => h !== habilidad);
  }
```

El html de esta ventana modal es el siguiente:

```html
  <div *ngIf="isOpen" class="fixed inset-0 flex items-center justify-center z-50">
  <!-- Modal contenedor principal. Se muestra solo si 'isOpen' es true -->
  
  <div class="bg-red-700 rounded-lg shadow-lg p-6 max-w-[700px] w-full relative border-4 border-black">
    <!-- Caja principal del modal, con diseño de fondo rojo y bordes redondeados -->

    <!-- Top section: Título del modal -->
    <div class="bg-gray-900 rounded-t-lg shadow-inner p-4 text-white">
      <h2 class="text-2xl font-bold text-center">Agregar Nuevo Pokémon</h2>
      <!-- Encabezado con el título "Agregar Nuevo Pokémon" -->
    </div>

    <!-- Main section: Contenido del formulario -->
    <div class="bg-gray-100 p-4 rounded-b-lg">
      <form (ngSubmit)="agregarPokemon()">
        <!-- Formulario que se envía al ejecutar la función 'agregarPokemon' -->

        <div class="max-h-[500px] overflow-y-auto px-4">
          <!-- Contenedor para los campos del formulario, con scroll si excede la altura -->

          <!-- Campo para ingresar URL del avatar -->
          <div class="mb-6">
            <label for="avatar" class="block text-gray-700 font-bold">Avatar URL</label>
            <input id="avatar" type="text" [(ngModel)]="pokemon.avatar" name="avatar" required
              class="w-full p-2 border rounded text-gray-700 mb-2 font-bold" />
            <!-- Previsualización de la imagen del avatar -->
            <div class="flex items-center justify-center mt-2">
              <img class="w-[120px] h-[120px] border-4 border-black rounded-full shadow"
                [src]="pokemon.avatar || 'ruta/a/default/avatar.png'" alt="Avatar Preview" />
            </div>
          </div>

          <!-- Campo para el nombre del Pokémon -->
          <div class="mb-4">
            <label for="nombre" class="block text-gray-700 font-bold">Nombre</label>
            <input id="nombre" type="text" [(ngModel)]="pokemon.nombre" name="nombre" required
              class="w-full p-2 border rounded text-gray-700 mb-2 font-bold" />
          </div>

          <!-- Campo para la descripción -->
          <div class="mb-4">
            <label for="descripcion" class="block text-gray-700 font-bold">Descripción</label>
            <textarea id="descripcion" [(ngModel)]="pokemon.descripcion" name="descripcion" required
              class="w-full p-2 border rounded text-gray-700 mb-2 font-bold"></textarea>
          </div>

          <!-- Campos para peso y altura -->
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label for="peso" class="block text-gray-700 font-bold">Peso</label>
              <input id="peso" type="number" [(ngModel)]="pokemon.peso" name="peso" required
                class="w-full p-2 border rounded text-gray-700 mb-2 font-bold" />
            </div>
            <div>
              <label for="altura" class="block text-gray-700 font-bold">Altura</label>
              <input id="altura" type="number" [(ngModel)]="pokemon.altura" name="altura" required
                class="w-full p-2 border rounded text-gray-700 mb-2 font-bold" />
            </div>
          </div>

          <!-- Campos para estadísticas -->
          <p class="text-gray-700 mb-2 font-bold">Estadísticas</p>
          <div class="grid grid-cols-2 gap-4 mb-4">
            <!-- Repite para cada estadística (HP, ataque, defensa, etc.) -->
            <div>
              <label for="hp" class="block text-gray-700 font-bold capitalize">Hp</label>
              <input id="hp" type="number" [(ngModel)]="pokemon.hp" name="hp" required
                class="w-full p-2 border rounded text-gray-700 mb-2 font-bold" />
            </div>
            <div>
              <label for="ataque" class="block text-gray-700 font-bold capitalize">Ataque</label>
              <input id="ataque" type="number" [(ngModel)]="pokemon.ataque" name="ataque" required
                class="w-full p-2 border rounded text-gray-700 mb-2 font-bold" />
            </div>
            <!-- Repite para las demás estadísticas -->
          </div>

          <!-- Campo para habilidades -->
          <div class="mb-4">
            <label for="habilidades" class="block text-gray-700 font-bold">Habilidades</label>
            <!-- Campo para agregar habilidades (nombre y descripción) -->
            <label for="habilidades" class="block text-gray-700 font-bold">Nombre de la habilidad</label>
            <input id="habilidad-nombre" type="text" [(ngModel)]="habilidad.nombre" name="habilidad-nombre"
              placeholder="Ingresa una habilidad y presiona Enter" 
              class="w-full p-2 border rounded text-gray-700 mb-2 font-bold" />
            <label for="habilidades" class="block text-gray-700 font-bold">Descripción de la habilidad</label>
            <textarea id="habilidad-descripcion" [(ngModel)]="habilidad.descripcion" name="habilidad-descripcion"
              placeholder="Descripción de la habilidad" 
              class="w-full p-2 border rounded text-gray-700 mb-2 font-bold"></textarea>
            <button type="button" (click)="agregarHabilidad()" 
              style="margin-left: 20px; background-color:cornflowerblue; border-radius: 5px; padding: 5px;">
              Agregar Habilidad
            </button>
            <!-- Muestra habilidades ya agregadas -->
            <div class="mt-2 flex flex-wrap gap-2">
              <span *ngFor="let habilidad of pokemon.habilidades" 
                class="bg-blue-500 text-white px-3 py-1 rounded-full">
                <div>
                  <div>{{ habilidad.nombre }} <br> {{ habilidad.descripcion }}</div>
                  <button type="button" class="ml-2 text-red-700 font-bold" (click)="eliminarHabilidad(habilidad)">
                    <img src="iconos/boton-x.png" alt="">
                  </button>
                </div>
              </span>
            </div>
          </div>
        </div>

        <!-- Botones para guardar o cancelar -->
        <div class="flex justify-end space-x-4">
          <button type="button" class="px-4 py-2 bg-gray-600 text-white rounded" (click)="closeModal()">
            Cancelar
          </button>
          <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">
            Guardar
          </button>
        </div>
      </form>
    </div>

    <!-- Elementos decorativos del modal -->
    <div class="absolute top-2 right-2 flex space-x-2">
      <div class="w-4 h-4 bg-blue-500 rounded-full shadow"></div>
      <div class="w-4 h-4 bg-green-500 rounded-full shadow"></div>
    </div>
  </div>
</div>


```

## modal de editar pokemon

Esta es una ventana modal que muestra un formulario para editar un pokemon, su funcionamiento es similar al de agregar pokemon tiene las mismas entradas y salidas y los metodos declarados aqui son los mismos que los de agregar, sin emabargo, añade un nuevo metodo que es el siguiente: 
Este metodo sirve para crear un duplicado del pokemon que recibe de entrada la ventan modal, ya que si no se duplica al modificcar los datos del pokemon recibido se modifican directamente en la tabla en tiempo real por lo que es necesario crear un duplicado para que esto no suceda y asi si se cancela la operacion de editar no se guarden los cambios.
 
```javascript
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      this.pokemon = JSON.parse(JSON.stringify(this.data));
    }
  }
```

De ahi enfuera lo demas es similar al de agegar.

El html de este archivo esta compuesto de la siguiente manera.

```html
  <div *ngIf="isOpen" class="fixed inset-0 flex items-center justify-center z-50">
  <div class="bg-red-700 rounded-lg shadow-lg p-6 max-w-[700px] w-full relative border-4 border-black">
    <!-- Top section: Pokédex screen frame -->
    <div class="bg-gray-900 rounded-t-lg shadow-inner p-4 text-black">
      <h2 class="text-2xl font-bold text-center">Editar Pokémon</h2>
    </div>

    <!-- Main section: Form content -->
    <div class="bg-gray-100 p-4 rounded-b-lg">
      <form (ngSubmit)="editarPokemon()">
        <div class="max-h-[500px] overflow-y-auto px-4">
          <!-- Avatar -->
          <div class="mb-6">
            <label for="avatar" class="block text-gray-700 font-bold">Avatar URL</label>
            <input id="avatar" type="text" [(ngModel)]="pokemon.avatar" name="avatar"
              class="w-full p-2 border rounded" />
            <div class="flex items-center justify-center mt-2">
              <img class="w-[120px] h-[120px] border-4 border-black rounded-full shadow" [src]="pokemon.avatar" alt="Avatar Preview" />
            </div>
          </div>

          <!-- Nombre -->
          <div class="mb-4">
            <label for="nombre" class="block text-gray-700 font-bold">Nombre</label>
            <input id="nombre" type="text" [(ngModel)]="pokemon.nombre" name="nombre"
              class="w-full p-2 border rounded" />
          </div>

          <!-- Descripción -->
          <div class="mb-4">
            <label for="descripcion" class="block text-gray-700 font-bold">Descripción</label>
            <textarea id="descripcion" [(ngModel)]="pokemon.descripcion" name="descripcion"
              class="w-full p-2 border rounded"></textarea>
          </div>

          <!-- Peso y Altura -->
          <div class="flex space-x-4 mb-4">
            <div>
              <label for="peso" class="block text-gray-700 font-bold">Peso</label>
              <input id="peso" type="number" [(ngModel)]="pokemon.peso" name="peso"
                class="w-full p-2 border rounded" />
            </div>
            <div>
              <label for="altura" class="block text-gray-700 font-bold">Altura</label>
              <input id="altura" type="number" [(ngModel)]="pokemon.altura" name="altura"
                class="w-full p-2 border rounded" />
            </div>
          </div>

          <!-- Estadísticas -->
          <p class="text-gray-700 mb-2 font-bold">Estadísticas</p>
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div *ngFor="let stat of ['hp', 'ataque', 'defensa', 'ataque_especial', 'defensa_especial', 'velocidad']">
              <label [for]="stat" class="block text-gray-700 font-bold capitalize">{{ stat }}</label>
              <input [id]="stat" type="number" [(ngModel)]="pokemon[stat]" [name]="stat"
                class="w-full p-2 border rounded" />
            </div>
          </div>

          <!-- Habilidades -->
          <p class="text-gray-700 mb-2 font-bold">Habilidades</p>
          <div *ngFor="let habilidad of pokemon.habilidades; let i = index" class="mb-4">
            <label class="block text-gray-700 font-bold">Habilidad {{ i + 1 }}</label>
            <input type="text" [(ngModel)]="pokemon.habilidades[i].nombre" [name]="'habilidad_' + i + '_nombre'"
              placeholder="Nombre de la habilidad" class="w-full p-2 border rounded mb-2" />
            <textarea [(ngModel)]="pokemon.habilidades[i].descripcion" [name]="'habilidad_' + i + '_descripcion'"
              placeholder="Descripción" class="w-full p-2 border rounded"></textarea>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end space-x-4">
          <button type="button" class="px-4 py-2 bg-gray-600 text-white rounded" (click)="closeModal()">
            Cancelar
          </button>
          <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">
            Guardar
          </button>
        </div>
      </form>
    </div>

    <!-- Pokédex Buttons -->
    <div class="absolute top-2 right-2 flex space-x-2">
      <div class="w-4 h-4 bg-blue-500 rounded-full shadow"></div>
      <div class="w-4 h-4 bg-green-500 rounded-full shadow"></div>
    </div>
  </div>
</div>

```

## modal eliminar pokemon
Este modal muestra un simple mensaje de verificacion al usuario para confirmar si desea elminar el pokemon o no, el typescript es sencillo y consta de metodos que ya fueron descritos anteriormente, consta de dos entradas y dos eventos de salida uno para cerrar el modal sin hacer nada y otro para hacer referencia a que se acepto elminar el pokemon.

```javascript
  @Input() data: any = {};
  @Input() isOpen = false; 
  @Output() close = new EventEmitter<void>(); 
  @Output() confirmar = new EventEmitter<any>();

  closeModal() {
    this.close.emit(); 
  }

  borrarPokemon() {
    this.confirmar.emit(this.data); 
    this.closeModal(); 
  }
```

El html esta compuesto de la siguiente manera.
```html
 <div *ngIf="isOpen" class="fixed inset-0 flex items-center justify-center z-50">
  <div class="bg-red-700 rounded-lg shadow-lg p-6 max-w-[500px] w-full relative border-4 border-black">
    <!-- Top section: Pokédex screen frame -->
    <div class="bg-gray-900 rounded-t-lg shadow-inner p-4 text-white">
      <h2 class="text-2xl font-bold text-center">Eliminar Pokémon</h2>
    </div>

    <!-- Main section: Confirmation content -->
    <div class="bg-gray-100 p-4 rounded-b-lg text-center">
      <p class="text-gray-700 text-lg font-bold mb-6">¿Estás seguro que deseas eliminar al Pokémon <span class="text-red-500">{{data.nombre}}</span>?</p>

      <!-- Buttons -->
      <div class="flex justify-center space-x-4">
        <button class="px-4 py-2 bg-gray-600 text-white rounded" (click)="closeModal()">
          Cancelar
        </button>
        <button class="px-4 py-2 bg-blue-500 text-white rounded" (click)="borrarPokemon()">
          Aceptar
        </button>
      </div>
    </div>

    <!-- Pokédex Buttons -->
    <div class="absolute top-2 right-2 flex space-x-2">
      <div class="w-4 h-4 bg-blue-500 rounded-full shadow"></div>
      <div class="w-4 h-4 bg-green-500 rounded-full shadow"></div>
    </div>
  </div>
</div>

```


## modal mostrar informacion

Esta vetana sirve para mostrar la informacion de un pokemon, el TypeScript es sencillo contiene metrodos ya descritos, consta de dos Inputs para controlar si se myuestra o no y los datos del pokemon a mostrar, y un Output para emitir el evento de cierre del modal.  

```javascript
  export class InformacionComponent {
  @Input() data: any = {};
  @Input() isOpen = false; 
  @Output() close = new EventEmitter<void>(); 

  closeModal() {
    this.close.emit(); 
  }
}
```

El html esta compuesto de la siguiente manera.

```html
 <div *ngIf="isOpen" class="fixed inset-0 flex items-center justify-center z-50">
  <div class="bg-red-700 rounded-lg shadow-lg p-6 max-w-[600px] relative border-4 border-black">
    <!-- Top screen (Pokédex-style frame) -->
    <div class="bg-gray-900 rounded-t-lg shadow-inner p-4">
      <h2 class="text-white text-2xl font-bold text-center mb-2">{{data.nombre}}</h2>
      <div class="flex items-center justify-center mb-4">
        <img class="w-[150px] h-[150px] rounded-full border-4 border-black shadow-md" src="{{data.avatar}}"
          alt="{{data.nombre}}" />
      </div>
    </div>
    <!-- Main screen content -->


    <div class="bg-gray-100 rounded-b-lg p-4">
      <div class="mb-4">
        <h3 class="text-lg font-bold text-red-600 mb-2">Detalles</h3>
        <div class="bg-gray-200 p-2 rounded text-center">
          <p class="text-gray-700 text-sm text-center mb-2">{{data.descripcion}}</p>
        </div>

      </div>

      <div class="grid grid-cols-2 gap-4 mb-4">
        <div class="bg-gray-200 p-2 rounded text-center">
          <p class="font-bold text-gray-700">Peso</p>
          <p class="text-gray-700">{{data.peso}} kg</p>
        </div>
        <div class="bg-gray-200 p-2 rounded text-center">
          <p class="font-bold text-gray-700">Altura</p>
          <p class="text-gray-700">{{data.altura}} m</p>
        </div>
      </div>
      <div class="mb-4">
        <h3 class="text-lg font-bold text-red-600 mb-2">Estadísticas</h3>
        <div class="grid grid-cols-3 gap-2">
          <div class="bg-gray-200 p-2 rounded text-center">
            <p class="font-bold text-gray-700">HP</p>
            <p class="text-gray-700">{{data.hp}}</p>
          </div>
          <div class="bg-gray-200 p-2 rounded text-center">
            <p class="font-bold text-gray-700">Ataque</p>
            <p class="text-gray-700">{{data.ataque}}</p>
          </div>
          <div class="bg-gray-200 p-2 rounded text-center">
            <p class="font-bold text-gray-700">Defensa</p>
            <p class="text-gray-700">{{data.defensa}}</p>
          </div>
          <div class="bg-gray-200 p-2 rounded text-center">
            <p class="font-bold text-gray-700">Ataque Esp.</p>
            <p class="text-gray-700">{{data.ataque_especial}}</p>
          </div>
          <div class="bg-gray-200 p-2 rounded text-center">
            <p class="font-bold text-gray-700">Defensa Esp.</p>
            <p class="text-gray-700">{{data.defensa_especial}}</p>
          </div>
          <div class="bg-gray-200 p-2 rounded text-center">
            <p class="font-bold text-gray-700">Velocidad</p>
            <p class="text-gray-700">{{data.velocidad}}</p>
          </div>
        </div>
      </div>
      <div class="mb-4">
        <h3 class="text-lg font-bold text-red-600 mb-2">Habilidades</h3>
        <div *ngFor="let habilidad of data.habilidades" class="bg-gray-200 p-2 rounded mb-2">
          <p class="font-bold text-gray-700">{{habilidad.nombre}}</p>
          <p class="text-sm text-gray-700">{{habilidad.descripcion}}</p>
        </div>
      </div>
    </div>
    <!-- Pokédex buttons -->
    <div class="absolute top-2 right-2 flex space-x-2">
      <div class="w-4 h-4 bg-blue-500 rounded-full shadow"></div>
      <div class="w-4 h-4 bg-green-500 rounded-full shadow"></div>
    </div>
    <div class="absolute bottom-2 right-2">
      <button class="px-4 py-2 bg-red-600 text-white rounded" (click)="closeModal()">
        Cerrar
      </button>
    </div>
  </div>
</div>
```


## Elaboración del login
 
```javascript
// Importación de módulos necesarios para el componente
import { Component } from '@angular/core'; // Para definir el componente
import { Router } from '@angular/router'; // Para navegación entre páginas
import { GeneralService } from '../../../core/general.service'; // Servicio para manejar datos generales
import { FormsModule } from '@angular/forms'; // Para manejo de formularios
import { CommonModule } from '@angular/common'; // Para usar directivas comunes como ngIf y ngFor

// Definición del componente con su selector, plantilla, y estilos
@Component({
  selector: 'app-login', // Nombre del selector para usar en la vista HTML
  standalone: true, // El componente es autónomo, no requiere un módulo adicional
  imports: [FormsModule, CommonModule], // Importación de módulos necesarios
  templateUrl: './login.component.html', // Ruta al archivo de la plantilla HTML
  styleUrls: ['./login.component.css'] // Ruta al archivo de estilos CSS
})
export default class LoginComponent {
  // Propiedades del componente
  email: string = ''; // Almacena el email introducido por el usuario
  password: string = ''; // Almacena la contraseña introducida por el usuario
  errorMessage: string = ''; // Almacena el mensaje de error si ocurre alguno

  // Constructor que inyecta los servicios necesarios para el componente
  constructor(private router: Router, private generalService: GeneralService) {}

  // Método para validar el formato de correo electrónico utilizando una expresión regular
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar formato de correo
    return emailRegex.test(email); // Retorna verdadero si el correo es válido, falso si no
  }

  // Método para redirigir a la página de registro
  registro() {
    this.router.navigate(['/register']); // Navega a la ruta de registro
  }

  // Método para manejar el inicio de sesión
  iniciarPagina() {
    // Verifica si el email o la contraseña están vacíos
    if (!this.email || !this.password) {
      this.errorMessage = 'Ingrese los valores.'; // Muestra mensaje de error si faltan valores
      return;
    }

    // Verifica si el formato del email es válido
    if (!this.isValidEmail(this.email)) {
      this.errorMessage = 'El formato del correo no es válido.'; // Muestra mensaje de error si el formato del correo es incorrecto
      return;
    }

    // Llama al servicio para obtener la lista de usuarios
    this.generalService.getUsers().subscribe({
      next: (response) => { // Si la respuesta es exitosa
        const users = response; // Almacena los usuarios obtenidos
        
        // Busca el usuario en la lista de usuarios con el email y la contraseña proporcionados
        const user = users.find(u => u.email === this.email && u.password === this.password);
        
        // Si se encuentra el usuario
        if (user) {
          this.generalService.setCurrentUser(user); // Guarda el usuario autenticado en el servicio
          this.router.navigate(['/dashboard']); // Navega a la página de inicio (dashboard)
        } else {
          this.errorMessage = 'No hay ningún usuario asociado con esos datos.'; // Muestra un mensaje de error si no se encuentra el usuario
        }
      },
      error: (error) => { // Si ocurre un error al obtener los usuarios
        console.error('Error al obtener los usuarios', error); // Muestra el error en la consola
        this.errorMessage = 'Error en los servidores, vuelva a intentar más tarde.'; // Muestra un mensaje de error al usuario
      }
    });
  }
}
```
```html
<!-- Fondo con gradiente y una imagen de Pokémon con opacidad -->
<div
	class="bg-gradient-to-b from-blue-600 via-red-500 to-yellow-400 absolute top-0 left-0 bottom-0 h-full w-full overflow-hidden">
	<img
		src="https://www.gamerfocus.co/wp-content/uploads/2019/06/pokemon_collage.jpg"
		alt="Pokemon Background"
		class="absolute top-0 left-0 w-full h-full object-cover opacity-40" />
</div>

<!-- Contenedor principal con fondo transparente y centrado de contenido -->
<div
	class="relative min-h-screen flex justify-center items-center rounded-3xl shadow-xl z-10 bg-transparent">
	<div class="flex-col flex self-center lg:px-14 sm:max-w-4xl xl:max-w-md text-white">
		<!-- Sección de bienvenida con icono y título -->
		<div class="self-start flex flex-col">
			<img src="https://static.vecteezy.com/system/resources/previews/000/141/925/original/set-of-pokemon-icons-vector.jpg" alt="Pokemon Icons" class="h-32 mx-auto">
			<h1 class="my-3 font-semibold text-4xl text-center">Bienvenido, Entrenador</h1>
			<p class="text-center text-sm opacity-90">Explora el mundo Pokémon con tu cuenta.</p>
		</div>
	</div>
	<!-- Contenedor del formulario de inicio de sesión -->
	<div class="flex justify-center self-center">
		<div class="p-12 bg-white bg-opacity-90 mx-auto rounded-3xl w-96">
			<!-- Título de la sección de inicio de sesión -->
			<div class="mb-7 text-center">
				<h3 class="font-bold text-2xl text-gray-800">Inicia Sesión</h3>
			</div>
			<!-- Mensaje de error, si existe -->
			<div *ngIf="errorMessage" class="text-red-500 text-center mb-3">
				{{ errorMessage }}
			</div>
			<div class="space-y-6">
				<!-- Campo para ingresar el correo electrónico -->
				<div>
					<input
						class="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
						type="email"
						placeholder="Correo"
						[(ngModel)]="email"/>
				</div>
				<!-- Campo para ingresar la contraseña -->
				<div class="relative">
					<input
						type="password"
						placeholder="Contraseña" [(ngModel)]="password"
						class="w-full text-sm px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
					/>
				</div>
				<!-- Botón para iniciar sesión -->
				<div>
					<button
						type="submit" (click)="iniciarPagina()"
						class="w-full flex justify-center bg-gradient-to-r from-blue-500 to-red-500 text-white p-3 rounded-lg tracking-wide font-semibold shadow-lg transform hover:scale-105 transition duration-300">
						<!-- Icono de Pikachu al lado del texto -->
						<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" class="h-6 mr-2" alt="Pikachu Icon">
						¡Atrápalos Ya!
					</button>
				</div>
				<!-- Sección de separación con "o" para opciones alternas -->
				<div class="flex items-center justify-center space-x-2 my-5">
					<span class="h-px w-16 bg-gray-400"></span>
					<span class="text-gray-600">o</span>
					<span class="h-px w-16 bg-gray-400"></span>
				</div>
				<!-- Botón para redirigir al registro -->
				<div>
					<button
						type="button"   (click)="registro()"
						class="w-full flex justify-center bg-gradient-to-r from-blue-500 to-red-500 text-white p-3 rounded-lg tracking-wide font-semibold shadow-lg transform hover:scale-105 transition duration-300">
						<!-- Icono de Pikachu al lado del texto -->
						<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" class="h-6 mr-2" alt="Pikachu Icon">
						¡Inicia una Nueva Aventura!
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
```
## Elaboración del Register

```java
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GeneralService } from '../../../core/general.service';

@Component({
  selector: 'app-register',  // El selector que se utilizará en el HTML para incluir este componente
  standalone: true,          // Este componente es autónomo y no depende de un módulo específico
  imports: [FormsModule, CommonModule],  // Importa los módulos necesarios para formularios y funcionalidades comunes
  templateUrl: './register.component.html',  // Ruta del archivo HTML que define la estructura visual del componente
  styleUrls: ['./register.component.css'],  // Ruta del archivo CSS que define los estilos del componente
})
export default class RegisterComponent {
  // Aquí se define el objeto `user` que contiene todos los datos del usuario a registrar
  user: any = {
    name: '',            // Nombre del usuario
    apellidoP: '',       // Apellido paterno
    apellidoM: '',       // Apellido materno
    email: '',           // Correo electrónico
    password: '',        // Contraseña
    phone: '',           // Teléfono
    avatar: '',          // URL de la imagen/avatar del usuario
  };

  errorMessage: string = '';   // Almacena mensajes de error cuando algo falla
  successMessage: string = ''; // Almacena mensajes de éxito cuando la operación es exitosa

  // Inyección de dependencias en el constructor: el servicio de usuarios y el router de Angular
  constructor(private generalService: GeneralService, private router: Router) {}

  // Método llamado cuando el usuario intenta registrarse
  register() {
    // Expresiones regulares para validar campos:
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/;  // Valida que nombres y apellidos tengan mínimo 3 caracteres y solo letras
    const phoneRegex = /^\d{10}$/;  // Valida que el teléfono tenga exactamente 10 dígitos
    const urlRegex = /.*/;  // Valida cualquier URL (se puede mejorar para aceptar solo imágenes)

    // Se realizan validaciones para asegurarse de que todos los campos sean llenados correctamente:
    if (
      !this.user.name ||        // Si el nombre está vacío
      !this.user.apellidoP ||   // Si el apellido paterno está vacío
      !this.user.apellidoM ||   // Si el apellido materno está vacío
      !this.user.email ||       // Si el correo está vacío
      !this.user.password ||    // Si la contraseña está vacía
      !this.user.phone ||       // Si el teléfono está vacío
      !this.user.avatar         // Si la URL del avatar está vacía
    ) {
      // Si algún campo está vacío, muestra un mensaje de error
      this.errorMessage = 'Por favor, complete todos los campos.';
      return;  // Detiene la ejecución del método
    }

    // Validación de nombres y apellidos (solo letras y al menos 3 caracteres)
    if (
      !nameRegex.test(this.user.name) ||
      !nameRegex.test(this.user.apellidoP) ||
      !nameRegex.test(this.user.apellidoM)
    ) {
      // Si alguno de los campos no pasa la validación, muestra un mensaje de error
      this.errorMessage =
        'Los nombres y apellidos deben tener al menos 3 caracteres y solo contener letras y espacios.';
      return;  // Detiene la ejecución
    }

    // Validación de teléfono (debe ser un número de 10 dígitos)
    if (!phoneRegex.test(this.user.phone)) {
      // Si el teléfono no tiene 10 dígitos, muestra un mensaje de error
      this.errorMessage =
        'El número de teléfono debe tener exactamente 10 dígitos.';
      return;  // Detiene la ejecución
    }

    // Validación de URL del avatar
    if (!urlRegex.test(this.user.avatar)) {
      // Si la URL no es válida, muestra un mensaje de error
      this.errorMessage = 'Por favor, ingrese una URL válida para el avatar.';
      return;  // Detiene la ejecución
    }

    // Si todas las validaciones son correctas, se realiza el registro
    this.generalService.registerUser(this.user).subscribe(
      (response) => {
        // Si el registro es exitoso, muestra un mensaje de éxito y redirige a la página de inicio de sesión
        this.successMessage = '¡Registro exitoso! Redirigiendo al inicio de sesión...';
        this.errorMessage = '';  // Borra cualquier mensaje de error

        // Se utiliza `setTimeout` para esperar 2 segundos antes de redirigir al usuario a la página de login
        setTimeout(() => this.router.navigate(['/login']), 2000);  
      },
      (error) => {
        // Si ocurre un error durante el registro (por ejemplo, un correo ya registrado)
        console.error('Error al registrar usuario:', error);

        // Si el error es por un correo ya registrado, muestra un mensaje adecuado
        if (error.status === 400 && error.error.errors?.email) {
          this.errorMessage = 'El correo electrónico ya está en uso. Por favor, intente con otro.';
        } else {
          // Si ocurre otro tipo de error, muestra un mensaje general
          this.errorMessage = 'Ocurrió un error inesperado. Intente nuevamente.';
        }
        this.successMessage = '';  // Borra el mensaje de éxito en caso de error
      }
    );
  }
}
```

```html
<!-- Fondo de la página con un gradiente de color y una imagen de fondo -->
<div class="bg-gradient-to-b from-blue-600 via-red-500 to-yellow-400 absolute top-0 left-0 bottom-0 h-full w-full overflow-hidden">
  <!-- Imagen de fondo con opacidad 40% -->
  <img src="https://www.gamerfocus.co/wp-content/uploads/2019/06/pokemon_collage.jpg" alt="Pokemon Background" class="absolute top-0 left-0 w-full h-full object-cover opacity-40" />
</div>

<!-- Formulario de registro -->
<form (ngSubmit)="register()">
  <!-- Contenedor principal con un fondo blanco y sombra, centrado en la pantalla -->
  <div class="relative min-h-screen flex justify-center items-center rounded-3xl shadow-xl z-10 bg-transparent">
    <!-- Caja del formulario -->
    <div class="p-12 bg-white bg-opacity-90 mx-auto rounded-3xl w-[700px] flex space-x-12">
      <!-- Contenedor izquierdo: formulario con los campos de texto -->
      <div class="flex-1 space-y-6">
        <div class="mb-7 text-center">
          <h3 class="font-bold text-2xl text-gray-800">Regístrate</h3> <!-- Título del formulario -->
        </div>

        <!-- Mensajes de error y éxito -->
        <div *ngIf="errorMessage" class="text-red-500 text-center mb-3">
          {{ errorMessage }} <!-- Mensaje de error en rojo -->
        </div>
        <div *ngIf="successMessage" class="text-green-500 text-center mb-3">
          {{ successMessage }} <!-- Mensaje de éxito en verde -->
        </div>

        <!-- Campos de entrada del usuario -->
        <div class="space-y-6">
          <!-- Campo de nombre -->
          <input type="text" placeholder="Nombre" [(ngModel)]="user.name" name="name" required
            class="w-full text-sm px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

          <!-- Campo de apellido paterno -->
          <input type="text" placeholder="Apellido Paterno" [(ngModel)]="user.apellidoP" name="apellidoP" required
            class="w-full text-sm px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

          <!-- Campo de apellido materno -->
          <input type="text" placeholder="Apellido Materno" [(ngModel)]="user.apellidoM" name="apellidoM" required
            class="w-full text-sm px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

          <!-- Campo de correo electrónico -->
          <input type="email" placeholder="Correo" [(ngModel)]="user.email" name="email" required
            class="w-full text-sm px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

          <!-- Campo de contraseña -->
          <input type="password" placeholder="Contraseña" [(ngModel)]="user.password" name="password" required
            class="w-full text-sm px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400" />

          <!-- Campo de teléfono -->
          <input type="tel" placeholder="Teléfono" [(ngModel)]="user.phone" name="phone" required
            class="w-full text-sm px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" />
        </div>
      </div>

      <!-- Contenedor derecho: avatar y botón de registro -->
      <div class="flex-1 flex flex-col justify-center items-center space-y-6">
        <!-- Campo para URL del avatar -->
        <input type="text" placeholder="Avatar (URL)" [(ngModel)]="user.avatar" name="avatar" required
          class="w-full text-sm px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
        
        <!-- Previsualización del avatar si hay una URL -->
        <div *ngIf="user.avatar" class="text-center mt-4">
          <p class="text-sm text-gray-500">Vista previa del avatar:</p>
          <img [src]="user.avatar" alt="Avatar"
            class="w-24 h-24 rounded-full object-cover mx-auto border border-gray-300" />
        </div>

        <!-- Botón para enviar el formulario -->
        <button type="submit" 
          class="w-full flex justify-center bg-gradient-to-r from-blue-500 to-red-500 text-white p-3 rounded-lg tracking-wide font-semibold shadow-lg transform hover:scale-105 transition duration-300">
          Registrarse
        </button>
      </div>
    </div>
  </div>
</form>

```

## Elaboración del Footer

```javascript
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer', // Nombre del componente
  standalone: true, // Define que este componente es autónomo y no necesita módulos tradicionales
  imports: [], // En este caso no hay imports, pero podrías agregar módulos si es necesario
  templateUrl: './footer.component.html', // Ruta del archivo HTML para el template
  styleUrl: './footer.component.css' // Ruta del archivo CSS para el estilo
})
export class FooterComponent {
	
}
```

```html
<footer class="py-2 bg-clip-border rounded-xl" style="background-color: blanchedalmond">
    <div class="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
      <p class="block antialiased font-sans text-sm leading-normal font-normal text-inherit">
        <!-- Texto del copyright y autores -->
        © 2024, hecho con 
        <!-- Icono de corazón (SVG) -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="-mt-0.5 inline-block h-3.5 w-3.5">
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path>
        </svg>
        por 
        <!-- Enlace al autor -->
        <a target="_blank" class="transition-colors hover:text-blue-500">Manuel Eduardo y Alexis Isaac</a> para la mejor EXP.
      </p>
    </div>
</footer>

```

## Elaboración del Header

```javascript
// Importación de los módulos necesarios de Angular
import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../../core/general.service';

// Definición del componente HeaderComponent
@Component({
  selector: 'app-header', // Selector del componente, utilizado en el HTML
  standalone: true, // Indica que este componente es autónomo (sin dependencias de otros módulos)
  imports: [], // Importaciones adicionales (vacío en este caso)
  templateUrl: './header.component.html', // Ruta al archivo de plantilla (HTML) del componente
  styleUrls: ['./header.component.css'] // Ruta al archivo de estilos (CSS) del componente
})
export class HeaderComponent implements OnInit {
  // Propiedad para controlar la visibilidad del desplegable
  isDropdownOpen = false;

  // Propiedad para almacenar la información del usuario (por defecto es un usuario 'Guest' con un avatar predeterminado)
  user: any = {
    name: 'Guest',
    avatar: 'https://default-avatar-url.com/default-avatar.png',
  };

  // Constructor que inyecta el servicio GeneralService
  constructor(private generalService: GeneralService) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Obtiene los datos del usuario actual a través del servicio y actualiza la propiedad 'user'
    this.generalService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.user = user; // Si hay datos de usuario, los asigna a la propiedad 'user'
      }
    });
  }

  // Método que alterna la visibilidad del desplegable
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen; // Cambia el estado de 'isDropdownOpen' entre 'true' y 'false'
  }
}

```

```html
<!-- Contenedor principal que usa flexbox y tiene un diseño responsivo -->
<div class="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
  
  <!-- Este div está vacío y tiene la clase 'capitalize', que capitaliza las primeras letras de las palabras si tuviera contenido -->
  <div class="capitalize"></div>
  
  <!-- Contenedor que agrupa los elementos a la derecha, con diseño flexible -->
  <div class="flex items-center">
    
    <!-- Espaciado a la izquierda del contenido (margin-right) en dispositivos pequeños y un ancho específico en pantallas medianas (md) -->
    <div class="mr-auto md:mr-4 md:w-56"></div>

    <!-- Botón para mostrar u ocultar un menú desplegable, solo visible en pantallas más pequeñas (xl:hidden) -->
    <button
      class="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 grid xl:hidden"
      type="button"
      (click)="toggleDropdown()" <!-- Llama al método toggleDropdown() al hacer clic -->
    >
      <!-- Icono de tres líneas, comúnmente usado para menús de hamburguesa, centrado dentro del botón -->
      <span class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          stroke-width="3"
          class="h-6 w-6 text-blue-gray-500"
        >
          <!-- Path del icono de las tres líneas -->
          <path
            fill-rule="evenodd"
            d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </span>
    </button>

    <!-- Enlace al perfil del usuario -->
    <a routerLink="/profile">
      <div class="flex items-center gap-3">
        
        <!-- Avatar del usuario -->
        <img
          [src]="user.avatar" <!-- Fuente de la imagen de avatar (se vincula dinámicamente a través de user.avatar) -->
          alt="Avatar"
          class="w-16 h-16 rounded-full border-2 border-gray-300" <!-- Estilos: tamaño 16x16, bordes redondeados y borde gris -->
        />
        
        <!-- Nombre del usuario con estilos -->
        <span
          class="text-sm font-medium text-gray-700 capitalize px-4 py-2 rounded-lg bg-gray-200"
        >
          {{ user.name }} <!-- Muestra el nombre del usuario (usando interpolación Angular) -->
        </span>
      </div>      
    </a>
  </div>
</div>

```

## Elaboración del Layout

```javascript
import { Component } from '@angular/core';  // Importa el decorador Component de Angular para crear componentes.
import { HeaderComponent } from '../header/header.component';  // Importa el componente Header.
import { SidebarComponent } from '../sidebar/sidebar.component';  // Importa el componente Sidebar.
import { FooterComponent } from '../footer/footer.component';  // Importa el componente Footer.
import { RouterOutlet } from '@angular/router';  // Importa el RouterOutlet para la navegación basada en rutas.

@Component({
  selector: 'app-layout',  // Define el nombre del selector para este componente.
  standalone: true,  // Este componente no depende de un módulo tradicional, se configura como standalone.
  imports: [
    HeaderComponent,  // Incluye el componente Header dentro de este componente.
    SidebarComponent,  // Incluye el componente Sidebar dentro de este componente.
    FooterComponent,  // Incluye el componente Footer dentro de este componente.
    RouterOutlet,  // Incluye RouterOutlet para manejar las rutas en este componente.
  ],
  templateUrl: './layout.component.html',  // Define el archivo HTML para la plantilla de este componente.
  styleUrl: './layout.component.css'  // Define el archivo CSS para los estilos de este componente.
})
export default class LayoutComponent {  // Define la clase del componente LayoutComponent.
  // No se requiere lógica adicional en este componente; solo importa otros componentes y gestiona su disposición.
}

```

```html
<!-- Contenedor principal con altura mínima de pantalla y un fondo de inicio de sesión -->
<div class="min-h-screen login-background">
  
  <!-- Componente de barra lateral (sidebar) -->
  <app-sidebar></app-sidebar>

  <!-- Contenedor principal del contenido -->
  <div class="p-4 xl:ml-80">
    
    <!-- Barra de navegación -->
    <nav class="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
      
      <!-- Componente de encabezado -->
      <app-header></app-header>
      
    </nav>

    <!-- Sección de contenido principal, en este caso el dashboard -->
    <div class="mt-12">
      <router-outlet></router-outlet> <!-- Aquí se cargará la vista correspondiente a la ruta actual -->
      <!-- Este es el dashboard -->
    </div>

    <!-- Componente de pie de página -->
    <div class="text-blue-gray-600">
      <app-footer></app-footer>
    </div>
  </div>
</div>

```

## Elaboración del Sidebar

```javascript
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true, // Indica que este componente no depende de un módulo para ser utilizado
  imports: [
    RouterLink, // Permite crear enlaces de navegación dentro de la aplicación
    RouterLinkActive, // Permite agregar clases CSS a un enlace cuando está activo
  ],
  templateUrl: './sidebar.component.html', // Ruta al archivo HTML que define la plantilla de este componente
  styleUrls: ['./sidebar.component.css'] // Ruta al archivo CSS para los estilos del componente
})
export class SidebarComponent {
  
}
```

```html
<aside class="bg-gradient-to-br from-gray-800 to-gray-900 -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
  <!-- Contenedor principal del sidebar con un gradiente de color de fondo -->
  <div class="relative border-b border-white/20">
    <!-- Div para el encabezado del sidebar con una línea de borde inferior -->
    <a class="flex items-center gap-2 py-4 px-10">
      <!-- Enlace para el logo y el nombre del sitio -->
      <h3 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-relaxed text-yellow-300">PokeWeb</h3>
      <!-- Nombre de la aplicación -->
      <img 
        src="https://th.bing.com/th/id/OIP.J4Uz_srtf0JGidtctBp3BQHaEL?rs=1&pid=ImgDetMain" 
        alt="Logo Pokémon" 
        class="h-14 w-14 rounded-lg object-cover"
      >
      <!-- Imagen del logo de Pokémon -->
    </a>
    <a class="flex items-center gap-4 py-4 px-6 rounded-lg px-24 mt-[-20px]">
    </a>    
    <button class="middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-white hover:bg-white/10 active:bg-white/30 absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden" type="button">
      <!-- Botón para cerrar el sidebar en pantallas pequeñas (oculta en pantallas grandes) -->
      <span class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
        <!-- Icono de cerrar -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" aria-hidden="true" class="h-5 w-5 text-white">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </span>
    </button>
  </div>
  <div class="m-4">
    <!-- Contenedor de los elementos del menú -->
    <ul class="mb-4 flex flex-col gap-1">
      <!-- Lista de enlaces del menú -->
      <li>
        <a routerLink="/dashboard">
          <!-- Enlace a la página de dashboard -->
          <button routerLinkActive="bg-gradient-to-tr from-green-700 to-green-600 shadow-md shadow-green-300/20 hover:shadow-lg hover:shadow-green-300/40 active:opacity-[0.85]" 
                  class="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-gray-200 hover:bg-gray-500/10 active:bg-gray-600/30 flex w-full items-center gap-4 px-4 capitalize" type="button">
            <!-- Botón para acceder al dashboard -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-5 h-5 text-inherit">
              <!-- Icono del dashboard -->
              <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 101.061 1.06l8.69-8.69z"></path>
              <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"></path>
            </svg>
            <p class="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">dashboard</p>
          </button>
        </a>
      </li>
      <li>
        <a routerLink="/profile">
          <!-- Enlace a la página de perfil -->
          <button routerLinkActive="bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]" 
          class="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 flex w-full items-center gap-4 px-4 capitalize" type="button">
            <!-- Botón para acceder al perfil -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-5 h-5 text-inherit">
              <!-- Icono de perfil -->
              <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd"></path>
            </svg>
            <p class="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">Perfil</p>
          </button>
        </a>
      </li>
      <li>
        <a routerLink="/pokemones">
          <!-- Enlace a la página de Pokemones -->
          <button routerLinkActive="bg-gradient-to-tr from-red-600 to-red-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]" 
          class="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 flex w-full items-center gap-4 px-4 capitalize" type="button">
            <!-- Botón para acceder a la página de Pokemones -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-5 h-5 text-inherit">
              <!-- Icono de Pokemones -->
              <path fill-rule="evenodd" d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 18.375V5.625zM21 9.375A.375.375 0 0020.625 9h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5z" clip-rule="evenodd"></path>
            </svg>
            <p class="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">Pokemones</p>
          </button>
        </a>
      </li>
    </ul>
    <ul class="mb-4 flex flex-col gap-1">
      <li class="mx-3.5 mt-4 mb-2">
        <p class="block antialiased font-sans text-sm leading-normal text-white font-black uppercase opacity-75">Sesión</p>
      </li>
      <li>
        <a class="" routerLink="/login">
          <!-- Enlace para cerrar sesión -->
          <button class="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize" type="button">
            <!-- Enlace para cerrar sesión -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-5 h-5 text-inherit">
              <!-- Icono de cerrar sesión -->
              <path fill-rule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" clip-rule="evenodd"></path>
            </svg>
            <p class="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">Cerrar Sesión</p>
          </button>
        </a>
      </li>
    </ul>
  </div>
</aside>
```

## Elaboracion del Dashboard

```javascript
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard', // El nombre del selector que se utilizará en el HTML
  standalone: true, // Indica que este componente es independiente (sin necesidad de un módulo Angular tradicional)
  imports: [],  // Aquí puedes importar módulos adicionales si los necesitas (por ejemplo, CommonModule)
  templateUrl: './dashboard.component.html', // Archivo de la plantilla HTML del componente
  styleUrls: ['./dashboard.component.css']  // Corregido: el nombre correcto es 'styleUrls' (plural) para los estilos
})
export default class DashboardComponent {
  
}
```

```html
<div class="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
  <!-- Contenedor principal para una cuadrícula con un espacio entre elementos. En pantallas grandes, la cuadrícula tendrá 4 columnas -->
  
  <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
    <!-- Tarjeta individual con bordes redondeados, fondo blanco, y sombra para darle un efecto de profundidad -->
    
    <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
      <!-- Icono circular en la parte superior de la tarjeta con un gradiente rosa. Usamos clases para asegurar que esté centrado -->
      
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-6 h-6 text-white">
        <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd"></path>
      </svg>
      <!-- SVG que representa un ícono. En este caso, parece un avatar o una imagen relacionada con el usuario -->
    </div>

    <div class="p-4 text-right">
      <!-- Contenedor para el texto de la tarjeta, alineado a la derecha -->
      <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Entrenadores Pokemon</p>
      <!-- Descripción pequeña que indica de qué trata la tarjeta -->
      <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">2,300</h4>
      <!-- Número destacado, en este caso la cantidad de entrenadores Pokémon -->
    </div>

    <div class="border-t border-blue-gray-50 p-4">
      <!-- Separador horizontal (línea) y un contenedor adicional de texto con un mensaje sobre la tarjeta -->
      <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
        <strong class="text-green-500"></strong>Entrenadores Afiliados a Nuestra Liga
      </p>
      <!-- Descripción adicional que explica el contexto de la información en la tarjeta -->
    </div>
  </div>

  <!-- Otra tarjeta con estructura similar a la anterior, pero con un icono y color de fondo diferentes -->
  <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
    <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
      <!-- Icono circular con gradiente naranja -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-6 h-6 text-white">
        <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z"></path>
      </svg>
    </div>

    <div class="p-4 text-right">
      <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Pokemones Registrados</p>
      <!-- Descripción pequeña que indica de qué trata la tarjeta -->
      <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">103,430</h4>
      <!-- Número destacado, en este caso la cantidad de pokemones registrados -->
    </div>

    <div class="border-t border-blue-gray-50 p-4">
      <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
        <strong class="text-green-500"></strong>Gran veriedad de Pokemones
      </p>
      <!-- Descripción adicional con más contexto -->
    </div>
  </div>
</div>

<!-- Segunda sección con una tabla dentro de una tarjeta más grande -->
<div class="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
  <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
    <!-- Tarjeta de contenido más grande, ocupa el espacio de dos columnas en pantallas grandes -->

    <div class="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
      <!-- Contenedor para título y datos generales, sin sombra ni fondo -->
      <div>
        <h6 class="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-1">Projects</h6>
        <!-- Título de la sección dentro de la tarjeta -->
        <p class="antialiased font-sans text-sm leading-normal flex items-center gap-1 font-normal text-blue-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" aria-hidden="true" class="h-4 w-4 text-blue-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
          </svg>
          <strong>30 done</strong> this month
        </p>
        <!-- Información adicional sobre el progreso de proyectos -->
      </div>

      <button aria-expanded="false" aria-haspopup="menu" class="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
        <span class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currenColor" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" aria-hidden="true" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"></path>
          </svg>
        </span>
      </button>
      <!-- Botón que probablemente abre un menú, con un icono de tres barras -->
    </div>

    <div class="p-6 overflow-x-scroll px-0 pt-0 pb-2">
      <!-- Contenedor de una tabla con desplazamiento horizontal -->
      <table class="w-full table-auto">
        <thead class="text-xs text-gray-500 uppercase bg-blue-gray-50">
          <tr>
            <th class="px-6 py-3 text-left align-middle border-b border-blue-gray-100">Name</th>
            <th class="px-6 py-3 text-left align-middle border-b border-blue-gray-100">Gender</th>
            <th class="px-6 py-3 text-left align-middle border-b border-blue-gray-100">Total Captures</th>
            <th class="px-6 py-3 text-left align-middle border-b border-blue-gray-100">Gym Leader</th>
            <th class="px-6 py-3 text-left align-middle border-b border-blue-gray-100">Joined</th>
            <th class="px-6 py-3 text-left align-middle border-b border-blue-gray-100">Start Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-4 align-middle border-b border-blue-gray-100">
              <p class="text-sm font-semibold leading-tight text-blue-gray-900">Antonio Romero</p>
            </td>
            <td class="p-4 align-middle border-b border-blue-gray-100">
              <p class="text-sm leading-tight text-blue-gray-900">Macho</p>
            </td>
            <td class="p-4 align-middle border-b border-blue-gray-100">
              <p class="text-sm leading-tight text-blue-gray-900">158</p>
            </td>
            <td class="p-4 align-middle border-b border-blue-gray-100">
              <p class="text-sm leading-tight text-blue-gray-900">No</p>
            </td>
            <td class="p-4 align-middle border-b border-blue-gray-100">
              <p class="text-sm leading-tight text-blue-gray-900">2015</p>
            </td>
            <td class="p-4 align-middle border-b border-blue-gray-100">
              <p class="text-sm leading-tight text-blue-gray-900">01/01/2015</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

```


## Creacion del servicio para la interfaz general
```javascript
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/auth/login'; // URL de autenticación

  private currentUserSubject: BehaviorSubject<any>;
  currentUser$: Observable<any>;

  constructor(private http: HttpClient) {
    const isBrowser = typeof window !== 'undefined';
    const savedUser = isBrowser ? localStorage.getItem('currentUser') : null;

    this.currentUserSubject = new BehaviorSubject<any>(
      savedUser ? JSON.parse(savedUser) : null
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  // Obtener usuarios desde la API
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Establecer el usuario actual y guardarlo en localStorage
  setCurrentUser(user: any) {
    this.currentUserSubject.next(user);
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  // Limpiar el usuario actual
  clearCurrentUser() {
    this.currentUserSubject.next(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser');
    }
  }

  // Obtener el usuario actual
  getCurrentUser() {
    return this.currentUserSubject.value;
  }
}

```
## Asignación de Rutas 

```javascript
import { Routes } from '@angular/router'; // Importa el tipo Routes de Angular para definir las rutas de navegación.

export const routes: Routes = [
    {
        path: '', // Ruta vacía (raíz de la aplicación)
        redirectTo: 'login', // Si la ruta está vacía, redirige automáticamente a 'login'
        pathMatch: 'full' // El path vacío debe coincidir completamente para que ocurra la redirección
    },
    {
        path: '', // Otra ruta vacía, que carga un componente compartido (layout)
        loadComponent: () =>
            import('./shared/components/layout/layout.component') // Carga el componente 'Layout' de manera perezosa (lazy loading)
                .then(m => m.default), // Usa el componente cargado de manera perezosa
        children: [ // Rutas hijas bajo el componente 'Layout'
            {
                path: 'dashboard', // Ruta para el componente 'Dashboard'
                loadComponent: () =>
                    import('./business/dashboard/dashboard.component') // Carga el componente 'Dashboard' de manera perezosa
                        .then(m => m.default)
            },
            {
                path: 'profile', // Ruta para el componente 'Profile'
                loadComponent: () =>
                    import('./business/profile/profile.component') // Carga el componente 'Profile' de manera perezosa
                        .then(m => m.default)
            },
            {
                path: 'pokemones', // Ruta para el componente 'Pokemones'
                loadComponent: () =>
                    import('./business/tables/pokemones/pokemones.component') // Carga el componente 'Pokemones' de manera perezosa
                        .then(m => m.default)
            },
            {
                path: 'usuarios', // Ruta para el componente 'Usuarios'
                loadComponent: () =>
                    import('./business/tables/usuarios/usuarios.component') // Carga el componente 'Usuarios' de manera perezosa
                        .then(m => m.default)
            }
        ]
    },
    {
        path: 'login', // Ruta para el componente 'Login'
        loadComponent: () =>
            import('./business/authentication/login/login.component') // Carga el componente 'Login' de manera perezosa
                .then(m => m.default)
    },
    {
        path: 'register', // Ruta para el componente 'Register'
        loadComponent: () =>
            import('./business/authentication/register/register.component') // Carga el componente 'Register' de manera perezosa
                .then(m => m.default)
    },
    {
        path: '**', // Ruta comodín para capturar todas las rutas no definidas
        redirectTo: 'login' // Si no se encuentra la ruta, redirige a 'login'
    }
];
```

## COnfiguracion del componente Inicial

```javascript
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection(
    { eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(withFetch())
  ]
};
```
```html
<router-outlet />
```

## Configuracion del index

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>PaginaPokemones</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>
</body>
</html>
```
## Confuguración del main.ts 

```javascript
import { bootstrapApplication } from '@angular/platform-browser'; // Importa la función bootstrapApplication de Angular para iniciar la aplicación en el navegador.
import { appConfig } from './app/app.config'; // Importa la configuración de la aplicación desde el archivo 'app.config.ts'.
import { AppComponent } from './app/app.component'; // Importa el componente raíz de la aplicación 'AppComponent'.

// Utiliza la función bootstrapApplication para arrancar la aplicación.
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err)); // En caso de error durante la inicialización, lo captura y lo imprime en la consola.

```

## Importacion de Tailwind para estilo

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

