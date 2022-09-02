import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'infinite-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {

  readonly searchTerm = new FormControl()

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
  }

  triggerSearch() {
    this.searchService.keyword.next(this.searchTerm.value)
  }

}
