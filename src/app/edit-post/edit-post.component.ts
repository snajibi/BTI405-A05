import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnDestroy {

  blogPost: BlogPost = new BlogPost;
  tags!: string;
  private post: any;

  constructor(private data: PostService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.post = this.data.getPostByID(this.route.snapshot.params['id']).subscribe(data => {
      this.blogPost = data; 
      this.tags = data.tags.toString();
    })
  }
  
  ngOnDestroy() {
    if (this.post) this.post.unsubscribe();
  }

  onSubmit(): void {
    this.blogPost.tags = this.tags.split(',').map(tag => tag.trim());
    this.data.updatePostById(this.blogPost._id, this.blogPost).subscribe( () => this.router.navigate(['/admin']));
  }

  
  deletePost(id: string) {
    this.data.deletePostById(id).subscribe( () => this.router.navigate(['/admin']));
  }

}
