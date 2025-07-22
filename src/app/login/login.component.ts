import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { inject } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  auth: Auth = inject(Auth);
  router = inject(Router);

  async loginUser() {
    try {
      await signInWithEmailAndPassword(this.auth, this.email, this.password);
      alert('Login realizado com sucesso!');
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error(error);
      alert('Erro no login. Verifique o email e a senha.');
    }
  }
}
