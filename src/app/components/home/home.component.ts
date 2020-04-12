import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube.service';
declare var $ :any;
// import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  videos: any[] = [];
  videoSel: any;

  constructor(public _yts: YoutubeService) {
    this._yts.getVideos().subscribe( videos => {
      if(videos){
        this.videos = videos;
      }
    });
   }

  ngOnInit() {
  }

  verVideo(video:any){
    console.log("ver video", video);
    
    this.videoSel = video;
    $('#myModal').modal();
  }

  cerrarModal(){
    this.videoSel = null;
    $('#myModal').modal('hide');
  }

  cargarMasVideos(){
    console.log("Cargando videos");
    
    this._yts.getVideos().subscribe( videos => {
      console.log(videos);
      
      if(videos){
        this.videos.push(...videos);
      }
    });

  }

  onScroll() {
    this.cargarMasVideos();
  }
}
