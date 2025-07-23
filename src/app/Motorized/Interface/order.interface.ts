export interface Order {
  id: string;
  address: string;
  customerName: string;
  status?: string;
  date?: Date;
  // Add other properties as needed
}