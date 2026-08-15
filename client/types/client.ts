export type ClientStatus =
  | "active"
  | "inactive"
  | "lead";

export interface ClientAddress {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

export interface Client {
  _id: string;
  owner?: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  website?: string;
  industry?: string;
  status: ClientStatus;
  notes?: string;
  address?: ClientAddress;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateClientPayload {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  website?: string;
  industry?: string;
  status?: ClientStatus;
  notes?: string;
  address?: ClientAddress;
}

export type UpdateClientPayload =
  Partial<CreateClientPayload>;

export interface ClientStats {
  total: number;
  active: number;
  inactive: number;
  leads: number;
}
