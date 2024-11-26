import { TestBed } from '@angular/core/testing';
import { SessionService } from './session.service';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { User } from '../../_utils/interfaces/user.interface';

describe('SessionService', () => {
  let service: SessionService;
  let localStorageServiceMock: jasmine.SpyObj<LocalStorageService>;

  const mockUser: User = {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    password: 'password',
    name: 'Test',
    lastname: 'User',
    address: '123 Test St',
    birthdate: new Date('2000-01-01'),
    educationLevel: 1,
    securityQuestion: 'Favorite color?',
    securityAnswer: 'Blue',
    isAdmin: 0
  };

  beforeEach(() => {
    localStorageServiceMock = jasmine.createSpyObj('LocalStorageService', [
      'setItem',
      'getItem',
      'removeItem'
    ]);

    TestBed.configureTestingModule({
      providers: [
        SessionService,
        { provide: LocalStorageService, useValue: localStorageServiceMock }
      ]
    });

    service = TestBed.inject(SessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('user setter', () => {
    it('should set user in local storage when user is provided', () => {
      service.user = mockUser;

      expect(localStorageServiceMock.setItem).toHaveBeenCalledWith('user', mockUser);
    });

    it('should remove user from local storage when user is null', () => {
      service.user = null;

      expect(localStorageServiceMock.removeItem).toHaveBeenCalledWith('user');
    });
  });

  describe('user getter', () => {
    it('should return an Observable of the current user', (done) => {
      service.user.subscribe(user => {
        expect(user).toBeNull();
        done();
      });
    });
  });

  describe('userSnapshot', () => {
    it('should return the current user value', () => {
      const snapshot = service.userSnapshot;
      expect(snapshot).toBeNull();
    });
  });

  describe('checkUser', () => {
    it('should set user from local storage if user exists', () => {
      localStorageServiceMock.getItem.and.returnValue(mockUser);
      service.checkUser();

      expect(localStorageServiceMock.getItem).toHaveBeenCalledWith('user');
      expect(service.userSnapshot).toEqual(mockUser);
    });

    it('should not set user if local storage is empty', () => {
      localStorageServiceMock.getItem.and.returnValue(null);
      service.checkUser();

      expect(localStorageServiceMock.getItem).toHaveBeenCalledWith('user');
      expect(service.userSnapshot).toBeNull();
    });
  });

  describe('status', () => {
    it('should return the current user value', () => {
      expect(service.status()).toBeNull();
      service.user = mockUser;
      expect(service.status()).toEqual(mockUser);
    });
  });

  describe('user Observable behavior', () => {
    it('should emit new values when user changes', (done) => {
      const values: (User | null)[] = [];

      service.user.subscribe({
        next: (user) => {
          values.push(user);

          if (values.length === 2) {
            expect(values[0]).toBeNull();
            expect(values[1]).toEqual(mockUser);
            done();
          }
        }
      });

      service.user = mockUser;
    });
  });
});
