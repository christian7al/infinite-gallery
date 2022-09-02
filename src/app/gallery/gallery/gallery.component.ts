import { Component, OnDestroy, OnInit } from '@angular/core';
import { Gallery } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { Subject, takeUntil } from 'rxjs';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'infinite-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.sass']
})
export class GalleryComponent implements OnInit, OnDestroy {

  imageList: any[] = []
  page: number = 1
  private ngUnsubscribe = new Subject<void>()

  constructor(
    public searchService: SearchService,
    public gallery: Gallery,
    public lightbox: Lightbox
  ) { }

  ngOnInit(): void {
    this.searchService.keyword.asObservable()
    .pipe(
      takeUntil(this.ngUnsubscribe)
    )
    .subscribe((keyword) => {
      if (keyword.length) {
        this.loadPhotos()
      } else {
        this.imageList = []
      }
    })
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next()
    this.ngUnsubscribe.complete()
  }

  loadPhotos() {
    this.searchService.searchForPhotos(this.page)
    .pipe(
      takeUntil(this.ngUnsubscribe)
    )
    .subscribe(photos => {
        this.imageList = photos
    })
  }

  onScroll() {
    const keyword = this.searchService.keyword.getValue()
    if (keyword && keyword.length > 0) {
      this.searchService.searchForPhotos(++this.page)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((photos) => {
        this.imageList = this.imageList.concat(photos)
      })
    }
  }

}
