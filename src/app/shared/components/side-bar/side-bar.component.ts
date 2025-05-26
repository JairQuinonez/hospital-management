import { Component, input, OnInit, output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

export interface MenuItem {
  label: string;
  route: string;
  title: string;
  iconSvgPath: string; // Para la ruta 'd' de un SVG <path>
  viewBox?: string;     // Opcional, si no es el estándar 24x24
}


@Component({
  selector: 'app-side-bar',
  imports: [RouterLink],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent implements OnInit {
  menuToggled = output<boolean>();
  selectedLabel = output<string>();
  menuItems = input<MenuItem[]>([]);



  activeItemLabel: string = 'Citas'; // Para marcar el ítem activo
  hospitalName: string = 'BIG TOWN HOSPITAL';
  isMenuOpen: boolean = true; // Para un futuro control del menú hamburguesa

  constructor(private router: Router,) { 
    
  }

  ngOnInit(): void {
    this.selectedLabel.emit(this.menuItems()[0].title);
  }

  selectItem(itemLabel: string, title: string): void {
    this.activeItemLabel = itemLabel;
    this.selectedLabel.emit(title);
    console.log(`Item seleccionado: ${itemLabel}`);
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    console.log('Toggle menu clicked');
    // Implementar lógica para mostrar/ocultar menú si es necesario (ej. en móviles)
  }

  logout(): void {
    console.log('Logout action triggered');
    if (localStorage.getItem('userType') === 'dr') {
      this.router.navigate(['/login-dr']);

    } else {
      this.router.navigate(['/login']);

    }
  }
}