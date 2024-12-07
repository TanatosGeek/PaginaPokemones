import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/auth/login'; // URL de autenticación

  private currentUserSubject: BehaviorSubject<any>;
  currentUser$: Observable<any>;

  constructor(private http: HttpClient) {
    const isBrowser = typeof window !== 'undefined';
    const savedUser = isBrowser ? localStorage.getItem('currentUser') : null;

    this.currentUserSubject = new BehaviorSubject<any>(
      savedUser ? JSON.parse(savedUser) : null
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  // Obtener usuarios desde la API
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Establecer el usuario actual y guardarlo en localStorage
  setCurrentUser(user: any) {
    this.currentUserSubject.next(user);
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
