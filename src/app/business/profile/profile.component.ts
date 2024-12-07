import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../core/general.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,
    FormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export default class ProfileComponent implements OnInit {
  user: any = {};
  errorMessage: string = '';

  constructor(private generalService: GeneralService, private router: Router) {}

  ngOnInit(): void {
    // Obtener los datos del usuario actual
    this.generalService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.user = { ...user }; // Copiar los datos del usuario para editarlos
      }
    });
  }

  // Método para actualizar los datos del usuario
  updateProfile() {
    // Expresión regular para validar el nombre
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/;
  
    // Expresión regular para validar el teléfono (exactamente 10 dígitos)
    const phoneRegex = /^\d{10}$/;
  
    // Validar campos requeridos
    if (
      !this.user.name ||
      !this.user.avatar ||
      !this.user.apellidoP ||
      !this.user.apellidoM ||
      !this.user.password ||
      !this.user.phone
    ) {
      this.errorMessage = 'Por favor, complete todos los campos.';
      return;
    }
  
    // Validar el nombre con expresión regular
    if (!nameRegex.test(this.user.name)) {
      this.errorMessage =
        'El nombre debe tener al menos 3 caracteres y solo puede contener letras y espacios.';
      return;
    }
  
    // Validar el número de teléfono con expresión regular
    if (!phoneRegex.test(this.user.phone)) {
      this.errorMessage =
        'El número de teléfono debe tener exactamente 10 dígitos.';
      return;
    }
  
    // Crear un objeto con los campos permitidos
    const userData = {
      name: this.user.name,
      avatar: this.user.avatar,
      apellidoP: this.user.apellidoP,
      apellidoM: this.user.apellidoM,
      password: this.user.password,
      phone: this.user.phone,
    };
  
    // Llamar a la API para actualizar los datos del usuario
    this.generalService.updateUser(this.user.id, userData).subscribe(
      (updatedUser) => {
        this.generalService.setCurrentUser(updatedUser); // Guardar los datos actualizados
        this.router.navigate(['/dashboard']); // Redirigir al dashboard o alguna otra página
      },
      (error) => {
        console.error('Error al actualizar los datos', error);
        this.errorMessage =
          'Hubo un error al actualizar los datos. Inténtelo nuevamente más tarde.';
      }
    );
  }
  
  
  
}
