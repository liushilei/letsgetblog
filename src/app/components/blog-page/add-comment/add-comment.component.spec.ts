import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddCommentComponent } from './add-comment.component';
import { BlogService } from 'src/app/services/blog.service';
import { of } from 'rxjs';

describe('AddCommentComponent', () => {
  let component: AddCommentComponent;
  let fixture: ComponentFixture<AddCommentComponent>;
  let blogService: BlogService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddCommentComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCommentComponent);
    component = fixture.componentInstance;
    blogService = TestBed.get(BlogService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('user input field required validity', () => {
    let errors = {};
    let user = component.commentForm.controls['user'];
    expect(user.valid).toBeFalsy();
    user.setValue('jack');
    expect(errors['required']).toBeFalsy();
    expect(user.valid).toBeTruthy();
  });
  it('user input field min length validity', () => {
    let errors = {};
    let user = component.commentForm.controls['user'];
    user.setValue('ab');
    errors = user.errors || {};
    expect(errors['minlength']).toBeTruthy();

    user.setValue('jack');
    errors = user.errors || {};
    expect(errors['minlength']).toBeFalsy();

    expect(user.valid).toBeTruthy();
  });
  it('content input field required validity', () => {
    let errors = {};
    let content = component.commentForm.controls['content'];

    expect(content.valid).toBeFalsy();
    content.setValue('this is a testing');
    errors = content.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(content.valid).toBeTruthy();
  });

  it('content input field min length validity', () => {
    let errors = {};
    let content = component.commentForm.controls['content'];
    content.setValue('ab');
    errors = content.errors || {};
    expect(errors['minlength']).toBeTruthy();

    content.setValue('this is a testing');
    errors = content.errors || {};
    expect(errors['minlength']).toBeFalsy();

    expect(content.valid).toBeTruthy();
  });

  it(' a form  validity', () => {
    expect(component.commentForm.valid).toBeFalsy();
    component.commentForm.controls['user'].setValue('jack-test');
    component.commentForm.controls['content'].setValue(
      'this is a test comment'
    );
    expect(component.commentForm.valid).toBeTruthy();
  });

  it('submmit a form', () => {
    spyOn(blogService, 'addCommentToBlog').and.returnValue(of({}));
    component.onSubmit();
    expect(blogService.addCommentToBlog).toHaveBeenCalled();
  });

  it('shoudl have a close btn, to close the form', () => {
    component.onClose.subscribe(x => {
      expect(x).toBeNull();
    });
    component.onHide();
  });
});
