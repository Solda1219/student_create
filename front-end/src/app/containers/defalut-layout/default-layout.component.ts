import { Component, OnInit } from '@angular/core';
import { navItems } from './_nav';
import { UserService } from '../../service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import { CommonFunctionService } from '../../function/commonFunction.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  curRoute:string='';
  sidebarMinimized = false;
  nav = navItems;
  user;
  currentLanguage = "english";
  constructor(
    private userService: UserService,
    private _formBuilder: FormBuilder,
    private route: Router,
    public cf:CommonFunctionService,
  ){
    this.nav = navItems;
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
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  ngOnInit(){
    this.nav = [
  
  {
    name: 'Account',
    icon: 'cil-user-follow',
    url: '/account',
    role:-1,
    children: [
      {
        name: 'admin',
        url:'/account/admin',
        icon:'cil-triangle',
        role:1,
      },
      // {
      //   name: 'user',
      //   url:'/account/user',
      //   icon:'cil-triangle',
      //   role:2,
      // },
      
    ]
  },
  {
    name: 'State',
    icon: 'fa fa-group',
    url: '/state',
    role:2,

  },
  {
    name: 'Report',
    icon: 'cil-triangle',
    url: '/report',
    role:2,

  },
];
    this.curRoute=this.route.routerState.snapshot.url;
    this.user = this.userService.getToken()['userInfo'];
    document.getElementsByClassName("navbar-toggler-icon")[2]
    this.setNavItemByRole();
  }
  ngOnDestroy(){
    localStorage.removeItem('language');
  }
  //set nav item
  setNavItemByRole(){
    const user_role = JSON.parse(this.user.role);
    for(let i=0; i < this.nav.length; i++){
      const {role,children} = this.nav[i];
      if(user_role.includes(-1)) continue
      else{
        if(role==-1) {
          this.nav.splice(i,1);
          continue;
        }
        // if(children) {
        //   for(let c=0; c < this.nav[i].children.length; c++){
        //     const role_c = this.nav[i].children[c].role;
        //     if(role_c<user_role) {
        //       this.nav[i].children.splice(c,1);
        //       continue;
        //     }
        //   }
        // }
      }
    }
  }
  //LanguageChagePart
  changeLang(language: string) {
    this.currentLanguage=language;
    localStorage.setItem('language',language)
  }

  //userdropdown part
  logOut(){
    this.userService.logOut()
  }
}
