import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private isLoading = new BehaviorSubject<boolean>(false);
  private customMessage = new BehaviorSubject<string | null>(null);


  public readonly isLoading$: Observable<boolean> = this.isLoading.asObservable();
  public readonly customMessage$: Observable<string | null> = this.customMessage.asObservable();

  constructor() { }

  show(message: string | null = null): void {
    this.customMessage.next(message);
    this.isLoading.next(true);
  }

  hide(): void {
    this.isLoading.next(false);
    this.customMessage.next(null); 
  }

 
  getIsLoading(): boolean {
    return this.isLoading.getValue();
  }
}
