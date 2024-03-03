import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientsService } from '../../../services/clients/clients.service';
import { ClientsContextService } from '../../../services/clients/clients-context.service';
import { ClientFindingResponse } from '../../../dtos/clients/responses/client-finding.response';
import { FormControl, FormGroup } from '@angular/forms';
import moment from 'moment';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.css',
})
export class UpdateComponent {
  public clientForm: FormGroup = new FormGroup({
    code: new FormControl({ value: '', disabled: true }),
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

  public client: ClientFindingResponse = {} as ClientFindingResponse;

  constructor(
    private router: Router,
    private clientsService: ClientsService,
    private clientsContextService: ClientsContextService
  ) {}

  public async ngOnInit() {
    await this.load();
  }

  private async load() {
    const id = this.clientsContextService.getClientId();

    if (id) {
      const client = (this.client = await this.clientsService.findById(id));
      this.buildForm(client);
    }
  }

  private async buildForm(client: ClientFindingResponse) {
    if (!client) return;

    const isActive = !!!client?.disablingDate;

    this.clientForm.patchValue({
      code: client?.code,
      name: client?.name,
      email: client?.email,
      documentNumber: client?.documentNumber,
      phoneNumber: client?.phoneNumber,
      cellphoneNumber: client?.cellphoneNumber,
      gender: client?.gender,
      observation: client?.observation,
      isActive: isActive,
      birthday: moment(client?.birthday).toDate(),
    });
  }

  public navigateBack() {
    this.router.navigate(['/participantes']);
  }

  public async save() {
    const id = this.clientsContextService.getClientId();

    const {
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

    await this.clientsService.update(id, request);

    await this.router.navigate(['/participantes']);
  }
}
