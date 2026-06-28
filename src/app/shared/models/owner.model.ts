interface Address {
  type: string;
  street: string;
  number: string;
  CAP: string;
}

export interface Owner {
  email: string;
  phone: string;
  codiceFiscale: string;
  adress: Address;
  passport: string;
}