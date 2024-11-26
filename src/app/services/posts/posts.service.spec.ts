import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { PostsService } from './posts.service';
import { Post } from 'src/app/_utils/interfaces/post.interface';

describe('PostsService', () => {
  let service: PostsService;
  let httpMock: HttpTestingController;

  const mockPosts: Post[] = [
    {
      id: 1,
      email: 'user1@example.com',
      name: 'John',
      lastname: 'Doe',
      title: 'Test Post 1',
      content: 'This is the first test post'
    },
    {
      id: 2,
      email: 'user2@example.com',
      name: 'Jane',
      lastname: 'Smith',
      title: 'Test Post 2',
      content: 'This is the second test post'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PostsService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(PostsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('create', () => {
    it('should create a new post', async () => {
      const newPost: Post = {
        id: 3,
        email: 'newuser@example.com',
        name: 'New',
        lastname: 'User',
        title: 'New Test Post',
        content: 'This is a new test post'
      };

      const createPromise = service.create(newPost);

      const req = httpMock.expectOne('http://localhost:3000/posts/');
      expect(req.request.method).toBe('POST');
      req.flush(newPost);

      const createdPost = await createPromise;
      expect(createdPost).toEqual(newPost);
    });
  });

  describe('getAll', () => {
    it('should fetch all posts', async () => {
      const getAllPromise = service.getAll();

      const req = httpMock.expectOne('http://localhost:3000/posts/');
      expect(req.request.method).toBe('GET');
      req.flush(mockPosts);

      const posts = await getAllPromise;
      expect(posts.length).toBe(2);
      expect(posts).toEqual(mockPosts);
    });
  });

  describe('findOne', () => {
    it('should fetch a single post by id', async () => {
      const postId = 1;
      const findOnePromise = service.findOne(postId);

      const req = httpMock.expectOne(`http://localhost:3000/posts/${postId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockPosts[0]);

      const post = await findOnePromise;
      expect(post).toEqual(mockPosts[0]);
    });
  });

  describe('update', () => {
    it('should update an existing post', async () => {
      const postToUpdate: Post = {
        ...mockPosts[0],
        title: 'Updated Test Post',
      };

      const updatePromise = service.update(postToUpdate);

      const req = httpMock.expectOne(`http://localhost:3000/posts/${postToUpdate.id}`);
      expect(req.request.method).toBe('PUT');
      req.flush(postToUpdate);

      const updatedPost = await updatePromise;
      expect(updatedPost).toEqual(postToUpdate);
    });
  });

  describe('delete', () => {
    it('should delete a post by id', async () => {
      const postId = 1;
      const deletePromise = service.delete(postId);

      const req = httpMock.expectOne(`http://localhost:3000/posts/${postId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush({});

      await expectAsync(deletePromise).toBeResolved();
    });
  });

  describe('posts BehaviorSubject', () => {
    it('should have an initial empty array', () => {
      expect(service.posts.getValue().length).toBe(0);
    });

    it('should allow updating posts', () => {
      service.posts.next(mockPosts);
      expect(service.posts.getValue()).toEqual(mockPosts);
    });
  });

  describe('httpOptions', () => {
    it('should have correct headers', () => {
      expect(service.httpOptions.headers.get('content-type')).toBe('application/json');
      expect(service.httpOptions.headers.get('access-control-allow-origin')).toBe('*');
    });
  });
});
