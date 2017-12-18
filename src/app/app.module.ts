import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ChatPage } from '../pages/chat/chat';
import { UseronlinestatusPage } from '../pages/useronlinestatus/useronlinestatus';
import { GroupchatPage } from '../pages/groupchat/groupchat';
import { GroupchatviewPage } from '../pages/groupchatview/groupchatview';


import { ChatService } from '../providers/chat-service';
import { HttpModule }  from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { EmojiPickerModule } from '@ionic-tools/emoji-picker';
import { SocketIoModule, SocketIoConfig,Socket } from 'ng-socket-io'; 
// import { AngularMultiSelectModule } from 'angular2-multiselect-checkbox-dropdown/angular2-multiselect-dropdown';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ChatPage,
    UseronlinestatusPage,
    GroupchatPage,
    GroupchatviewPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    EmojiPickerModule.forRoot(),    
    IonicModule.forRoot(MyApp),
    SocketIoModule
    // AngularMultiSelectModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
     HomePage,
     ChatPage,
     UseronlinestatusPage,
     GroupchatPage,
     GroupchatviewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ChatService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EmojiPickerModule
    
  ]
})
export class AppModule {}
