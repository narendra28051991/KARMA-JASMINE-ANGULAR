import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/posts';
import { PostsService } from 'src/app/services/posts/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[] = []

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.getPosts()
  }

  getPosts = () => {
    this.postsService.getPosts().subscribe((posts) => {
      this.posts = posts
    })
  }

  deletePost = (post: Post) => {
    this.posts = this.posts.filter((singlePost) => singlePost.id != post.id)
    this.postsService.deletePost(post).subscribe()
  }
}
