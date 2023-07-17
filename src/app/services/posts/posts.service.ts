import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from 'src/app/models/posts';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient ) { }

  posts: Post[] = []

  getPosts = () => {
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
  }

  getPost = (id: number) => {
    return this.http.get<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`)
  }

  deletePost = (post: Post) => {
    return this.http.delete(`https://jsonplaceholder.typicode.com/posts/${post.id}`)
  }

  updatePost = (post: Post) => {
    return this.http.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`, post)
  }
}
