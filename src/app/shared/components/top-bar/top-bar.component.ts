import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  imports: [],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {
  pageTitle = input<string>('Título de Página') ; // Título que se mostrará
  userName= input<string>('Nombre usuario');   // Nombre del usuario

  userAreaClicked = output<void>(); // Evento si se hace clic en el área del usuario

  constructor() { }

  onUserAreaClick(): void {
    console.log('User area clicked');
    this.userAreaClicked.emit();
    // Aquí podrías implementar la lógica para un menú desplegable del usuario, etc.
  }

}
