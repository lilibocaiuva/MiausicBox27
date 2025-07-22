import { Component, OnInit, OnDestroy, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { ComentariosComponent } from '../comentarios/comentarios.component';
import { RouterModule } from '@angular/router'; 

declare const SC: any;

interface Track {
  title: string;
  url: string;
  cover: string;
  genre: string;
}

interface Stats {
  totalTracks: number;
  hoursPlayed: number;
  favoriteGenre: string;
  usersActive: string;
}

type GenreType = 'lofi' | 'jazz' | 'chillhop' | 'ambient' | 'electronic' | 'classical';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule], 
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
  
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('scPlayer', { static: false }) scPlayer?: ElementRef<HTMLIFrameElement>;

  currentTracks: Track[] = [];
  trackIndex: number = 0;
  isPlaying: boolean = false;
  currentGenre: GenreType = 'lofi';
  progressPercent: number = 0;
  currentTrack: Track | null = null;

  selectedGenreName: string = '';
  selectedGenreDescription: string = '';

  stats: Stats = {
    totalTracks: 40,
    hoursPlayed: 127,
    favoriteGenre: 'Lo-Fi',
    usersActive: '1.2k'
  };

  private widget: any;
  private statsInterval: any;

  private readonly tracksByGenre: Record<GenreType, Track[]> = {
    lofi: [ /* ... */ ],
    jazz: [ /* ... */ ],
    chillhop: [ /* ... */ ],
    ambient: [ /* ... */ ],
    electronic: [ /* ... */ ],
    classical: [ /* ... */ ]
  };

  private readonly genreDescriptions: Record<GenreType, string> = {
    lofi: "Música lo-fi relaxante perfeita para estudar, trabalhar ou simplesmente relaxar com seu gatinho.",
    jazz: "Jazz suave e sofisticado que combina perfeitamente com tardes preguiçosas.",
    chillhop: "Beats chill hop modernos com uma vibe descontraída para acompanhar seu dia.",
    ambient: "Música ambiente para criar uma atmosfera calma e tranquila.",
    electronic: "Música eletrônica experimental com toques felinos únicos.",
    classical: "Peças clássicas reimaginadas com uma interpretação felina moderna."
  };

  ngOnInit(): void {
    this.loadGenre('lofi');
    this.startStatsUpdates();
  }

  ngAfterViewInit(): void {
    this.initializeSoundCloudWidget();
  }

  ngOnDestroy(): void {
    if (this.statsInterval) {
      clearInterval(this.statsInterval);
    }
  }

  private initializeSoundCloudWidget(): void {
    if (typeof SC !== 'undefined' && this.scPlayer?.nativeElement) {
      this.widget = SC.Widget(this.scPlayer.nativeElement);
      this.setupWidgetEvents();
    } else {
      console.warn('SoundCloud Widget API ou o iframe não estão disponíveis');
    }
  }

  private setupWidgetEvents(): void {
    if (!this.widget) return;

    this.widget.bind(SC.Widget.Events.PLAY, () => this.isPlaying = true);
    this.widget.bind(SC.Widget.Events.PAUSE, () => this.isPlaying = false);

    this.widget.bind(SC.Widget.Events.PLAY_PROGRESS, (e: any) => {
      if (e.duration > 0) {
        this.progressPercent = (e.currentPosition / e.duration) * 100;
      }
    });

    this.widget.bind(SC.Widget.Events.FINISH, () => {
      this.nextTrack();
      setTimeout(() => this.widget?.play(), 100);
    });
  }

  loadGenre(genre: GenreType): void {
    this.currentGenre = genre;
    this.currentTracks = this.tracksByGenre[genre] || [];
    this.trackIndex = 0;
    this.selectedGenreName = this.capitalizeFirst(genre);
    this.selectedGenreDescription = this.genreDescriptions[genre];

    if (this.currentTracks.length > 0) {
      this.loadTrack(0);
    }
  }

  private loadTrack(index: number): void {
    if (!this.currentTracks[index] || !this.widget) return;

    this.trackIndex = index;
    this.currentTrack = this.currentTracks[index];

    this.widget.load(this.currentTrack.url, {
      auto_play: false
    });

    this.progressPercent = 0;
    this.isPlaying = false;
  }

  togglePlay(): void {
    if (!this.widget) return;

    this.isPlaying ? this.widget.pause() : this.widget.play();
  }

  previousTrack(): void {
    const newIndex = (this.trackIndex - 1 + this.currentTracks.length) % this.currentTracks.length;
    this.loadTrack(newIndex);
  }

  nextTrack(): void {
    const newIndex = (this.trackIndex + 1) % this.currentTracks.length;
    this.loadTrack(newIndex);
  }

  selectTrack(index: number): void {
    this.loadTrack(index);
    this.widget?.play();
  }

  seekTo(event: MouseEvent): void {
    if (!this.widget) return;

    const element = event.currentTarget as HTMLElement;
    const rect = element.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = clickX / rect.width;

    this.widget.getDuration((duration: number) => {
      this.widget.seekTo(percentage * duration);
    });
  }

  private startStatsUpdates(): void {
    this.statsInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        this.stats.hoursPlayed += Math.floor(Math.random() * 2);
      }

      if (Math.random() > 0.8) {
        const currentUsers = parseFloat(this.stats.usersActive.replace('k', ''));
        const change = (Math.random() - 0.5) * 0.1;
        this.stats.usersActive = (currentUsers + change).toFixed(1) + 'k';
      }
    }, 5000);
  }

  private capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
