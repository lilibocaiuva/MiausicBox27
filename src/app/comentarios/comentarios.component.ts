import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Firestore, collectionData, collection, addDoc, query, orderBy } from '@angular/fire/firestore';

interface Comentario {
  id?: string;
  texto: string;
  autor: string;
  data: Date;
}

@Component({
  selector: 'app-comentarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css'],
})
export class ComentariosComponent implements OnInit {
  comentarios: Comentario[] = [];
  novoComentario: string = '';
  autor: string = '';

  constructor(private firestore: Firestore) {}

  ngOnInit() {
    const comentariosRef = collection(this.firestore, 'comentarios');
    const q = query(comentariosRef, orderBy('data', 'desc'));
    collectionData(q, { idField: 'id' }).subscribe((dados) => {
      this.comentarios = dados as Comentario[];
    });
  }

  async enviarComentario() {
    if (!this.novoComentario.trim() || !this.autor.trim()) return alert('Preencha seu nome e o comentário!');

    const comentariosRef = collection(this.firestore, 'comentarios');
    await addDoc(comentariosRef, {
      texto: this.novoComentario,
      autor: this.autor,
      data: new Date()
    });

    this.novoComentario = '';
  }
}
