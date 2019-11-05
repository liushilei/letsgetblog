import { Blog } from '../model/blog';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareBlogService {
  public blog: Blog;
  public refreshComments: EventEmitter<any> = new EventEmitter();
  constructor() {}
}
