import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../../core/general.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isDropdownOpen = false;
  user: any = {
    name: 'Guest',
    avatar: 'https://default-avatar-url.com/default-avatar.png',
  };

  constructor(private generalService: GeneralService) {}

  ngOnInit(): void {
    this.generalService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.user = user; // Actualiza los datos del usuario
      }
    });
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
