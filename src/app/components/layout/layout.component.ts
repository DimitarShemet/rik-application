import { Component } from '@angular/core';
import { Actions } from 'src/app/actions/actions-enum';
import { UsersApiService } from 'src/app/services/api-services/users-api.service';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  constructor(private communicationService: CommunicationService) {}

  blockUsers() {
    this.communicationService.emit(Actions.Block);
  }

  unblockUsers() {
    this.communicationService.emit(Actions.Unblock);
  }
}
