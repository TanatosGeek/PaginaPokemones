import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl = 'http://127.0.0.1:8000/api/pokemons'; 


  constructor(private http: HttpClient) {
  }

  getPokemons(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.pokemons)
    );
  }

  buscarPokemon(nombre: any): Observable<any[]> {
    return this.http.get<any>(this.apiUrl+'/buscar/'+nombre).pipe(
      map(response => response.pokemons)
    );
  }

  eliminarPokemon(id: any){
    return this.http.delete<any>(this.apiUrl+'/'+id);
  }

  editarPokemon(pokemon:any){
    return this.http.put<any>(this.apiUrl+'/'+pokemon.id,pokemon);
  }

  agregarPokemon(pokemon:any){
    return this.http.post<any>(this.apiUrl,pokemon);
  }
}

