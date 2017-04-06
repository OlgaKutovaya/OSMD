import { Component, OnInit, OnDestroy } from '@angular/core';

import { MessageService } from './message.service';
import { Message } from './message.interface';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: [ './message.component.sass' ]
})
export class MessageComponent implements OnInit, OnDestroy {

  private messageSubscription: Subscription;
  messages: Message[] = [];
  defaultTimeout = 3000;
  messageTimeout: number;

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
    this.messageSubscription = this.messageService.getMessage()
      .subscribe(message => {
        if (message) {
          this.messageTimeout = message.timeout || this.defaultTimeout;
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
