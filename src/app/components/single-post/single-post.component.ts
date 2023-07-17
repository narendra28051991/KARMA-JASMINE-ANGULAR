import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/posts';
import { PostsService } from 'src/app/services/posts/posts.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {
  post!: Post

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getPost()
  }

  getPost() {
    const id = this.route.snapshot.paramMap.get('id')
    id && this.postsService.getPost(+id).subscribe(post => this.post = post)
  }

  goBack() {
    this.location.back()
  }

  savePost() {
    this.postsService.updatePost(this.post).subscribe(() => this.goBack())
  }
}
