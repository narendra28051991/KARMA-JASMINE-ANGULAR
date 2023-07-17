import { Post } from "src/app/models/posts"
import { PostsComponent } from "./posts.component"
import { of } from "rxjs"
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { PostsService } from "src/app/services/posts/posts.service"
import { By } from "@angular/platform-browser"
import { PostDetailsComponent } from "../post-details/post-details.component"

describe('post component works fine', () => {
    let posts: Post[]
    let postService: any
    let fixture: ComponentFixture<PostsComponent>
    let component: PostsComponent

    beforeEach(() => {

        posts = [
            { userId: 1, id: 1, title: 'title-1', body: 'body-1' },
            { userId: 2, id: 2, title: 'title-2', body: 'body-2' },
            { userId: 3, id: 3, title: 'title-3', body: 'body-3' }
        ]

        postService = jasmine.createSpyObj(['getPosts', 'deletePost'])
        TestBed.configureTestingModule({
            declarations: [
                PostsComponent,
                PostDetailsComponent
            ],
            providers: [
                {
                    provide: PostsService,
                    useValue: postService
                }
            ]
        })

        fixture = TestBed.createComponent(PostsComponent)
        component = fixture.componentInstance
    })

    describe('get posts', () => {

        beforeEach(() => {
            postService.getPosts.and.returnValue(of(posts))
            fixture.detectChanges()
        })

        it('should get the posts directly', () => {
            expect(component.posts.length).toBe(3)
        })

        it('should check the post-detail components created using class', () => {
            const debugElement = fixture.debugElement
            const postDetails = debugElement.queryAll(By.css('.posts'))
            expect(postDetails.length).toBe(posts.length)
        })

        it('should check the post-detail components created using directive', () => {
            const debugElement = fixture.debugElement
            const postDetails = debugElement.queryAll(By.directive(PostDetailsComponent))
            postDetails.forEach((post, index) => {
                let eachPost = post.componentInstance as PostDetailsComponent
                expect(eachPost.post.title).toEqual(posts[index].title)
                expect(eachPost.post.body).toEqual(posts[index].body)
            })
        })

        it('should check the post-detail is exactly received from the posts', () => {
            const debugElement = fixture.debugElement
            const postDetails = debugElement.queryAll(By.directive(PostDetailsComponent))
            expect(postDetails.length).toBe(posts.length)
        })
    })
    
    describe('delete method', () => {

        beforeEach(() => {
            postService.deletePost.and.returnValue(of(true))
            component.posts = posts
        })
        
        it('delete a post', () => {
            component.deletePost(component.posts[1])
            expect(component.posts.length).toBe(2)
        })

        it('should delete the correct post', () => {
            component.deletePost(component.posts[1])
            component.posts.forEach(post => expect(post).not.toEqual(posts[1]))
        })

        it('delete method is called only once', () => {
            component.deletePost(component.posts[1])
            expect(postService.deletePost).toHaveBeenCalledTimes(1)
        })

        it('delete method is called in the parent when button in the child component is clicked', () => {
            spyOn(component, 'deletePost')
            postService.getPosts.and.returnValue(of(posts))
            fixture.detectChanges()
            const debugElement = fixture.debugElement
            const postDetails = debugElement.queryAll(By.directive(PostDetailsComponent))
            postDetails.forEach((post, index) => {
                post.query(By.css('button')).triggerEventHandler('click', { preventDefault: () => { } })
                expect(component.deletePost).toHaveBeenCalledWith(posts[index])
            })
        })

        it('delete method is called in the parent when event emitter in the child component is emitted', () => {
            spyOn(component, 'deletePost')
            postService.getPosts.and.returnValue(of(posts))
            fixture.detectChanges()
            const debugElement = fixture.debugElement
            const postDetails = debugElement.queryAll(By.directive(PostDetailsComponent))
            postDetails.forEach((post, index) => {
                (post.componentInstance as PostDetailsComponent).delete.emit(posts[index])
                expect(component.deletePost).toHaveBeenCalledWith(posts[index])
            })
        })
    })
})