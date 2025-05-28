import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  imports: [],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {
  pageTitle = input<string>('Título de Página') ; 
  userName= input<string>('Nombre usuario');   

  userAreaClicked = output<void>(); 

  constructor() { }

  onUserAreaClick(): void {
    console.log('User area clicked');
    this.userAreaClicked.emit();
  }

}
