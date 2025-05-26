import { Component } from '@angular/core';
import { LoginBoxComponent } from '../../components/login-box/login-box.component';
import { LoginCoverComponent } from '../../components/login-cover/login-cover.component';
import { BackgroundShapeComponent } from "../../../shared/components/background-shape/background-shape.component";

@Component({
  selector: 'app-login',
  imports: [LoginBoxComponent, LoginCoverComponent, BackgroundShapeComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
