import { Routes } from '@angular/router';
import { OnboardingLandingPage } from './components/pages/onboarding/landing/landing-page.component';
import { OnboardingDeviceSearchComponent } from './components/pages/onboarding/device-search/device-search.component';
import { OnboardingSearchResultComponent } from './components/pages/onboarding/device-search-result/device-search-result.component';
import { HomePageComponent } from './components/pages/home/home-page.component';
import { OnboardingDeviceCapabilitiesSearchComponent } from './components/pages/onboarding/device-capabilities-search/device-capabilities-search.component';
import { OnboardingDeviceCapabilitiesComponent } from './components/pages/onboarding/device-capabilities/device-capabilities.component';
import { OnboardingDeviceWifiSetupComponent } from './components/pages/onboarding/device-wifi-setup/device-wifi-setup.component';
import { OnboardingDeviceNameSetupComponent } from './components/pages/onboarding/device-name/device-name.component';
import { OnboardingDeviceSaveConfigComponent } from './components/pages/onboarding/device-save-config/device-save-config.component';
import { OnboardingDeviceSetupCompleteComponent } from './components/pages/onboarding/device-setup-complete/device-setup-complete.component';
export const AppRoutes: Routes = [
  { path: 'devices', component: OnboardingLandingPage }
  , { path: 'devices/:id', component: OnboardingLandingPage }
  , {
    path: 'home',
    component: HomePageComponent,
  }
  , {
    path: 'onboarding',
    component: OnboardingDeviceSearchComponent,
  }
  , {
    path: 'onboarding/devices',
    component: OnboardingSearchResultComponent,
  }
  , {
    path: 'onboarding/devices/:deviceId',
    component: OnboardingSearchResultComponent,
  }
  , {
    path: 'onboarding/devices/:deviceId/capabilities-search',
    component: OnboardingDeviceCapabilitiesSearchComponent,
  }
  , {
    path: 'onboarding/devices/:deviceId/capabilities',
    component: OnboardingDeviceCapabilitiesComponent,
  }
  , {
    path: 'onboarding/devices/:deviceId/wifi-setup',
    component: OnboardingDeviceWifiSetupComponent
  }
  , {
    path: 'onboarding/devices/:deviceId/name-setup',
    component: OnboardingDeviceNameSetupComponent
  }
  , {
    path: 'onboarding/devices/:deviceId/save-config',
    component: OnboardingDeviceSaveConfigComponent
  }
  , {
    path: 'onboarding/devices/:deviceId/complete',
    component: OnboardingDeviceSetupCompleteComponent
  }
  , {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
  , { path: '**', component: HomePageComponent }
];