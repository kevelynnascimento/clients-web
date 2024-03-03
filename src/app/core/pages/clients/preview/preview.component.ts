import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientsService } from '../../../services/clients/clients.service';
import { ClientsContextService } from '../../../services/clients/clients-context.service';
import { ClientFindingResponse } from '../../../dtos/clients/responses/client-finding.response';
import { FormControl, FormGroup } from '@angular/forms';
import moment from 'moment';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css',
})
export class PreviewComponent {
  public clientForm: FormGroup = new FormGroup({
    code: new FormControl({ value: '', disabled: true }),
    name: new FormControl({ value: '', disabled: true }),
    email: new FormControl({ value: '', disabled: true }),
    documentNumber: new FormControl({ value: '', disabled: true }),
    phoneNumber: new FormControl({ value: '', disabled: true }),
    cellphoneNumber: new FormControl({ value: '', disabled: true }),
    gender: new FormControl({ value: '', disabled: true }),
    observation: new FormControl({ value: '', disabled: true }),
    isActive: new FormControl({ value: '', disabled: true }),
    birthday: new FormControl({ value: '', disabled: true }),
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
}
