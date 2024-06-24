import { MousePosition } from './MouseInterface';

export interface ClientData {
  name: string;
  color: number;
  mousePosition: MousePosition;
}

export interface ClientInput {
  input: string;
  data?: undefined;
}
