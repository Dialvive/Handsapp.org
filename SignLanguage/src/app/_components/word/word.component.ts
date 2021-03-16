import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css']
})

export class WordComponent implements OnInit {
  
  video: any;

  constructor() { }

  ngOnInit(): void {
    this.video = document.getElementById("sign-video");
  }

  setTurtle(){
    this.video.playbackRate = 0.5;
  }

  setPlay(){
    if(this.video.paused){
      document.getElementById("icon").className = "bi bi-pause-fill";
      this.video.play();
    } else {
      this.video.pause();
      document.getElementById("icon").className = "bi bi-play-fill";
    }
  }

  setRabbit(){
    this.video.playbackRate = 1;
  }

  setFox(){
    this.video.playbackRate = 1.5;
  }
  

  public openFullscreen() {
    if (this.video.requestFullscreen) {
      this.video.requestFullscreen();
    } else if (this.video.webkitRequestFullscreen) {
      this.video.webkitRequestFullscreen();
    } else if (this.video.msRequestFullscreen) {
      this.video.msRequestFullscreen();
    }
  } 

}

