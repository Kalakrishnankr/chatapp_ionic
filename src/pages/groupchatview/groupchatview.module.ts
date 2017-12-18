import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroupchatviewPage } from './groupchatview';

@NgModule({
  declarations: [
    GroupchatviewPage,
  ],
  imports: [
    IonicPageModule.forChild(GroupchatviewPage),
  ],
})
export class GroupchatviewPageModule {}
