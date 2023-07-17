import { PostsService } from './posts.service';
import { Post } from 'src/app/models/posts';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';

describe('PostsService', () => {
  let postService: PostsService;
  let httpClient: jasmine.SpyObj<HttpClient>;
  let posts: Post[] = [
    { userId: 1, id: 1, title: 'title-1', body: 'body-1' },
    { userId: 2, id: 2, title: 'title-2', body: 'body-2' },
    { userId: 3, id: 3, title: 'title-3', body: 'body-3' }
  ]

  beforeEach(() => {
    let httpClientInstance = jasmine.createSpyObj('HttpClient', ['get'])

    TestBed.configureTestingModule({
      providers: [
        PostsService,
        {
          provide: HttpClient,
          useValue: httpClientInstance
        }
      ]
    })

    postService = TestBed.inject(PostsService)
    httpClient = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>
  });

  describe('get the posts', () => {
    it('should be created', (done: DoneFn) => {
        httpClient.get.and.returnValue(of(posts))
        postService.getPosts().subscribe({
            next: (getPosts) => {
                expect(getPosts).toEqual(posts)
                done()
            },
            error: () => {
              done.fail
            }
        })
        expect(httpClient.get).toHaveBeenCalledTimes(1)
    });  
  })
});
