import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle,
  IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonProgressBar, IonButton
} from '@ionic/angular/standalone';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink, IonHeader, IonToolbar, IonButtons, IonMenuButton,
    IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle,
    IonCardContent, IonProgressBar, IonButton
  ],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Tablero (Dashboard)</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Progreso de Tareas: {{ storage.porcentajeTareas() }}%</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-progress-bar [value]="storage.porcentajeTareas() / 100"></ion-progress-bar>
          <p>Total almacenadas localmente: {{ storage.tareas().length }}</p>
        </ion-card-content>
      </ion-card>

      <ion-button expand="block" routerLink="/tareas">Ir a Gestión de Tareas</ion-button>
      <ion-button expand="block" fill="outline" routerLink="/habitos">Ir a Hábitos Diarios</ion-button>
    </ion-content>
  `
})
export class DashboardPage {
  storage = inject(StorageService);
}
