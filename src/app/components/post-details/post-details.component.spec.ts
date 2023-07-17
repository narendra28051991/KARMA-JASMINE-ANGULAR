import { first } from "rxjs"
import { PostDetailsComponent } from "./post-details.component"
import { Post } from "src/app/models/posts"
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser"

describe('single post component', () => {
    let fixture: ComponentFixture<PostDetailsComponent>
    let component: PostDetailsComponent

    beforeEach(() => {
        TestBed.configureTestingModule({ declarations: [PostDetailsComponent] })
        fixture = TestBed.createComponent(PostDetailsComponent)
        component = fixture.componentInstance
    })

    it('should create post component using TestBed', () => {
        expect(component).toBeDefined()
    })

    it('should render the post title in the anchor tag', () => {
        const post: Post = { userId: 2, id: 2, title: 'title-2', body: 'body-2' }
        component.post = post
        fixture.detectChanges()
        const postDetailsElement: HTMLElement = fixture.nativeElement
        const anchorTag = postDetailsElement.querySelector('a')
        expect(anchorTag?.textContent).toContain(component.post.title)
    })

    it('should render the post title in the anchor tag using debug element', () => {
        const post: Post = { userId: 2, id: 2, title: 'title-2', body: 'body-2' }
        component.post = post
        fixture.detectChanges()
        const postDetailsElement = fixture.debugElement
        const anchorTag = postDetailsElement.query(By.css('a')).nativeElement
        expect(anchorTag?.textContent).toContain(component.post.title)
    })

    it('should raise an event when delete button is clicked', () => {
        const post: Post = { userId: 1, id: 1, title: 'title-1', body: 'body-1' }
        
        component.post = post

        component.delete.pipe(first()).subscribe((selectedPost) => {
            expect(selectedPost).toBe(post)
        })
        
        component.deletePost(new MouseEvent('click'))
    })
})