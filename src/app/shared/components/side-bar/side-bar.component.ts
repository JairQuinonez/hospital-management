import { Component, input, OnInit, output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { LocalStorageService } from '../../../auth/services/local-storage.service';

export interface MenuItem {
  label: string;
  route: string;
  title: string;
  iconSvgPath: string; 
  viewBox?: string;     
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



  activeItemLabel: string = 'Citas'; 
  hospitalName: string = 'BIG TOWN HOSPITAL';
  isMenuOpen: boolean = true; 

  constructor(private router: Router,
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) { 
    
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
    
  }

  logout(): void {
    console.log('Logout action triggered');
    if (localStorage.getItem('userType') === 'dr') {
      this.authService.logout();

    } else {
      this.router.navigate(['/login']);
      this.localStorageService.clear();

    }
  }
}