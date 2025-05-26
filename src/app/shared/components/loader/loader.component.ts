import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  message: string | null = null;
  private loadingSubscription!: Subscription;
  private messageSubscription!: Subscription;

   constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.loadingSubscription = this.loaderService.isLoading$.subscribe(
      (status: boolean) => {
        this.isLoading = status;
      }
    );
    this.messageSubscription = this.loaderService.customMessage$.subscribe(
      (msg: string | null) => {
        this.message = msg;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }

}
