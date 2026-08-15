export interface ClientAddressDto {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

export interface CreateClientDto {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  website?: string;
  industry?: string;
  status?: "active" | "inactive" | "lead";
  notes?: string;
  address?: ClientAddressDto;
}

export interface UpdateClientDto {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  website?: string;
  industry?: string;
  status?: "active" | "inactive" | "lead";
  notes?: string;
  address?: ClientAddressDto;
}
