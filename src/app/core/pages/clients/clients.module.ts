import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ListingComponent } from './listing/listing.component';
import { CreationComponent } from './creation/creation.component';
import { UpdateComponent } from './update/update.component';
import { PreviewComponent } from './preview/preview.component';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';

const routes: Routes = [
  { path: '', component: ListingComponent },
  { path: 'participantes', component: ListingComponent },
  { path: 'participantes/visualizacao', component: PreviewComponent },
  { path: 'participantes/atualizacao', component: UpdateComponent },
  { path: 'participantes/cadastro', component: CreationComponent },
];

@NgModule({
  declarations: [
    ListingComponent,
    CreationComponent,
    UpdateComponent,
    PreviewComponent,
  ],
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatPaginatorModule,
    MatPaginator,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatMenuModule,
    ReactiveFormsModule,
    DatePipe,
  ],
  exports: [RouterModule],
})
export class ClientsModule {}
