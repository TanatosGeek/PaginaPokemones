import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { PokemonService } from '../../../core/pokemon.service';
import { GeneralService } from '../../../core/general.service';
import { EditarUsuarioComponent } from '../modalUsuarios/editar-usuario/editar-usuario.component';
import { AgregarUsuarioComponent } from '../modalUsuarios/agregar-usuario/agregar-usuario.component';
import { EliminarUsuarioComponent } from '../modalUsuarios/eliminar-usuario/eliminar-usuario.component';
import { InfoUsuarioComponent } from '../modalUsuarios/info-usuario/info-usuario.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NgFor,
    EditarUsuarioComponent,
    AgregarUsuarioComponent,
    EliminarUsuarioComponent,
    InfoUsuarioComponent,
  ],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export default class UsuariosComponent {
  data: any[] = [];
  selectedUsuario: any = null;
  isInformacionOpen = false;
  isEliminarOpen = false;
  isEditarOpen = false;
  isAddOpen = false;

  pageSize = 5;
  currentPage = 1;
  paginatedData: any[] = [];
  buscar = '';

  constructor(
    private pokemonService: PokemonService,
    private generalService: GeneralService
  ) {}

  ngOnInit(): void {
    this.generalService.getUsers2().subscribe((resultado) => {
      this.data = resultado;
      this.updatePaginatedData();
    });
  }

  get totalPages(): number {
    return Math.ceil(this.data.length / this.pageSize);
  }

  buscarUsuarios(): void {
    if (this.buscar !== '') {
      this.generalService.buscarUsuario(this.buscar).subscribe(
        (resultado) => {
          this.data = resultado;
          this.updatePaginatedData();
        },
        (error) => {
          console.error('Error al buscar el Usuario:', error);
        }
      );
    } else {
      this.ngOnInit();
    }
  }

  openModalInformacion(usuario: any): void {
    this.selectedUsuario = usuario;
    this.isInformacionOpen = true;
  }

  closeModalInformacion(): void {
    this.selectedUsuario = null;
    this.isInformacionOpen = false;
  }

  openModalEditar(usuario: any): void {
    this.selectedUsuario = usuario;
    this.isEditarOpen = true;
  }

  closeModalEditar(): void {
    this.selectedUsuario = null;
    this.isEditarOpen = false;
  }

  openModalEliminar(usuario: any): void {
    this.selectedUsuario = usuario;
    this.isEliminarOpen = true;
  }

  closeModalEliminar(): void {
    this.selectedUsuario = null;
    this.isEliminarOpen = false;
  }

  eliminarUsuario(usuario: any): void {
    this.generalService.deleteUser(usuario.id).subscribe(
      () => {
        this.ngOnInit();
        this.closeModalEliminar();
      },
      (error) => {
        console.error('Error al eliminar el usuario:', error);
      }
    );
  }

  openModalAgregar(): void {
    this.isAddOpen = true;
  }

  closeModalAgrega(): void {
    this.isAddOpen = false;
  }

  editarUsuario(usuario: any): void {
    this.generalService.updateUser(usuario.id, usuario).subscribe(
      () => {
        this.ngOnInit();
      },
      (error) => {
        console.error('Error al editar el Usuario:', error);
      }
    );
  }

  numeroPokemons(event: any): void {
    this.pageSize = parseInt(event.target.value, 10);
    this.currentPage = 1;
    this.updatePaginatedData();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedData();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedData();
    }
  }

  updatePaginatedData(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedData = this.data.slice(startIndex, startIndex + this.pageSize);
  }
}
