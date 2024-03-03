import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesModule } from './services/services.module';
import { PagesModule } from './pages/pages.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ServicesModule,
    PagesModule
  ]
})
export class CoreModule { }
