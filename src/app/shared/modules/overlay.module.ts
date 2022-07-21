import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { OverlayService } from 'src/app/services/overlay.service';


@NgModule({
    imports: [
      CommonModule,
      OverlayModule
    ],
    exports : [        
    ],
    providers: [OverlayService],
  })
  export class AppOverlayModule { }

  //https://jake.stackblitz.com/edit/overlay-progress-spinner?file=app%2Foverlay%2Foverlay.service.ts,app%2Foverlay%2Foverlay.module.ts
  //https://stackblitz.com/run?file=src%2Fapp%2Fprogress-spinner-overview-example.ts,src%2Fapp%2Fprogress-spinner-overview-example.html,src%2Fapp%2Fapp.module.ts