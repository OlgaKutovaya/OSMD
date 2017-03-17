import { Component, OnInit } from '@angular/core';
import { MessageService } from './message.service';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: [ './message.component.sass' ]
})
export class MessageComponent implements OnInit {
  messages: Message[] = [];

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
    this.messageService.getMessage()
      .subscribe(message => {
        if (message) {
          this.messages.push(message)
        } else {
          this.messages = [];
        }
      });
  }

}
