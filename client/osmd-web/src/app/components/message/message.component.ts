import { Component, OnInit, OnDestroy } from '@angular/core';

import { MessageService } from './message.service';
import { Message } from 'primeng/primeng';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: [ './message.component.sass' ]
})
export class MessageComponent implements OnInit, OnDestroy {

  private messageSubscription: Subscription;
  messages: Message[] = [];

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
    this.messageSubscription = this.messageService.getMessage()
      .subscribe(message => {
        if (message) {
          this.messages.push(message);
        } else {
          this.messages = [];
        }
      });
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }

}
