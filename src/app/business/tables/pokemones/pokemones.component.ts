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

@Component({
  selector: 'app-pokemones',
  standalone: true,
  templateUrl: './pokemones.component.html',
  styleUrls: ['./pokemones.component.css'],
  imports: [NgFor, MatIconModule, MatButtonModule, MatDividerModule]
})
export default class PokemonesComponent implements OnInit{
  data: any[] = [];
  readonly dialog = inject(MatDialog);

  constructor(private pokemonservice: PokemonService){
  }

  ngOnInit(): void {
    this.pokemonservice.getPokemons().subscribe(resultado =>{
      this.data = resultado;
      this.updatePaginatedData();
    })
  }
  // data = [
  //   { id: 1, nombre: 'Pikachu', tipo: 'Eléctrico' },
  //   { id: 2, nombre: 'Charmander', tipo: 'Fuego' },
  //   { id: 3, nombre: 'Bulbasaur', tipo: 'Planta' },
  //   { id: 4, nombre: 'Squirtle', tipo: 'Agua' },
  //   { id: 5, nombre: 'Jigglypuff', tipo: 'Normal' },
  //   { id: 6, nombre: 'Meowth', tipo: 'Normal' },
  //   { id: 7, nombre: 'Pidgey', tipo: 'Volador' },
  //   { id: 8, nombre: 'Snorlax', tipo: 'Normal' },
  //   { id: 9, nombre: 'Gengar', tipo: 'Fantasma' },
  //   { id: 10, nombre: 'Eevee', tipo: 'Normal' },
  // ];
  pageSize = 5;
  currentPage = 1;
  paginatedData = this.data.slice(0, this.pageSize);

  get totalPages(): number {
    return Math.ceil(this.data.length / this.pageSize);
  }

  openInformacion(pokemon: any) {
    console.log("hola");
    const dialogRef = this.dialog.open(InformacionComponent, {
      width: "400px",
      data: pokemon,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

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
