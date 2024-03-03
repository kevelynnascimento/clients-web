import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClientsContextService {
  private clientId: string = '';

  public setClientId(id: string): void {
    this.clientId = id;
  }

  public getClientId(): string {
    return this.clientId;
  }
}
