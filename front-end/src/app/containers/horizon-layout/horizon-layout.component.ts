import { Component, OnInit } from '@angular/core';
import { navItems } from './_nav';
import { UserService } from '../../service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
@Component({
  selector: 'app-horizon-layout',
  templateUrl: './horizon-layout.component.html',
  styleUrls: ['./horizon-layout.component.css']
})
export class HorizonLayoutComponent implements OnInit {
  curRoute:string='';
  sidebarMinimized = false;
  navItems = navItems;
  user;
  nickname;
  role;
  avatar;
  defaultImage="assets/img/error/unknown.jpg";
  VDMSAVATARURL='http://vdms.aidetecting.com/assets/img/avatars/';
  currentLanguage="en";
  languageName="English";
  LanguageImage={
    en:"assets/img/country/us-flag.png",
    ch:"assets/img/country/china-flag.png",
  };
  constructor(
    private userService: UserService,
    private _formBuilder: FormBuilder,
    public translate: TranslateService,
    private route: Router,
  ){
    this.route.events.subscribe((event: Event) => {
      this.curRoute = event['url']
      switch (true) {
        case event instanceof NavigationStart: {
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          break;
        }
        default: {
          break;
        }
      }
    });
  }
  ngOnInit(){
    this.curRoute=this.route.routerState.snapshot.url;
    this.user = this.userService.getToken()['userInfo']
    const role = this.userService.getToken()['role']
    if(role == 'admin' || role == 'super') {
      this.nickname = this.user.name;
      this.avatar=this.user.photo?this.user.photo:this.defaultImage;
    }
    else{
      this.nickname = this.user.nick_name;
      this.avatar=this.user.avatar?this.user.avatar:this.defaultImage;
    } 
    if(localStorage.getItem('language')) this.changeLang(localStorage.getItem('language'))
  }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  ngOnDestroy(){
    localStorage.removeItem('language');
  }
  //LanguageChagePart
  changeLang(language: string) {
    this.currentLanguage=language;
    if(language=='en') this.languageName="English";
    else if(language=='ch') this.languageName="Chinese";
    localStorage.setItem('language',language)
    this.translate.use(language);
  }

  //userdropdown part
  logOut(){
    this.userService.logOut()
  }
}
