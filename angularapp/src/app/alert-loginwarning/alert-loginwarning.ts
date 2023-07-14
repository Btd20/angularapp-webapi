import { Component, Input } from '@angular/core';
import { NgbAlertConfig, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'alert-loginwarning',
  standalone: true,
  imports: [NgbAlertModule],
  templateUrl: './alert-loginwarning.html',
  // add NgbAlertConfig  to the component providers
  providers: [NgbAlertConfig],
})
export class AlertLoginWarning {
  @Input() public alerts: Array<string> = [];

  constructor(alertConfig: NgbAlertConfig) {
    // customize default values of alerts used by this component tree
    alertConfig.type = 'warning';
    alertConfig.dismissible = false;
  }
}
