import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { link } from 'fs';

interface CarrouselItem {
  id: number;
  type: 'album' | 'artist' | 'music';
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  backgroundColor: string;
}

@Component({
  selector: 'app-carrousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css']
})
export class CarrouselComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  autoSlideInterval: any;

  carrouselItems: CarrouselItem[] = [
    {
      id: 1,
      type: 'album',
      title: 'Álbum Icônico',
      subtitle: 'Loveless - My Bloody Valentine',
      description: 'O ápice do shoegaze com camadas de guitarras etéreas e vocais oníricos.',
      imageUrl: 'mbv.jpg',
      buttonText: 'Explorar Álbum',
      backgroundColor: '#66CDAA'
    },
    {
      id: 2,
      type: 'artist',
      title: 'Banda Intensa',
      subtitle: 'Deftones',
      description: 'Metal alternativo com atmosferas experimentais.',
      imageUrl: 'deftones.jpg',
      buttonText: 'Ver Artista',
      backgroundColor: '#DDA0DD'
    },
    {
      id: 3,
      type: 'artist',
      title: 'Pop Psicodélico ou R&B',
      subtitle: 'Frank Ocean',
      description: 'Estética pop e letras íntimas.',
      imageUrl: 'Frank Ocean.jpg',
      buttonText: 'Conhecer Artista',
      backgroundColor: '#F08080'
    }
  ];
deftones: any;

  ngOnInit() {
    this.autoSlideInterval = setInterval(() => this.nextSlide(), 4000);
  }

  ngOnDestroy() {
    clearInterval(this.autoSlideInterval);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.carrouselItems.length;
  }

  prevSlide() {
    this.currentSlide =
      this.currentSlide === 0 ? this.carrouselItems.length - 1 : this.currentSlide - 1;
  }

  getSlideTransform() {
    return `translateX(-${this.currentSlide * 100}%)`;
  }
}
