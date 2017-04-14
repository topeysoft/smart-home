import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { TsNavigationService } from './services/navigation/navigation-service';
import { HomePageComponent } from './components/pages/home/home-page.component';
// import { OnboardingDeviceSearchComponent } from './components/pages/onboarding/device-search/device-search.component';
import { OnboardingSearchResultComponent } from './components/pages/onboarding/device-search-result/device-search-result.component';
import { TsResponsive } from 'ts-common-uitlities';
import { MQTTService } from './services/mqtt.service';
import { ResponsiveService } from './services/responsive/responsive.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {


  title: string = 'Smart Home App';
  showHeaderBorder: boolean = false;



  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePageComponent;

  pages: Array<{ title: string, icon: string, action: any }>;
  
  constructor(public platform: Platform, private respSvc:ResponsiveService, private navigator: TsNavigationService, private mqttSvc: MQTTService) {
    // constructor(public platform: Platform) {
    // this.title=navigator.currentPage.component.title;
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Add new Device', icon: 'ion-ios-plus-outline', action: () => { this.navigator.goToPage(OnboardingSearchResultComponent) } },
      { title: 'My Devices', icon: 'ion-cube', action: () => { this.navigator.setRootPage(HomePageComponent) } },
      { title: 'Dark theme', icon: 'ion-ios-color-filter', action: () => { this.navigator.setCurrentTheme('ts-dark-theme') } },
      { title: 'Light theme', icon: 'ion-ios-color-filter-outline', action: () => { this.navigator.setCurrentTheme('ts-light-theme') } },
    ];
    navigator.leftMenuItems = this.pages;

  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
      TsResponsive.init();
    });
  }

  ngAfterViewInit() {
    this.navigator.initialize();
  }
  // openPage(page) {
  //   // Reset the content nav to have just this page
  //   // we wouldn't want the back button to show in this scenario
  //   this.navigator.setRootPage(page.component);
  // }
}
