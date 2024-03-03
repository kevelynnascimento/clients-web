import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ClientsService } from "../../../services/clients/clients.service";
import ClientListingResponse from "../../../dtos/clients/responses/client-listing.response";
import { ClientsContextService } from "../../../services/clients/clients-context.service";
import moment from "moment";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: "Hydrogen", weight: 1.0079, symbol: "H" },
  { position: 2, name: "Helium", weight: 4.0026, symbol: "He" },
  { position: 3, name: "Lithium", weight: 6.941, symbol: "Li" },
  { position: 4, name: "Beryllium", weight: 9.0122, symbol: "Be" },
  { position: 5, name: "Boron", weight: 10.811, symbol: "B" },
  { position: 6, name: "Carbon", weight: 12.0107, symbol: "C" },
  { position: 7, name: "Nitrogen", weight: 14.0067, symbol: "N" },
  { position: 8, name: "Oxygen", weight: 15.9994, symbol: "O" },
  { position: 9, name: "Fluorine", weight: 18.9984, symbol: "F" },
  { position: 10, name: "Neon", weight: 20.1797, symbol: "Ne" },
];

@Component({
  selector: "app-listing",
  templateUrl: "./listing.component.html",
  styleUrl: "./listing.component.css",
})
export class ListingComponent {
  public loading: boolean = true;
  public clients: ClientListingResponse[] = [];

  public displayedColumns: string[] = [
    "actions",
    "code",
    "name",
    "email",
    "documentNumber",
    "status",
    "phoneNumber",
    "cellphoneNumber",
    "creationDate",
  ];

  constructor(
    private router: Router,
    private clientsService: ClientsService,
    private clientsContextService: ClientsContextService
  ) {}

  public async ngOnInit() {
    await this.load();
  }

  private async load() {
    this.loading = true;

    const clientsResult = await this.clientsService.findAll();

    const clienstMapped = clientsResult.map((client) => ({
      ...client,
      creationDate: moment(client.creationDate).format("DD/MM/YYYY"),
    }));

    this.clients = clienstMapped;

    this.loading = false;
  }

  public navigateToClientCreation() {
    this.router.navigate(["/participantes/cadastro"]);
  }

  public preview(id: string) {
    this.clientsContextService.setClientId(id);
    this.router.navigate(["/participantes/visualizacao"]);
  }

  public update(id: string) {
    this.clientsContextService.setClientId(id);
    this.router.navigate(["/participantes/atualizacao"]);
  }

  public async remove(id: string) {
    await this.clientsService.disable(id);
    await this.load();
  }
}
