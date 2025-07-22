import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
senha: any;
cadastrarUser() {
throw new Error('Method not implemented.');
}
  // 📌 Dados do formulário
  email: string = '';
  password: string = '';
  nome: string = '';

  // 🔌 Firebase
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);

  // 🪪 Cadastrar novo usuário
  signUp() {
    if (!this.nome || !this.email || !this.password) {
      alert('Preencha todos os campos.');
      return;
    }

    createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then(async userCredential => {
        const uid = userCredential.user.uid;

        // Salva os dados no Firestore
        await setDoc(doc(this.firestore, "usuarios", uid), {
          nome: this.nome,
          email: this.email,
          criadoEm: new Date().toISOString()
        });

        alert('Cadastro realizado com sucesso!');
        // Aqui tu pode redirecionar para o login, se quiser
        // this.router.navigate(['/login']);
      })
      .catch(error => {
        console.error('Erro no cadastro:', error);
        alert('Erro ao cadastrar: ' + error.message);
      });
  }
}
