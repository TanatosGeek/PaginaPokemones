import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-informacion',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './informacion.component.html',
  styleUrl: './informacion.component.css'
})
export class InformacionComponent {
  @Input() data: any = {};
  @Input() isOpen = false; 
  @Output() close = new EventEmitter<void>(); 

  closeModal() {
    this.close.emit(); 
  }
}
