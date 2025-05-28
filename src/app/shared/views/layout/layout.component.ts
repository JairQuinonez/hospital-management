import { Component, input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem, SideBarComponent } from '../../components/side-bar/side-bar.component';
import { TopBarComponent } from '../../components/top-bar/top-bar.component';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, SideBarComponent, TopBarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {

  currentPageTitle = input<string>('Título de Página');
  title: string = '';
  userType = input<string>('general');
  menuItems = input<MenuItem[]>([]);
  userName = input<string>('Nombre Usuario');

  isSidebarCollapsed: boolean = false;
  currentUser = { name: 'Nombre Usuario' };
  ngOnInit(): void {
    this.title = this.currentPageTitle();
  }
  onSidebarToggle(isMenuOpen: boolean): void {
    this.isSidebarCollapsed = !isMenuOpen;
  }
  onSelectTitle(title: string): void {
    this.title = title;
    console.log('Selected title:', title);
  }
}
