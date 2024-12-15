import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './agrega.component.html',
  styleUrl: './agrega.component.css'
})
export class AgregaComponent {

  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Output() confirmar = new EventEmitter<any>();

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

  agregarPokemon() {
    this.confirmar.emit(this.pokemon); 
    this.closeModal();
  }
  closeModal() {
    this.close.emit(); 
  }

  agregarHabilidad() {
    if (this.habilidad) {
      const nuevaHabilidad = { ...this.habilidad };
      this.pokemon.habilidades.push(nuevaHabilidad);
      this.habilidad.nombre = '';
      this.habilidad.descripcion = '';
    }
  }

  eliminarHabilidad(habilidad: any) {
    this.pokemon.habilidades = this.pokemon.habilidades.filter(h => h !== habilidad);
  }
}

