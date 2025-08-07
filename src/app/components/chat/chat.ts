import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


interface Message{
  from:'user' | 'bot';
  type:'text' |'image';
  text?:string;
  imageSrc?:string;

}
@Component({
  standalone: true,
  selector: 'app-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrls: ['./chat.css']
})
export class Chat {
  messages:Message[]=[];
  userInput = '';

sendMessager() {
  if (!this.userInput.trim()) return;

  const userMessage = this.userInput.trim().toLowerCase();
  this.messages.push({
    from: 'user',
    type: 'text',
    text: this.userInput
  });

 let botResponse = 'Lo siento, no entendí tu mensaje. ¿Puedes especificar qué tipo de flores o arreglos buscas?';

if (userMessage.includes('hola') || userMessage.includes('buenos dias')) {
  botResponse = '¡Hola! Bienvenido a nuestra florería La orquídea😊 ¿En qué puedo ayudarte hoy?';
} else if (
  userMessage.includes('con flores') ||
  userMessage.includes('con ramos') ||
  userMessage.includes('con arreglos')
) {
  botResponse = '¡Claro! Tenemos una gran variedad de flores frescas y arreglos para todas las ocasiones. ¿Buscas algo para un evento especial o para regalar?';
} else if (
  userMessage.includes('para cumpleaños') ||
  userMessage.includes('para aniversario') ||
  userMessage.includes('para regalo')
) {
  botResponse = 'Perfecto. Tenemos ramos y arreglos especiales para esa ocasión. ¿Te interesa algún color o tipo de flor en particular?';
} else if (
  userMessage.includes('rosas rojas') && userMessage.includes('una docena')
) {
  botResponse = 'Excelente elección. Tenemos docenas de rosas rojas frescas disponibles. ¿Quieres que te enviemos el catálogo completo?';
} else if (
  userMessage.includes('ayudame con el catalogo') ||
  userMessage.includes('catalogo') ||
  userMessage.includes('enviar')
) {
  botResponse = `Aquí tienes el catálogo de flores y arreglos 👩‍🌾:<br/>
  📄 Consulta el catálogo <a href="https://www.florerialaorquidea.com/catalogo/?srsltid=AfmBOormPnLtFfKgQhuVXzfRYdxCDfC0ClRP3p7iQiomkrrLe43Polff" target="_blank" rel="noopener noreferrer">aquí</a>.<br/>
  Si te interesa alguno, puedo ayudarte a hacer el pedido 😉`;
} else if (
  userMessage.includes('gracias') ||
  userMessage.includes('muy amable')
) {
  botResponse = '¡Con gusto! Si necesitas ayuda con otra consulta, estoy aquí para asistirte 💐';
}

  this.messages.push({
    from: 'bot',
    type: 'text',
    text: botResponse
  });
    this.userInput ='';
  }
  onFileSelected(event:Event){
    const input =event.target as HTMLInputElement;
    if(!input.files?.length) return;

    const file = input.files[0];
    const reader =new FileReader();

    reader.onload=()=>{
      this.messages.push({
        from:'user',
        type:'image',
        imageSrc:reader.result as string
      });

      this.messages.push({
        from:'bot',
        type:'text',
        text:'Bot ha resivido tu imagen'
      });
    };
    reader.readAsDataURL(file);
  }

}
