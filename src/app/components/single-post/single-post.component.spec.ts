import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePostComponent } from './single-post.component';
import { PostsService } from 'src/app/services/posts/posts.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { Post } from 'src/app/models/posts';
import { FormsModule } from '@angular/forms';

describe('SinglePostComponent', () => {
  let post!: Post
  let postsService: jasmine.SpyObj<PostsService>
  let location: jasmine.SpyObj<Location>
  let fixture: ComponentFixture<SinglePostComponent>;
  let route = {
    snapshot: {
      paramMap: {
        get: () => { return '3' }
      }
    }
  }

  beforeEach(() => {
    postsService = jasmine.createSpyObj(['getPost', 'updatePost'])
    location = jasmine.createSpyObj(['goBack'])

    TestBed.configureTestingModule({
      declarations: [SinglePostComponent],
      imports: [FormsModule],
      providers: [
        { provide: PostsService, useValue: postsService },
        { provide: Location, useValue: location },
        { provide: ActivatedRoute, useValue: route }
      ]
    });

    fixture = TestBed.createComponent(SinglePostComponent);
  });

  it('should render the h2 in the single post component', () => {
    postsService.getPost.and.returnValue(of({ userId: 1, id: 1, title: 'title', body: 'body' } as Post))
    fixture.detectChanges()
    const h2 = fixture.nativeElement.querySelector('h2') as HTMLElement
    expect(h2.textContent).toEqual(fixture.componentInstance.post.title)
  })
  
});
