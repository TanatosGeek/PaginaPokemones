import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent implements OnChanges{

  @Input() data: any = {};
  @Input() isOpen = false; 
  @Output() close = new EventEmitter<void>(); 
  @Output() confirmar = new EventEmitter<any>();

  pokemon: any = {}; 

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      // Realiza una clonación profunda de data
      this.pokemon = JSON.parse(JSON.stringify(this.data));
    }
  }

  closeModal() {
    console.log(this.pokemon);
    this.close.emit(); 
  }

  editarPokemon() {
    this.confirmar.emit(this.pokemon); 
    this.closeModal();
  }
  
}
