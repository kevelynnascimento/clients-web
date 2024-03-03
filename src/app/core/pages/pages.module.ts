import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsModule } from './clients/clients.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ClientsModule
  ],
  exports: [
    ClientsModule
  ]
})
export class PagesModule { }
