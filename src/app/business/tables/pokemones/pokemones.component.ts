import { Component, inject, OnInit } from '@angular/core';
import { NgFor } from '@angular/common'; // Importamos NgFor directamente
import { PokemonService } from '../../../core/pokemon.service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {
  MatDialog,
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { InformacionComponent } from '../modal/informacion/informacion.component';
import { EliminarComponent } from '../modal/eliminar/eliminar.component';
import { EditarComponent } from '../modal/editar/editar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pokemones',
  standalone: true,
  templateUrl: './pokemones.component.html',
  styleUrls: ['./pokemones.component.css'],
  imports: [FormsModule,EditarComponent,NgFor, MatIconModule, MatButtonModule, MatDividerModule, InformacionComponent, EliminarComponent]
})
export default class PokemonesComponent implements OnInit{
  data: any[] = []; 
  selectedPokemon: any = null; 
  isInformacionOpen = false;
  isEliminarOpen = false;
  isEditarOpen = false;

  constructor(private pokemonservice: PokemonService){
  }

  ngOnInit(): void {
    this.pokemonservice.getPokemons().subscribe(resultado =>{
      this.data = resultado;
      this.updatePaginatedData();
    })
  }
  
  pageSize = 5;
  currentPage = 1;
  paginatedData = this.data.slice(0, this.pageSize);
  buscar = "";

  get totalPages(): number {
    return Math.ceil(this.data.length / this.pageSize);
  }

  buscarPokemon(){
    if(this.buscar != ""){
      this.pokemonservice.buscarPokemon(this.buscar).subscribe(resultado => {
        this.data = resultado;
        this.updatePaginatedData();
      }, (error) => {
        console.error('Error al buscar el pokemon:', error);
      })
    }else{
      this.ngOnInit();
    }
    
  }
  openModalInformacion(pokemon: any) {
    this.selectedPokemon = pokemon;
    console.log(pokemon);
    this.isInformacionOpen = true;
  }

  closeModalInformacion() {
    this.selectedPokemon = null;
    this.isInformacionOpen = false;
  }

  openModalEditar(pokemon: any) {
    this.selectedPokemon = pokemon;
    console.log(pokemon);
    this.isEditarOpen = true;
  }

  closeModalEditar() {
    this.selectedPokemon = null;
    this.isEditarOpen = false;
  }

  openModalEliminar(pokemon: any) {
    this.selectedPokemon = pokemon;
    console.log(pokemon);
    this.isEliminarOpen = true;
  }

  closeModalEliminar() {
    this.selectedPokemon = null;
    this.isEliminarOpen = false;
  }

  eliminarPokemon(pokemon: any) {
    this.pokemonservice.eliminarPokemon(pokemon.id).subscribe(() => {
      this.ngOnInit();
      this.updatePaginatedData(); 
      this.closeModalEliminar();
    }, (error) => {
      console.error('Error al eliminar el Pokémon:', error);
    });
  }

  editarPokemon(pokemon: any) {
    this.pokemonservice.editarPokemon(pokemon).subscribe(() => {
      console.log('Pokémon ditado');
      this.ngOnInit();
    }, (error) => {
      console.error('Error al editar el Pokémon:', error);
    });
  }


  numeroPokemons(event: any): void {
    this.pageSize = parseInt(event.target.value, 10);
    this.currentPage = 1;
    this.updatePaginatedData();
  }

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

  updatePaginatedData(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedData = this.data.slice(startIndex, endIndex);
  }
}
