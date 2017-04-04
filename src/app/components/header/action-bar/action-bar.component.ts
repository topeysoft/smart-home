import { Component, Input } from '@angular/core';
import { TsNavigationService } from '../../../services/navigation-service/navigation-service';
@Component({
    selector: 'ts-action-bar',
    templateUrl: './action-bar.component.html'
})
export class TsActionBarComponent {

    /**
     *
     */
    constructor(private navigator: TsNavigationService) {
    }
    @Input() title: string = "";
    @Input() menuButtonIcon: string = "ion-android-menu";


    menuClick() {
       this.navigator.currentPage.menuButtonAction.action = this.navigator.currentPage.menuButtonAction.action || this.menuAction;
       this.navigator.currentPage.menuButtonAction.action();
    }
    menuAction() {
        this.navigator.toggleMenu();
    }
}