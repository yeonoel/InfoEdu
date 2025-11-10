export class SchoolDto {
  id: number;
  name: string;
  type?: string;
  commune?: string;
  stateSupport: string;
  priceLevel: string;
  logo?: string;
  longitude?: string;
  latitude?: string;
  filieres?: { id: number; name: string }[];
  reviews?: { id: number; comment: string; score: number }[];
}
