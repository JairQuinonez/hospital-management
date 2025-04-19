import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor () {
    this.setDefaultUserInfo();  
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

  setAuthValidation(value: boolean): void {
    localStorage.setItem('authValidation', JSON.stringify(value));
  }

  getAuthValidation(): boolean {
    const item = localStorage.getItem('authValidation');
    return item ? JSON.parse(item) : false;
  }

  setDefaultUserInfo(){
    console.log('Default user info is being set');
    localStorage.setItem('userInfo', JSON.stringify({
      name: 'Test User',
      email: 'test@test.com',
      picture: '',
      given_name: 'Test',
      password: '1234'
    }));  
  }

  getDefaultUserInfo(): any {
    return this.getItem<any>('userInfo');
  }
}