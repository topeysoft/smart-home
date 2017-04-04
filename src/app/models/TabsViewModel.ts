import {Type} from '@angular/core';
import { ViewComponentModel } from './view-component';
export class TabViewModel{
    name:string;
    icon:string;
    title:string;
    viewComponentType:Type<ViewComponentModel>;
}