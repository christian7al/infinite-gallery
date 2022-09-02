import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'infinite-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent {

  searchTerm = new FormControl()

  constructor(public searchService: SearchService) { }

  triggerSearch() {
    this.searchService.keyword.next(this.searchTerm.value)
  }

  clearValue() {
    this.searchTerm.setValue('')
    this.triggerSearch()
  }

}
