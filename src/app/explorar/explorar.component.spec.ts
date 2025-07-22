import { Component } from '@angular/core';

@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.component.html',
  styleUrls: ['./explorar.component.css']
})
export class ExplorarComponent {

  openSpotify(genre: string): void {
    const playlists: { [key: string]: string } = {
      'indie': 'https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd',
      'pop': 'https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M',
      'chill': 'https://open.spotify.com/playlist/37i9dQZF1DX0SM0LYsmbMT',
      'rock': 'https://open.spotify.com/playlist/37i9dQZF1DWXRqgorJj26U',
      'electronic': 'https://open.spotify.com/playlist/37i9dQZF1DX0BcQWzuB7ZO',
      'acoustic': 'https://open.spotify.com/playlist/37i9dQZF1DX1s9knjP51Oa'
    };

    const url = playlists[genre] || 'https://open.spotify.com/';
    window.open(url, '_blank');
  }

}
