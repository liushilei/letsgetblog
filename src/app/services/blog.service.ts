import { Blog } from '../model/blog';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { throwError, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  constructor(private _http: HttpClient) {}

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'Server Error');
  }

  getBlogs(): Observable<Blog[]> {
    return this._http.get<Blog[]>(`${environment.baseUrl}/posts`).pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.errorHandler)
    );
  }

  getBlogById(id: number): Observable<Blog> {
    return this._http.get<Blog>(`${environment.baseUrl}/posts/${id}`).pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.errorHandler)
    );
  }

  getCommentsByBlogId(bId: number): Observable<Comment[]> {
    return this._http
      .get<Comment[]>(`${environment.baseUrl}/posts/${bId}/comments`)
      .pipe(
        tap(data => JSON.stringify(data)),
        catchError(this.errorHandler)
      );
  }

  addCommentToBlog(bId: number, data: any): Observable<any> {
    return this._http.post(
      `${environment.baseUrl}/posts/${bId}/comments`,
      data
    );
  }

  updateCommentById(cId: number, data: any): Observable<any> {
    return this._http.put(`${environment.baseUrl}/comments/${cId}`, data);
  }
}
