export class TransitionService {

    private transitionParams: TransitionParams;
    constructor(params: TransitionParams = new TransitionParams()) {
        this.transitionParams = params;
        this.init()
    }

    private animEndEventNames = 'webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend';
    //private outClass = 'pt-page-moveToLeft ';
   // private outClassReverse = 'pt-page-moveToRight ';
   // private inClass = 'pt-page-moveFromRight ';
   // private inClassReverse = 'pt-page-moveFromLeft';
    private $currPage: JQuery;
    private $nextPage: JQuery;
    private init() {
        this.transitionParams = this.transitionParams || new TransitionParams();
    }
    private setupEvents() {
        var a = this;
        this.$currPage.one(this.animEndEventNames, function (e) {
            a.restoreOriginalClasses(e.target);
        });
        this.$nextPage.one(this.animEndEventNames, function (e) {
            a.restoreOriginalClasses(e.target);
        });

    }
    setTransitionParams(params: TransitionParams): TransitionService {
        this.transitionParams = params;
        this.init();
        return this;
    }
    setParent(parent: any): TransitionService {
        this.transitionParams.parent = parent;
        this.init();
        return this;
    }
    private getAnimationType(): AnimationType {
        this.transitionParams.animationType=this.transitionParams.animationType || 'push_pull_horizontal';
        return animationTypes.find((t)=>{
           return t.name== this.transitionParams.animationType;
        })||animationTypes[0];
    }
    private prepareAnim() {
        $(this.$nextPage).data('setActive', true);
        $(this.$currPage).data('setActive', false);
        this.setupEvents();
        this.preserveOriginalClasses(this.$currPage);
        this.preserveOriginalClasses(this.$nextPage);
    }
    next($parent: HTMLElement = null) {
        if ($parent) {
            this.setParent($parent);
        }
        this.$currPage = $(this.transitionParams.parent).children(this.transitionParams.childSelector + '.' + this.transitionParams.activeClass);
        this.$nextPage = this.$currPage.length > 0 ? this.$currPage.next() : $(this.transitionParams.parent).children(this.transitionParams.childSelector).first();

        this.prepareAnim();

        this.$currPage.addClass(this.getAnimationType().out);
        this.$nextPage.addClass(this.getAnimationType().in + ' ' + this.transitionParams.activeClass);
    }
    previous($parent: HTMLElement = null) {
        if ($parent) {
            this.setParent($parent);
        }
        var $currPage = $(this.transitionParams.parent).find(this.transitionParams.childSelector + '.' + this.transitionParams.activeClass);
        if ($currPage.length > 0) {
            this.$nextPage = $currPage.prev();
            this.$currPage = $currPage;
            if (this.$nextPage.length > 0) {
                this.prepareAnim();
                this.$currPage.addClass(this.getAnimationType().outReverse);
                this.$nextPage.addClass(this.getAnimationType().inReverse + ' ' + this.transitionParams.activeClass);
            }
        }
    }

    preserveOriginalClasses(context) {
        var css = $(context).prop('class');
        $(context).data('originalCssClasses', css);
    }
    restoreOriginalClasses(context) {
        var originalCss = $(context).data('originalCssClasses');
        $(context).prop('class', originalCss);
        if ($(context).data('setActive') === true) {
            $(context).addClass(this.transitionParams.activeClass);
        } else {
            $(context).removeClass(this.transitionParams.activeClass);
        }
        $(context).data('setActive', false);

    }
    gotoStepId() {

    }
    gotoStepIndex() {

    }
}
export class TransitionParams {
    parent: HTMLElement = document.body;
    childSelector: string = '.workflow-step';
    activeClass: string = 'active';
    animationType: string = 'push_pull_horizontal';
}

