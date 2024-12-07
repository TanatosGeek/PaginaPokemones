import { Component } from '@angular/core';
import { NgFor } from '@angular/common'; // Importamos NgFor directamente

@Component({
  selector: 'app-pokemones',
  standalone: true,
  templateUrl: './pokemones.component.html',
  styleUrls: ['./pokemones.component.css'],
  imports: [NgFor]
})
export default class PokemonesComponent {
  data = [
    { id: 1, nombre: 'Pikachu', tipo: 'Eléctrico' },
    { id: 2, nombre: 'Charmander', tipo: 'Fuego' },
    { id: 3, nombre: 'Bulbasaur', tipo: 'Planta' },
    { id: 4, nombre: 'Squirtle', tipo: 'Agua' },
    { id: 5, nombre: 'Jigglypuff', tipo: 'Normal' },
    { id: 6, nombre: 'Meowth', tipo: 'Normal' },
    { id: 7, nombre: 'Pidgey', tipo: 'Volador' },
    { id: 8, nombre: 'Snorlax', tipo: 'Normal' },
    { id: 9, nombre: 'Gengar', tipo: 'Fantasma' },
    { id: 10, nombre: 'Eevee', tipo: 'Normal' },
  ];
  pageSize = 10;
  currentPage = 1;
  paginatedData = this.data.slice(0, this.pageSize);

  get totalPages(): number {
    return Math.ceil(this.data.length / this.pageSize);
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
