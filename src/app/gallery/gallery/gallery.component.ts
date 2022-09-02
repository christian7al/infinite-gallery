import { Component, OnInit } from '@angular/core';
import { Gallery, GalleryRef, ImageSize, ThumbnailsPosition } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'infinite-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.sass']
})
export class GalleryComponent implements OnInit {

  imageList: any[] = []
  page: number = 1

  constructor(
    public searchService: SearchService,
    public gallery: Gallery,
    public lightbox: Lightbox
  ) { }

  ngOnInit(): void {
    this.searchService.keyword.asObservable()
    .subscribe(() => {
      this.loadPhotos()
    })
  }

  loadPhotos() {
    this.searchService.searchForPhotos(this.page)
    .subscribe(photos => {
      if (!photos.length) {
        this.imageList = []
      } else {
        this.imageList = [...photos]
      }
    })
  }

  onScroll() {
    const keyword = this.searchService.keyword.getValue()
    if (keyword && keyword.length > 0) {
      this.searchService.searchForPhotos(this.page++)
      .subscribe((photos) => {
        this.imageList = this.imageList.concat(photos)
      })
    }
  }

}
