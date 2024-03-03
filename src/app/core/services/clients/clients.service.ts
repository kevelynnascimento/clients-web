import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import ClientListingResponse from '../../dtos/clients/responses/client-listing.response';
import { ClientFindingResponse } from '../../dtos/clients/responses/client-finding.response';
import { ClientUpdateRequest } from '../../dtos/clients/requests/client-update.request';
import { ClientCreationRequest } from '../../dtos/clients/requests/client-creation.request';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private apiUrl = 'http://localhost:8080/clients';

  constructor(private http: HttpClient) {}

  public async findById(id: string): Promise<ClientFindingResponse> {
    const observable = this.http.get<ClientFindingResponse>(
      `${this.apiUrl}/${id}`
    );
    const client = await lastValueFrom(observable);
    return client;
  }

  public async findAll(): Promise<ClientListingResponse[]> {
    const observable = this.http.get<ClientListingResponse[]>(this.apiUrl);
    const clients = await lastValueFrom(observable);
    return clients;
  }

  public async disable(id: string): Promise<void> {
    const observable = this.http.post<ClientListingResponse[]>(
      `${this.apiUrl}/${id}/disabling`,
      {}
    );

    await lastValueFrom(observable);

    alert('Cliente desativado com sucesso.');
  }

  public async create(request: ClientCreationRequest): Promise<void> {
    const observable = this.http.post<ClientListingResponse[]>(
      `${this.apiUrl}`,
      request
    );

    await lastValueFrom(observable);

    alert('Cliente criado com sucesso.');
  }

  public async update(id: string, request: ClientUpdateRequest): Promise<void> {
    const observable = this.http.put<ClientListingResponse[]>(
      `${this.apiUrl}/${id}`,
      request
    );

    await lastValueFrom(observable);

    alert('Cliente atualizado com sucesso.');
  }
}
