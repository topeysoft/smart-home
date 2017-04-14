import { Component } from '@angular/core';
import { DeviceManagementService } from '../../../services/device-management/device-management.services';
import { TsNavigationService } from '../../../services/navigation/navigation-service';
import { PageBase } from '../page-base';
@Component({
    selector:'device-node-detail',
    templateUrl:'./device-node-detail-page.component.html'
})
export class DeviceNodeDetailComponent  {

    nodeData:any={selectedNode:''};
   // showHeaderBorder: boolean = true;
    constructor(private navigator: TsNavigationService
    , private deviceMgmtSvc:DeviceManagementService) {
      //  super(navigator);
  // this.navigator.onViewEnter.subscribe(viewCtrl => {
         //   if (viewCtrl.component.name === 'DeviceNodeDetailComponent') {
              //  this.setupMenu();
                this.nodeData.node = deviceMgmtSvc.selectedNode;
                this.nodeData.device = deviceMgmtSvc.selectedDevice;
                this.nodeData.displayName = deviceMgmtSvc.getDisplayName(deviceMgmtSvc.selectedNode);
                this.nodeData.displayIcon = deviceMgmtSvc.getNodeIcon(deviceMgmtSvc.selectedNode);
                this.nodeData.controlType = deviceMgmtSvc.selectedNode.type || 'generic';
                
               // this.navigator.currentPage.title = this.nodeData.displayName;

       //     }
       // });
    }
setupMenu() {
        this.navigator.currentPage.menuButtonAction = this.navigator.defaultMenuActions.back;
    }

}