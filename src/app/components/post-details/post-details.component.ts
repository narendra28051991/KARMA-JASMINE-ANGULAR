import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from 'src/app/models/posts';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent {
  @Input() post!: Post
  @Output() delete = new EventEmitter<Post>()

  deletePost = (event: Event) => {
    event.preventDefault()
    this.delete.emit(this.post)
  }
}