import { PostsService } from "./posts.service"
import { TestBed } from "@angular/core/testing"
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { Post } from "src/app/models/posts"

describe('PostsService with HttpClient', () => {
    let postsService: PostsService
    let httpTestingController: HttpTestingController
    let posts: Post[] = [
        { userId: 1, id: 1, title: 'title-1', body: 'body-1' },
        { userId: 2, id: 2, title: 'title-2', body: 'body-2' },
        { userId: 3, id: 3, title: 'title-3', body: 'body-3' }
    ]

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PostsService],
            imports: [HttpClientTestingModule]
        })
        postsService = TestBed.inject(PostsService)
        httpTestingController = TestBed.inject(HttpTestingController)
    })

    it('should return posts when getPosts is called', (done: DoneFn) => {
        postsService.getPosts().subscribe(data => {
            expect(data).toEqual(posts)
            done()
        })
        const request = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/posts')
        request.flush(posts)
        expect(request.request.method).toBe('GET')
    })

    it('should return single-post when getPosts is called using id', (done: DoneFn) => {
        postsService.getPost(1).subscribe(data => {
            expect(data).toEqual(posts[0] as Post)
            done()
        })
        const request = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/posts/1')
        request.flush(posts[0])
        expect(request.request.method).toBe('GET')
    })

    afterEach(() => httpTestingController.verify())
})