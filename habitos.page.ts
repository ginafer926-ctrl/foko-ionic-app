import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle,
  IonContent, IonItem, IonInput, IonButton, IonList, IonLabel, IonCheckbox
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-habitos',
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle,
    IonContent, IonItem, IonInput, IonButton, IonList, IonLabel, IonCheckbox
  ],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Hábitos Diarios</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-item>
        <ion-input placeholder="Nuevo hábito diario..."></ion-input>
        <ion-button slot="end">Agregar</ion-button>
      </ion-item>

      <ion-list class="ion-margin-top">
        <ion-item>
          <ion-checkbox slot="start"></ion-checkbox>
          <ion-label>Ejemplo: Leer 20 minutos (Placeholder UI)</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  `
})
export class HabitosPage {}
