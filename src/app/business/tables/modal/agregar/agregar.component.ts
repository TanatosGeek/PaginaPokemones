import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './agregar.component.html',
  styleUrl: './agregar.component.css'
})
export class AgregarComponent  {

  @Input() data: any = {};
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Output() confirmar = new EventEmitter<any>();

  pokemon = {
    "id": 2,
    "nombre": "Charmander3131",
    "avatar": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
    "descripcion": "Un Pokémon de tipo fuego con una cola en llamas.",
    "peso": 9,
    "altura": 1,
    "hp": 39,
    "ataque": 52,
    "defensa": 43,
    "ataque_especial": 60,
    "defensa_especial": 50,
    "velocidad": 65,
    "created_at": null,
    "updated_at": null,
    "habilidades": [
      {
        "id": 2,
        "nombre": "Llamarada2",
        "descripcion": "Un ataque de fuego que puede quemar al objetivo.",
        "created_at": null,
        "updated_at": null,
        "pivot": {
          "pokemon_id": 2,
          "habilidad_id": 2
        }
      }
    ]
  }

    editarPokemon(){
      
    }
}
