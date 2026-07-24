export interface UpdateClientDto {
  firstName?: string;
  lastName?: string;
  company?: string;
  email?: string;
  phone?: string;
  website?: string;
  industry?: string;
 address?: string;
  city?: string;
  country?: string;
  status?: "active" | "inactive";
  notes?: string;
}