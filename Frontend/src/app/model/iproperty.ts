import { IPropertyBase } from "./ipropertybase";
import { IAddress } from "./iaddress";

export interface Iproperty extends IPropertyBase {
    Description: string;

    Addresses: IAddress[];
}
