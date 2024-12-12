import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-eliminar-usuario',
  standalone: true,
  imports: [NgIf],
  templateUrl: './eliminar-usuario.component.html',
  styleUrl: './eliminar-usuario.component.css'
})
export class EliminarUsuarioComponent {
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
