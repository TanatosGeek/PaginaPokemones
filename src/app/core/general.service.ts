import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  private apiUrl = 'http://127.0.0.1:8000/api/usuarios'; // URL de la API
  private currentUserSubject = new BehaviorSubject<any | null>(null); // Estado del usuario

  constructor(private http: HttpClient) {}

  // Obtener usuarios desde la API
  getUsers(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.usuarios), // Extrae directamente los usuarios
      catchError(this.handleError)
    );
  }
  

  // Guardar datos del usuario autenticado
  setCurrentUser(user: any): void {
    this.currentUserSubject.next(user);
  }

  // Obtener datos del usuario autenticado
  getCurrentUser(): Observable<any | null> {
    return this.currentUserSubject.asObservable();
  }

  // Actualizar usuario
  updateUser(userId: string, updatedData: any): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    
    return this.http.put<any>(url, updatedData).pipe(
      map(response => response.usuario), // Extrae la propiedad "usuario" si está anidada
      catchError(this.handleError)
    );
  }
  

  // Manejar errores HTTP
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error desconocido';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Error código ${error.status}: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  // Registrar usuario
registerUser(userData: any): Observable<any> {
  return this.http.post<any>(this.apiUrl, userData).pipe();
}

}

