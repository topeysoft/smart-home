import { Component, trigger, state, style, transition, animate } from '@angular/core';
import { PageBase } from '../../page-base';
import { TsNavigationService } from '../../../../services/navigation/navigation-service';
@Component({
  selector: 'onboarding-ladging-page',
  templateUrl: './landing-page.component.html'
})
export class OnboardingLandingPage extends PageBase {
  title:string = 'Add new devices';
  showHeaderBorder:boolean=false;
  constructor(navigator: TsNavigationService) {
    super(navigator);
  }
}