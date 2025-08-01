import { IAddress } from "./iaddress";
import { IPropertyBase } from "./ipropertybase";

export class Property implements IPropertyBase{
  id: number;
  sellRent: number;
  name: string;
  propertyType: string;
  bhk: number;
  furnishingType: string;
  price: number;
  builtArea: number;
  CarpetArea?: number;
  city: string;
  readyToMove: number;
  AOP?: string;
  MainEntrance?: string;
  Security?: number;
  Gated?: number;
  Maintenance?: number;
  Possession?: string;
  image?: string;
  Description?: string;
  PostedOn: string;
  PostedBy: number;
  Addresses: IAddress[];
}
