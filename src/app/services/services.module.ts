import { TsNavigationService } from './navigation/navigation-service';
import { DeviceOnboardingService } from './onboarding/onboarding.service';
import { HomieDeviceApiService } from './device-api/homie-device-api.service';
import { ConfigService } from './config.service';
import { MQTTService } from './mqtt.service';
import { DeviceManagementService } from './device-management/device-management.services';
import { ResponsiveService } from './responsive/responsive.service';
export const TsServices = [
    TsNavigationService
    , DeviceOnboardingService
    , HomieDeviceApiService
    , ConfigService
    , MQTTService
    , DeviceManagementService
    , ResponsiveService
]