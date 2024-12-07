import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlLogin = 'http://127.0.0.1:8000/api/usuarios';

  private currentUserSubject: BehaviorSubject<any>;
  currentUser$: Observable<any>;

  constructor(private httpClient:HttpClient, private router:Router) {
    const isBrowser = typeof window !== 'undefined';
    const savedUser = isBrowser ? localStorage.getItem('currentUser') : null;
    
    this.currentUserSubject = new BehaviorSubject<any>(savedUser ? JSON.parse(savedUser) : null);
    this.currentUser$ = this.currentUserSubject.asObservable();
   }
  
   // Obtener usuarios desde la API
  getUsers(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.urlLogin);
  }

  // Establecer el usuario actual y guardarlo en localStorage
  setCurrentUser(user: any) {
    this.currentUserSubject.next(user);
    // Verifica si estamos en el navegador antes de acceder a localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  // Limpiar el usuario actual
  clearCurrentUser() {
    this.currentUserSubject.next(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser');
    }
  }

  // Obtener el usuario actual
  getCurrentUser() {
    return this.currentUserSubject.value;
  }

}
