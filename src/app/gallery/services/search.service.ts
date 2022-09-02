import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, debounceTime, finalize, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private readonly apiKey: string
  public keyword = new BehaviorSubject<string>('')

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) {
    this.apiKey = environment.flickrApiKey
  }

  getFullUrl(page: number) {
    const searchTerm = this.keyword.getValue()
    const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&'
    const requestParams = `api_key=${environment.flickrApiKey}&text=${searchTerm}&format=json&nojsoncallback=1&per_page=20&page=${page}`
    return url + requestParams
  }

  searchForPhotos(page: number): Observable<any> {
    this.loadingService.startLoading()
    const fullUrl = this.getFullUrl(page)
    return this.http.get(fullUrl)
    .pipe(
      debounceTime(1000),
      finalize(() => this.loadingService.stopLoading()),
      map((res: any) => {
        return res.photos.photo.map((pic: any) => {
          return {
            url: `https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`,
            title: pic.title
          }
        })
      }),
      catchError((error) => { return error.message })
    )
  }
}
