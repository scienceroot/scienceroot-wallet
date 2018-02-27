import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: '',
  template: `
    <div>
      <scr-wallet-new [userId]="userId"
                      (onWalletCreationFinished)="onWalletCreationFinished()">
      </scr-wallet-new>
    </div>
  `,
  styles: [`
  
  `]
})
export class ScrWalletNewDemoComponent {

  public userId: string = '3fed1db8-f2b7-4d01-aa67-ab8ce409ad91';

  constructor(private router: Router) {
  }

  public onWalletCreationFinished() {
    console.log('finished wallet creation');

    this.router.navigate(['/wallet'])
  }
}
