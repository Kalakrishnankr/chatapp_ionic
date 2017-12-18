import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ChatService } from '../providers/chat-service';

import { HomePage } from '../pages/home/home';
import { ChatPage } from '../pages/chat/chat';
import { GroupchatPage } from '../pages/groupchat/groupchat';
import { GroupchatviewPage } from '../pages/groupchatview/groupchatview';
import { UseronlinestatusPage } from '../pages/useronlinestatus/useronlinestatus';
import { from } from 'rxjs/observable/from';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //rootPage:any = HomePage;
  rootPage:any = UseronlinestatusPage;
  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

