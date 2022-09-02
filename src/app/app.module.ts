import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PhotoGalleryModule } from './gallery/gallery.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PhotoGalleryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
