import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientsService } from '../../../services/clients/clients.service';
import { FormControl, FormGroup } from '@angular/forms';
import moment from 'moment';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrl: './creation.component.css',
})
export class CreationComponent {
  public clientForm: FormGroup = new FormGroup({
    code: new FormControl(),
    name: new FormControl(),
    email: new FormControl(),
    documentNumber: new FormControl(),
    phoneNumber: new FormControl(),
    cellphoneNumber: new FormControl(),
    gender: new FormControl(),
    observation: new FormControl(),
    isActive: new FormControl(),
    birthday: new FormControl(),
  });

  constructor(private router: Router, private clientsService: ClientsService) {}

  public navigateBack() {
    this.router.navigate(['/participantes']);
  }

  public async save() {
    const {
      code,
      name,
      email,
      documentNumber,
      phoneNumber,
      cellphoneNumber,
      gender,
      birthday,
      observation,
      isActive,
    } = this.clientForm.value;

    const request = {
      code,
      name,
      email,
      documentNumber,
      phoneNumber,
      cellphoneNumber,
      gender,
      birthday: moment(birthday).format('YYYY-MM-DDTHH:mm:ss.SSSSSS'),
      observation,
      isActive,
    };

    await this.clientsService.create(request);

    await this.router.navigate(['/participantes']);
  }
}
