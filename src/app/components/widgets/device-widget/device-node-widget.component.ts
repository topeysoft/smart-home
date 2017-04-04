import { Component, Input, EventEmitter, Output } from '@angular/core';
import { DeviceManagementService } from '../../../services/device-management/device-management.services';
@Component({
    selector: 'device-node-widget',
    templateUrl: './device-node-widget.component.html'
})
export class DeviceNodeWidgetComponent {
       @Output() iconClick= new EventEmitter<any>();
       @Output() widgetClick= new EventEmitter<any>();
    @Input() node: any = {};
    /**
     *
     */
    constructor(private deviceMgmtSvc:DeviceManagementService) {
    }

    getIcon(){
       return this.deviceMgmtSvc.getNodeIcon(this.node);
    }
    getDisplayName(){
       return this.deviceMgmtSvc.getDisplayName(this.node);
    }
    getDisplayType(){
       return this.deviceMgmtSvc.getDisplayType(this.node);
    }
    getDescription(){
       return this.deviceMgmtSvc.getDescription(this.node);
    }

    onIconClick(){
        this.iconClick.emit(this.node)
    }
    onWidgetClick(){
        this.widgetClick.emit(this.node)
    }
}