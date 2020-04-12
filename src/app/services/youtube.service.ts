import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
// import { URLSearchParams } from 'url';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeurl: string = "https://www.googleapis.com/youtube/v3";  
  private apikey: string = "AIzaSyCHhZwE-GIfZI7USQSNrl1DkWl_GhbUWBY";
  private playlistId: string = "PL7WYyrIvpyENcbQ1a1pXqNxcy9ADIrzsS";
  private nextPageToken: string = "";

  constructor(public http: HttpClient) { }

  getVideos(){
    let params: URLSearchParams = new URLSearchParams();
    params.set('part', 'snippet');
    params.set('maxResults', '3');
    params.set('playlistId', this.playlistId);
    params.set('key', this.apikey);
    if (this.nextPageToken){
      params.set('pageToken', this.nextPageToken);
    }
    
    console.log(params.toString());
    let url = `${ this.youtubeurl }/playlistItems?`+ params.toString();
    
    console.log(url);
    
    return this.http.get( url )
                    .pipe(map((res:any) =>{
                      // console.log(res);
                      
                      this.nextPageToken = res.nextPageToken;   
                      let videos:any[] = [];

                      res.items.forEach(v => {
                        videos.push(v.snippet);
                      });                      
                      // console.log(videos);
                      return videos;
                    } ));
      ;
  }
}
