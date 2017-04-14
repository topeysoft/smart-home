import { NgModule } from '@angular/core';
import { TsActionBarComponent } from './header/action-bar/action-bar.component';
import { TsTabBarComponent } from './tab-bar/tab-bar.component';
import { TsTabLayoutComponent } from './tab-layout/tab-layout.component';
import { TsTabItemComponent } from './tab-bar/tab-item/tab-item';
import { OnboardingLandingPage } from './pages/onboarding/landing/landing-page.component';
import { OnboardingDeviceSearchComponent } from "./pages/onboarding/device-search/device-search.component";
import { OnboardingSearchResultComponent } from './pages/onboarding/device-search-result/device-search-result.component';
import { TsLoaderPageComponent } from './pages/loader/loader-page.component';
import { HomePageComponent } from './pages/home/home-page.component';
import { LeftMenuComponent } from './menus/left-menu/left-menu.component';
import { OnboardingDeviceCapabilitiesComponent } from './pages/onboarding/device-capabilities/device-capabilities.component';
import { OnboardingDeviceCapabilitiesSearchComponent } from './pages/onboarding/device-capabilities-search/device-capabilities-search.component';
import { OnboardingDeviceWifiSetupComponent } from './pages/onboarding/device-wifi-setup/device-wifi-setup.component';
import { UiComponents } from './ui-components/ui-component-modules';
import { OnboardingDeviceNameSetupComponent } from './pages/onboarding/device-name/device-name.component';
import { OnboardingDeviceSaveConfigComponent } from './pages/onboarding/device-save-config/device-save-config.component';
import { OnboardingDeviceSetupCompleteComponent } from './pages/onboarding/device-setup-complete/device-setup-complete.component';
import { TsLoaderInsetComponent } from './pages/loader-inset/loader-inset.component';
import { DeviceNodeWidgetComponent } from './widgets/device-widget/device-node-widget.component';
import { RgbLedControlWidgetComponent } from './widgets/rgb-control-widget/rgb-led-control-widget.component';
import { DeviceNodeDetailComponent } from './pages/device-detail-page/device-node-detail-page.component';
import { ColorWheelComponent } from './controls/color-wheel/color-wheel.component';
import { GenericControlWidgetComponent } from './widgets/generic-control-widget/generic-control-widget';
import { WallOutletWidgetComponent } from './widgets/wall-outlet/wall-outlet-widget';
import { DimmerSwitchWidgetComponent } from './widgets/dimmer-switch/dimmer-switch-widget';
@NgModule({
    declarations: []
    , exports: []
    , imports: []
    , providers: []
    , entryComponents: []
})
export class ComponentsModule {

}

export const TsComponents = [
    ...UiComponents
    , TsTabLayoutComponent
    , TsActionBarComponent
    , TsTabBarComponent
    , TsTabItemComponent
    , TsLoaderPageComponent
    , TsLoaderInsetComponent
    , LeftMenuComponent
    , HomePageComponent
    , OnboardingLandingPage
    , OnboardingSearchResultComponent
    , OnboardingDeviceSearchComponent
    , OnboardingDeviceCapabilitiesComponent
    , OnboardingDeviceCapabilitiesSearchComponent
    , OnboardingDeviceWifiSetupComponent
    , OnboardingDeviceNameSetupComponent
    , OnboardingDeviceSaveConfigComponent
    , OnboardingDeviceSetupCompleteComponent

    , DeviceNodeDetailComponent

    , DeviceNodeWidgetComponent
    , RgbLedControlWidgetComponent
    , GenericControlWidgetComponent
    , WallOutletWidgetComponent
    , DimmerSwitchWidgetComponent

    , ColorWheelComponent
]