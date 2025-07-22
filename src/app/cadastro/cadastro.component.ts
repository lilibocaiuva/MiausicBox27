import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { inject } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']

})
export class CadastroComponent {
  email: string = '';
  password: string = '';
  nome: string = '';

  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);

  signUp() {
    createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then(async userCredential => {
        const uid = userCredential.user.uid;

        // Salvando no Firestore
        await setDoc(doc(this.firestore, "usuarios", uid), {
          nome: this.nome,
          email: this.email,
          criadoEm: new Date().toISOString()
        });

        alert('Cadastro realizado com sucesso!');
      })
      .catch(error => {
        console.error('Erro no cadastro:', error);
        alert('Erro ao cadastrar: ' + error.message);
      });
  }
}
