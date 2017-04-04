import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { TsNavigationService } from './services/navigation-service/navigation-service';
import { HomePageComponent } from './components/pages/home/home-page.component';
// import { OnboardingDeviceSearchComponent } from './components/pages/onboarding/device-search/device-search.component';
import { OnboardingSearchResultComponent } from './components/pages/onboarding/device-search-result/device-search-result.component';
import { MQTTService } from './services/mqtt.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {


  title:string='Smart Home App';
  showHeaderBorder:boolean=false;



  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePageComponent;

  pages: Array<{title: string,icon:string, action: any}>;

  constructor(public platform: Platform, private navigator:TsNavigationService, private mqttSvc:MQTTService) {
  // constructor(public platform: Platform) {
    // this.title=navigator.currentPage.component.title;
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Add new Device', icon:'ion-ios-plus-outline', action: ()=>{this.navigator.goToPage(OnboardingSearchResultComponent)} },
      { title: 'My Devices', icon:'ion-cube', action: ()=>{this.navigator.setRootPage(HomePageComponent)} },
    ];
    navigator.leftMenuItems=this.pages;

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

ngAfterViewInit(){
  this.navigator.initialize();
}
  // openPage(page) {
  //   // Reset the content nav to have just this page
  //   // we wouldn't want the back button to show in this scenario
  //   this.navigator.setRootPage(page.component);
  // }
}
