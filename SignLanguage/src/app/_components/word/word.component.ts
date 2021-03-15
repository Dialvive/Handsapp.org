import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css']
})
export class WordComponent implements OnInit {

  vid: any;

  constructor() { }

  ngOnInit(): void {
    this.vid = document.getElementById("sign-video");
  }

  public setPlaybackSpeed(speed: number){
    switch (speed) {
      case 0.5:
        if (this.vid.playbackRate) {
          this.vid.playbackRate = 0.5;
        } else if (this.vid.webkitPlaybackRate) {
          this.vid.webkitPlaybackRate = 0.5;
        } else if (this.vid.msPlaybackRate) {
          this.vid.msPlaybackRate = 0.5;
        }
        break;
    
      case 1.5:
        if (this.vid.playbackRate) {
          this.vid.playbackRate = 1.5;
        } else if (this.vid.webkitPlaybackRate) {
          this.vid.webkitPlaybackRate = 1.5;
        } else if (this.vid.msPlaybackRate) {
          this.vid.msPlaybackRate = 1.5;
        }
        break;

      default:
        if (this.vid.playbackRate) {
          this.vid.playbackRate = 1;
        } else if (this.vid.webkitPlaybackRate) {
          this.vid.webkitPlaybackRate = 1;
        } else if (this.vid.msPlaybackRate) {
          this.vid.msPlaybackRate = 1;
        }
        break;
    }
  }

  public openFullscreen() {
    if (this.vid.requestFullscreen) {
      this.vid.requestFullscreen();
    } else if (this.vid.webkitRequestFullscreen) {
      this.vid.webkitRequestFullscreen();
    } else if (this.vid.msRequestFullscreen) {
      this.vid.msRequestFullscreen();
    }
  } 

}

