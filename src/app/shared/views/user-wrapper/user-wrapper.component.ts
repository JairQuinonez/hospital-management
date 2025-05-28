import { Component, OnInit } from '@angular/core';
import { LayoutComponent } from "../layout/layout.component";
import { MenuItem } from '../../components/side-bar/side-bar.component';
import { LocalStorageService } from '../../../auth/services/local-storage.service';
import { IUserInfo } from '../../../doctor/views/doctor-dashboard/doctor-dashboard.component';

@Component({
  selector: 'app-user-wrapper',
  imports: [LayoutComponent],
  templateUrl: './user-wrapper.component.html',
  styleUrl: './user-wrapper.component.scss'
})
export class UserWrapperComponent implements OnInit {
  user: string = 'dr'
  userName: string = 'NOT Test User';

  constructor(
    private localStorageService: LocalStorageService
  ) {
    this.user = localStorage.getItem('userType') || 'dr';

  }
  menuItems: MenuItem[] = [];
  ngOnInit(): void {
    this.userName = this.localStorageService.getItem<IUserInfo>('userInfo')?.given_name ?? 'Test NOO User';

    if (this.user === 'dr') {
      this.menuItems = [
        {
          title: 'GESTION DE CITAS',
          label: 'Citas',
          route: '/layout-dr/appointments-dr',
          iconSvgPath: 'M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM7 11h2v2H7v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z',
          viewBox: '0 0 24 24'
        },
        {
          label: 'Historia Clinica',
          route: '/layout-dr/historial-dr',
          title: 'HISTORIA CLINICA',
          iconSvgPath: 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z',
          viewBox: '0 0 24 24'
        }
      ];
    } else {
      this.menuItems = [
        {
          title: 'GESTION DE CITAS',
          label: 'Citas',
          route: '/layout/appointments',
          iconSvgPath: 'M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM7 11h2v2H7v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z',
          viewBox: '0 0 24 24'
        },
        {
          label: 'Historia Clinica',
          route: '/layout/historial-pa',
          title: 'HISTORIA CLINICA',
          iconSvgPath: 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z',
          viewBox: '0 0 24 24'
        }
      ];
    }
  }

}
