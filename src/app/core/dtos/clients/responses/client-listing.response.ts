export default interface ClientListingResponse {
  id: string;
  code: string;
  name: string;
  email: string;
  documentNumber: string;
  phoneNumber: string;
  cellphoneNumber: string;
  creationDate: string;
  disablingDate?: string;
}