class AnimationType {
    name:string;
    in: string;
    out: string;
    inReverse: string;
    outReverse: string;
}
const animationTypes = [
    {
        name:'push_pull_horizontal',
        out: 'pt-page-moveToLeft',
        in: 'pt-page-moveFromRight',
        outReverse: 'pt-page-moveToRight',
        inReverse: 'pt-page-moveFromLeft'
    },
    {
        name:'push_pull_vertical',
        out: 'pt-page-moveToTop',
        in: 'pt-page-moveFromBottom',
        outReverse: 'pt-page-moveToBottom',
        inReverse: 'pt-page-moveFromTop'
    }
    ,{
        name:'slide_fade_horizontal',
        out: 'pt-page-fade',
        in: 'pt-page-moveFromRight pt-page-ontop',
        outReverse: 'pt-page-fade',
        inReverse: 'pt-page-moveFromLeft pt-page-ontop'
    }
    ,{
        name:'slide_fade_vertical',
        out: 'pt-page-fade',
        in: 'pt-page-moveFromBottom pt-page-ontop',
        outReverse: 'pt-page-fade',
        inReverse: 'pt-page-moveFromTop pt-page-ontop'
    }
   
    
    // case 7:
    //     outClass = 'pt-page-fade';
    //     inClass = 'pt-page-moveFromBottom pt-page-ontop';
    //     break;
    // case 8:
    //     outClass = 'pt-page-fade';
    //     inClass = 'pt-page-moveFromTop pt-page-ontop';
    //     break;
    // case 9:
    //     outClass = 'pt-page-moveToLeftFade';
    //     inClass = 'pt-page-moveFromRightFade';
    //     break;
    // case 10:
    //     outClass = 'pt-page-moveToRightFade';
    //     inClass = 'pt-page-moveFromLeftFade';
    //     break;
    // case 11:
    //     outClass = 'pt-page-moveToTopFade';
    //     inClass = 'pt-page-moveFromBottomFade';
    //     break;
    // case 12:
    //     outClass = 'pt-page-moveToBottomFade';
    //     inClass = 'pt-page-moveFromTopFade';
    //     break;
    // case 13:
    //     outClass = 'pt-page-moveToLeftEasing pt-page-ontop';
    //     inClass = 'pt-page-moveFromRight';
    //     break;
    // case 14:
    //     outClass = 'pt-page-moveToRightEasing pt-page-ontop';
    //     inClass = 'pt-page-moveFromLeft';
    //     break;
    // case 15:
    //     outClass = 'pt-page-moveToTopEasing pt-page-ontop';
    //     inClass = 'pt-page-moveFromBottom';
    //     break;
    // case 16:
    //     outClass = 'pt-page-moveToBottomEasing pt-page-ontop';
    //     inClass = 'pt-page-moveFromTop';
    //     break;
    // case 17:
    //     outClass = 'pt-page-scaleDown';
    //     inClass = 'pt-page-moveFromRight pt-page-ontop';
    //     break;
    // case 18:
    //     outClass = 'pt-page-scaleDown';
    //     inClass = 'pt-page-moveFromLeft pt-page-ontop';
    //     break;
    // case 19:
    //     outClass = 'pt-page-scaleDown';
    //     inClass = 'pt-page-moveFromBottom pt-page-ontop';
    //     break;
    // case 20:
    //     outClass = 'pt-page-scaleDown';
    //     inClass = 'pt-page-moveFromTop pt-page-ontop';
    //     break;
    // case 21:
    //     outClass = 'pt-page-scaleDown';
    //     inClass = 'pt-page-scaleUpDown pt-page-delay300';
    //     break;
    // case 22:
    //     outClass = 'pt-page-scaleDownUp';
    //     inClass = 'pt-page-scaleUp pt-page-delay300';
    //     break;
    // case 23:
    //     outClass = 'pt-page-moveToLeft pt-page-ontop';
    //     inClass = 'pt-page-scaleUp';
    //     break;
    // case 24:
    //     outClass = 'pt-page-moveToRight pt-page-ontop';
    //     inClass = 'pt-page-scaleUp';
    //     break;
    // case 25:
    //     outClass = 'pt-page-moveToTop pt-page-ontop';
    //     inClass = 'pt-page-scaleUp';
    //     break;
    // case 26:
    //     outClass = 'pt-page-moveToBottom pt-page-ontop';
    //     inClass = 'pt-page-scaleUp';
    //     break;
    // case 27:
    //     outClass = 'pt-page-scaleDownCenter';
    //     inClass = 'pt-page-scaleUpCenter pt-page-delay400';
    //     break;
    // case 28:
    //     outClass = 'pt-page-rotateRightSideFirst';
    //     inClass = 'pt-page-moveFromRight pt-page-delay200 pt-page-ontop';
    //     break;
    // case 29:
    //     outClass = 'pt-page-rotateLeftSideFirst';
    //     inClass = 'pt-page-moveFromLeft pt-page-delay200 pt-page-ontop';
    //     break;
    // case 30:
    //     outClass = 'pt-page-rotateTopSideFirst';
    //     inClass = 'pt-page-moveFromTop pt-page-delay200 pt-page-ontop';
    //     break;
    // case 31:
    //     outClass = 'pt-page-rotateBottomSideFirst';
    //     inClass = 'pt-page-moveFromBottom pt-page-delay200 pt-page-ontop';
    //     break;
    // case 32:
    //     outClass = 'pt-page-flipOutRight';
    //     inClass = 'pt-page-flipInLeft pt-page-delay500';
    //     break;
    // case 33:
    //     outClass = 'pt-page-flipOutLeft';
    //     inClass = 'pt-page-flipInRight pt-page-delay500';
    //     break;
    // case 34:
    //     outClass = 'pt-page-flipOutTop';
    //     inClass = 'pt-page-flipInBottom pt-page-delay500';
    //     break;
    // case 35:
    //     outClass = 'pt-page-flipOutBottom';
    //     inClass = 'pt-page-flipInTop pt-page-delay500';
    //     break;
    // case 36:
    //     outClass = 'pt-page-rotateFall pt-page-ontop';
    //     inClass = 'pt-page-scaleUp';
    //     break;
    // case 37:
    //     outClass = 'pt-page-rotateOutNewspaper';
    //     inClass = 'pt-page-rotateInNewspaper pt-page-delay500';
    //     break;
    // case 38:
    //     outClass = 'pt-page-rotatePushLeft';
    //     inClass = 'pt-page-moveFromRight';
    //     break;
    // case 39:
    //     outClass = 'pt-page-rotatePushRight';
    //     inClass = 'pt-page-moveFromLeft';
    //     break;
    // case 40:
    //     outClass = 'pt-page-rotatePushTop';
    //     inClass = 'pt-page-moveFromBottom';
    //     break;
    // case 41:
    //     outClass = 'pt-page-rotatePushBottom';
    //     inClass = 'pt-page-moveFromTop';
    //     break;
    // case 42:
    //     outClass = 'pt-page-rotatePushLeft';
    //     inClass = 'pt-page-rotatePullRight pt-page-delay180';
    //     break;
    // case 43:
    //     outClass = 'pt-page-rotatePushRight';
    //     inClass = 'pt-page-rotatePullLeft pt-page-delay180';
    //     break;
    // case 44:
    //     outClass = 'pt-page-rotatePushTop';
    //     inClass = 'pt-page-rotatePullBottom pt-page-delay180';
    //     break;
    // case 45:
    //     outClass = 'pt-page-rotatePushBottom';
    //     inClass = 'pt-page-rotatePullTop pt-page-delay180';
    //     break;
    // case 46:
    //     outClass = 'pt-page-rotateFoldLeft';
    //     inClass = 'pt-page-moveFromRightFade';
    //     break;
    // case 47:
    //     outClass = 'pt-page-rotateFoldRight';
    //     inClass = 'pt-page-moveFromLeftFade';
    //     break;
    // case 48:
    //     outClass = 'pt-page-rotateFoldTop';
    //     inClass = 'pt-page-moveFromBottomFade';
    //     break;
    // case 49:
    //     outClass = 'pt-page-rotateFoldBottom';
    //     inClass = 'pt-page-moveFromTopFade';
    //     break;
    // case 50:
    //     outClass = 'pt-page-moveToRightFade';
    //     inClass = 'pt-page-rotateUnfoldLeft';
    //     break;
    // case 51:
    //     outClass = 'pt-page-moveToLeftFade';
    //     inClass = 'pt-page-rotateUnfoldRight';
    //     break;
    // case 52:
    //     outClass = 'pt-page-moveToBottomFade';
    //     inClass = 'pt-page-rotateUnfoldTop';
    //     break;
    // case 53:
    //     outClass = 'pt-page-moveToTopFade';
    //     inClass = 'pt-page-rotateUnfoldBottom';
    //     break;
    // case 54:
    //     outClass = 'pt-page-rotateRoomLeftOut pt-page-ontop';
    //     inClass = 'pt-page-rotateRoomLeftIn';
    //     break;
    // case 55:
    //     outClass = 'pt-page-rotateRoomRightOut pt-page-ontop';
    //     inClass = 'pt-page-rotateRoomRightIn';
    //     break;
    // case 56:
    //     outClass = 'pt-page-rotateRoomTopOut pt-page-ontop';
    //     inClass = 'pt-page-rotateRoomTopIn';
    //     break;
    // case 57:
    //     outClass = 'pt-page-rotateRoomBottomOut pt-page-ontop';
    //     inClass = 'pt-page-rotateRoomBottomIn';
    //     break;
    // case 58:
    //     outClass = 'pt-page-rotateCubeLeftOut pt-page-ontop';
    //     inClass = 'pt-page-rotateCubeLeftIn';
    //     break;
    // case 59:
    //     outClass = 'pt-page-rotateCubeRightOut pt-page-ontop';
    //     inClass = 'pt-page-rotateCubeRightIn';
    //     break;
    // case 60:
    //     outClass = 'pt-page-rotateCubeTopOut pt-page-ontop';
    //     inClass = 'pt-page-rotateCubeTopIn';
    //     break;
    // case 61:
    //     outClass = 'pt-page-rotateCubeBottomOut pt-page-ontop';
    //     inClass = 'pt-page-rotateCubeBottomIn';
    //     break;
    // case 62:
    //     outClass = 'pt-page-rotateCarouselLeftOut pt-page-ontop';
    //     inClass = 'pt-page-rotateCarouselLeftIn';
    //     break;
    // case 63:
    //     outClass = 'pt-page-rotateCarouselRightOut pt-page-ontop';
    //     inClass = 'pt-page-rotateCarouselRightIn';
    //     break;
    // case 64:
    //     outClass = 'pt-page-rotateCarouselTopOut pt-page-ontop';
    //     inClass = 'pt-page-rotateCarouselTopIn';
    //     break;
    // case 65:
    //     outClass = 'pt-page-rotateCarouselBottomOut pt-page-ontop';
    //     inClass = 'pt-page-rotateCarouselBottomIn';
    //     break;
    // case 66:
    //     outClass = 'pt-page-rotateSidesOut';
    //     inClass = 'pt-page-rotateSidesIn pt-page-delay200';
    //     break;
    // case 67:
    //     outClass = 'pt-page-rotateSlideOut';
    //     inClass = 'pt-page-rotateSlideIn';
    //     break;

]