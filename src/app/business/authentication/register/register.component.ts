import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GeneralService } from '../../../core/general.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export default class RegisterComponent {
  user: any = {
    name: '',
    apellidoP: '',
    apellidoM: '',
    email: '',
    password: '',
    phone: '',
    avatar: '', // URL del avatar
  };
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private generalService: GeneralService, private router: Router) {}

  // Método para registrar un nuevo usuario
  register() {
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/;
    const phoneRegex = /^\d{10}$/;
    const urlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/;

    // Validaciones básicas
    if (
      !this.user.name ||
      !this.user.apellidoP ||
      !this.user.apellidoM ||
      !this.user.email ||
      !this.user.password ||
      !this.user.phone ||
      !this.user.avatar
    ) {
      this.errorMessage = 'Por favor, complete todos los campos.';
      return;
    }

    if (
      !nameRegex.test(this.user.name) ||
      !nameRegex.test(this.user.apellidoP) ||
      !nameRegex.test(this.user.apellidoM)
    ) {
      this.errorMessage =
        'Los nombres y apellidos deben tener al menos 3 caracteres y solo contener letras y espacios.';
      return;
    }

    if (!phoneRegex.test(this.user.phone)) {
      this.errorMessage =
        'El número de teléfono debe tener exactamente 10 dígitos.';
      return;
    }

    if (!urlRegex.test(this.user.avatar)) {
      this.errorMessage = 'Por favor, ingrese una URL válida para el avatar.';
      return;
    }

    // Llamada al servicio para registrar el usuario
    this.generalService.registerUser(this.user).subscribe(
      (response) => {
        this.successMessage = '¡Registro exitoso! Redirigiendo al inicio de sesión...';
        this.errorMessage = '';
        setTimeout(() => this.router.navigate(['/login']), 2000); // Redirige tras 2 segundos
      },
      (error) => {
        console.error('Error al registrar usuario:', error);

        // Manejo del error específico para el correo ya registrado
        if (error.status === 400 && error.error.errors?.email) {
          this.errorMessage = 'El correo electrónico ya está en uso. Por favor, intente con otro.';
        } else {
          this.errorMessage = 'Ocurrió un error inesperado. Intente nuevamente.';
        }
        this.successMessage = '';
      }
    );
  }
}
