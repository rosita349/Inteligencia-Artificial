import { Component, signal } from '@angular/core';
import { Chat } from './components/chat/chat';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Chat],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('chatbot-app');
}
