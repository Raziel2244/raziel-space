import { Component } from '@angular/core';
import { faDeviantart, faDiscord, faGit, faGithub, faInstagram, faMastodon, faPlaystation, faReddit, faSpotify, faSteam, faTelegram, faTumblrSquare, faTwitch, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  faDeviantart = faDeviantart;
  faDiscord = faDiscord;
  faGit = faGit;
  faGithub = faGithub;
  faInstagram = faInstagram;
  faMastodon = faMastodon;
  faPlaystation = faPlaystation;
  faReddit = faReddit;
  faSpotify = faSpotify;
  faSteam = faSteam;
  faTelegram = faTelegram;
  faTumblrSquare = faTumblrSquare;
  faTwitch = faTwitch;
  faTwitter = faTwitter;
  faYoutube = faYoutube;
}
