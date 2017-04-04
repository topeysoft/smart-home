import { Injectable, EventEmitter } from '@angular/core';
import { Loading, LoadingController, App, MenuController, NavController } from 'ionic-angular';
@Injectable()
export class TsNavigationService {
    navCtrl: NavController;
    showLeftMenu: boolean = true;
    private history: TsNavigationHistory[] = [];
    private loading: Loading;
    onNavigationEnd = new EventEmitter<any>();
    onViewEnter = new EventEmitter<any>();
    onViewLeave = new EventEmitter<any>();
    readonly defaultMenuActions: MenuActions = new MenuActions();
    currentPage: TsNavigationHistory = new TsNavigationHistory();
    leftMenuItems: Array<{ title: string, icon: string, action: any }> = [];
    constructor(private menuCtrl: MenuController, private loadingCtrl: LoadingController, public appCtrl: App) {
        //constructor(private _location: Location, private router: Router, private route: ActivatedRoute) {
        // this.router.events.subscribe((data) => {
        //     if (data instanceof NavigationEnd) {
        //         var history = new TsNavigationHistory();
        //         history.path = data.url;
        //         history.component = this.route.component;
        //         this.addToHistory(history);
        //         this.onNavigationEnd.emit(data);
        //     }
        // })

        this.defaultMenuActions.menu.icon = MenuButtonIcons.menu;
        this.defaultMenuActions.menu.action = () => { this.toggleMenu() };

        this.defaultMenuActions.back.icon = MenuButtonIcons.back;
        this.defaultMenuActions.back.action = () => { this.back() };

        this.defaultMenuActions.close.icon = MenuButtonIcons.close;
        this.defaultMenuActions.close.action = () => { this.back() };

        this.defaultMenuActions.home.icon = MenuButtonIcons.home;
        this.defaultMenuActions.home.action = () => { this.home() };
    }

    dismissLoading(){
        if(this.loading){
             this.loading.dismiss();
        }   
    }
    presentLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'loading...'
        });

        this.loading.present();
    }
    presentPleaseWait() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        this.loading.present();

        
    }
    presentCustomLoader() {
        this.loading = this.loadingCtrl.create({
            spinner: 'hide',
            content: `
      <loader-inset [displayText]="test">
      </loader-inset>`
        });

        this.loading.present();
    }
    setRootPage(pageComponent) {
        if (!this.navCtrl) { this.initialize() }
        this.navCtrl.setRoot(pageComponent);
    }
    goToPage(pageComponent) {
        if (!this.navCtrl) {
            this.navCtrl = this.appCtrl.getRootNav()
        }
        this.navCtrl.push(pageComponent);
    }
    // showPageAsModal(pageComponent) {
    //     if (!this.navCtrl) {
    //         this.navCtrl = this.appCtrl.getRootNav()
    //     }
    //     this.navCtrl.(pageComponent);
    // }
    home() {
        this.navCtrl.popToRoot();
    }
    back() {
        if (this.navCtrl.canGoBack)
            this.navCtrl.pop();
    }

    navigate(data) {
        //this.router.navigate(data);
    }
    toggleMenu() {
        this.menuCtrl.toggle();
    }
    addToHistory(history) {
        this.history.push(history);
    }
    // removeFromHistory(history, allOccurence: boolean = true) {
    //     if (allOccurence) {
    //         var historyToPurge = this.history.filter(h => h.uuid === history.uuid)
    //         historyToPurge.forEach((h, i) => {
    //             this.history.splice(i, 1);
    //         });
    //     } else {
    //         this.history.splice(this.history.findIndex(h => h.uuid == history.uuid), 1)
    //     }
    // }


    initialize() {
        this.navCtrl = this.appCtrl.getRootNav();
        this.navCtrl.viewDidEnter.subscribe(viewCtrl => {
            this.currentPage = new TsNavigationHistory();
            this.currentPage.component = viewCtrl.component;
            this.currentPage.menuButtonAction = viewCtrl.component.menuAction || this.defaultMenuActions.menu;
            this.onViewEnter.emit(viewCtrl);
            // this.onNavigationEnd.emit(viewCtrl);
        })
        this.navCtrl.viewDidLeave.subscribe(viewCtrl => {
            this.onViewLeave.emit(viewCtrl);
        })
    }


}
export class TsNavigationHistory {
    // uuid = guid();
    menuButtonAction: MenuAction = new MenuAction();
    title: string;
    path: string;
    component: any = {};

}

export class MenuAction {
    icon: string = MenuButtonIcons.menu;
    action;
}
class MenuActions {
    menu: MenuAction = new MenuAction();
    back: MenuAction = new MenuAction();
    home: MenuAction = new MenuAction();
    close: MenuAction = new MenuAction();
}
export const MenuButtonIcons = {
    menu: 'ion-navicon',
    back: 'ion-android-arrow-back',
    home: 'ion-home',
    close: 'ion-android-close'
}