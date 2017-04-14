import { TsNavigationService, TsNavigationHistory } from '../../services/navigation/navigation-service';
export class PageBase{
    title:string;
    showHeaderBorder:boolean=true;
    constructor(navigator: TsNavigationService) {
        var page = new TsNavigationHistory();
        page.component=this;
        navigator.currentPage = page;
    }
}