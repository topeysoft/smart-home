import { NgModule } from '@angular/core';
import { UiInputComponent } from './input/input';
import { UiDropDownInputComponent } from './dd-input/dd-input';
import { UiTextAreaComponent } from './textarea/textarea';
import { UiTabComponent } from '../ui-components/ui-tab-component/ui-tab.component';
import { UiCheckboxComponent } from './ui-checkbox/ui-checkbox';
import { UiDropDownComponent } from './dropdown/dropdown.component';

@NgModule({
    declarations: [
    ],
    providers: [],
    imports: [
    ],
    exports: [
    ],
})
export class UiComponentsModule {

}

export const UiComponents = [
    UiInputComponent
    , UiDropDownComponent
    , UiDropDownInputComponent
    , UiTabComponent
    , UiTextAreaComponent
    , UiCheckboxComponent
];