import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardModalPageRoutingModule } from './card-modal-routing.module';

import { CardModalPage } from './card-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardModalPageRoutingModule
  ],
  declarations: [CardModalPage]
})
export class CardModalPageModule {}
