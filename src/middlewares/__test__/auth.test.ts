import { AuthService } from '@src/services/auth';
import { authMiddleware } from '../auth';

describe('Auth Middleware', () => {
  it('should verify a JWT can call the next function', async () => {
    const jwtToken = AuthService.generateToken({ data: 'test' });
    const fakeReq = {
      headers: {
        'x-access-token': jwtToken,
      },
    };
    const fakeRes = {};
    const fakeNext = jest.fn();
    authMiddleware(fakeReq, fakeRes, fakeNext);
    expect(fakeNext).toHaveBeenCalled();
  });

  it('should return UNAUTHORIZED if there is a problem on the token verification', async () => {
    const fakeReq = {
      headers: {
        'x-access-token': 'invalid-token',
      },
    };
    const sendMock = jest.fn();
    const fakeRes = {
      status: jest.fn(() => ({
        send: sendMock,
      })),
    };
    const fakeNext = jest.fn();
    authMiddleware(fakeReq, fakeRes as object, fakeNext);
    expect(fakeRes.status).toHaveBeenCalledWith(401);
    expect(sendMock).toHaveBeenCalledWith({
      code: 401,
      error: 'jwt malformed',
    });
  });

  it('should return UNAUTHORIZED if there is no token', async () => {
    const fakeReq = {
      headers: {},
    };
    const sendMock = jest.fn();
    const fakeRes = {
      status: jest.fn(() => ({
        send: sendMock,
      })),
    };
    const fakeNext = jest.fn();
    authMiddleware(fakeReq, fakeRes as object, fakeNext);
    expect(fakeRes.status).toHaveBeenCalledWith(401);
    expect(sendMock).toHaveBeenCalledWith({
      code: 401,
      error: 'jwt must be provided',
    });
  });
});
