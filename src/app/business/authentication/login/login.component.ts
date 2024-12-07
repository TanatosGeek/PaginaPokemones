import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../../../core/general.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export default class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private generalService: GeneralService) {}

  // Método para validar el formato de correo electrónico
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Método para manejar el inicio de sesión
  iniciarPagina() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Ingrese los valores.';
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.errorMessage = 'El formato del correo no es válido.';
      return;
    }

    this.generalService.getUsers().subscribe({
      next: (response) => {
        // La respuesta incluye los usuarios dentro de "response.usuarios"
        const users = response;
    
        // Buscar al usuario en el arreglo de usuarios
        const user = users.find(u => u.email === this.email && u.password === this.password);
        
        if (user) {
          this.generalService.setCurrentUser(user); // Guardar el usuario autenticado
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'No hay ningún usuario asociado con esos datos.';
        }
      },
      error: (error) => {
        console.error('Error al obtener los usuarios', error);
        this.errorMessage = 'Error en los servidores, vuelva a intentar más tarde.';
      }
    });
    
  }
}
