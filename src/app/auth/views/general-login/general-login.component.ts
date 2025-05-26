import { Component } from '@angular/core';
import { BackgroundShapeComponent } from "../../../shared/components/background-shape/background-shape.component";
import { LoginCoverComponent } from "../../components/login-cover/login-cover.component";
import { LoginBoxComponent } from "../../components/login-box/login-box.component";

@Component({
  selector: 'app-general-login',
  imports: [BackgroundShapeComponent, LoginCoverComponent, LoginBoxComponent],
  templateUrl: './general-login.component.html',
  styleUrl: './general-login.component.scss'
})
export class GeneralLoginComponent {

}
