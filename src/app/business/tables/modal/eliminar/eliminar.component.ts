import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-eliminar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './eliminar.component.html',
  styleUrl: './eliminar.component.css'
})
export class EliminarComponent {

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
}
