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


  public userId: string = '4f61f582-559a-4988-9d59-cdcb7b659a22';

  constructor(private router: Router) {
  }

  public onWalletCreationFinished() {
    console.log('finished wallet creation');

    this.router.navigate(['/wallet'])
  }
}
