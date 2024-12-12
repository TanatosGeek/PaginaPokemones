import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agregar-usuario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './agregar-usuario.component.html',
  styleUrl: './agregar-usuario.component.css'
})
export class AgregarUsuarioComponent {
  errorMessage: string = '';
  successMessage: string = '';

  @Input() data: any = {};
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Output() confirmar = new EventEmitter<any>();

  user: any = {};

  ngOnChanges(changes: SimpleChanges): void {
    this.errorMessage = '';
    this.successMessage = '';
    if (changes['data'] && changes['data'].currentValue) {
      // Realiza una clonación profunda de data
      this.user = JSON.parse(JSON.stringify(this.data));
    }
  }

  closeModal() {
    this.close.emit();
  }

  register() {
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/;
    const phoneRegex = /^\d{10}$/;
    const urlRegex = /^(https?:\/\/)?([\w\-])+(\.[\w\-]+)+[/#?]?.*$/; // Validación básica para URL

    // Validaciones
    if (!this.user.name || !nameRegex.test(this.user.name)) {
      this.errorMessage = 'El nombre es inválido. Debe contener al menos 3 letras.';
      return;
    }
    if (!this.user.apellidoP || !nameRegex.test(this.user.apellidoP)) {
      this.errorMessage = 'El apellido paterno es inválido.';
      return;
    }
    if (!this.user.apellidoM || !nameRegex.test(this.user.apellidoM)) {
      this.errorMessage = 'El apellido materno es inválido.';
      return;
    }
    if (!this.user.phone || !phoneRegex.test(this.user.phone)) {
      this.errorMessage = 'El teléfono debe tener exactamente 10 dígitos.';
      return;
    }
    if (!this.user.avatar || !urlRegex.test(this.user.avatar)) {
      this.errorMessage = 'La URL del avatar es inválida. Debe ser un enlace válido.';
      return;
    }
    this.errorMessage = '';
    this.successMessage = '';
    this.successMessage = '¡Registro exitoso!';
    this.confirmar.emit(this.user);
    setTimeout(() => this.closeModal(), 1000);
  }
}
