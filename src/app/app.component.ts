import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // só o RouterOutlet já tá ótimo aqui, pq o roteamento é provido no main.ts
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // corrigido styleUrls (plural)
})
export class AppComponent {
  title = 'miausicbox';
}
