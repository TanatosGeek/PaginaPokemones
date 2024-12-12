import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-info-usuario',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './info-usuario.component.html',
  styleUrl: './info-usuario.component.css'
})
export class InfoUsuarioComponent {
  @Input() data: any = {};
  @Input() isOpen = false; 
  @Output() close = new EventEmitter<void>(); 

  closeModal() {
    this.close.emit(); 
  }
}
