import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import app from '../app.mjs';
import User from '../models/userModel.mjs';

const expect = chai.expect;
chai.use(chaiHttp);

describe('Auth API', () => {
  before(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  after(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('POST /api/v1/auth/signup', () => {
    it('should register a new user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({ username: 'testuser', password: 'password123' })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('token');
          expect(res.body.data.user).to.have.property('username', 'testuser');
          done();
        });
    });

    it('should not register a user with an existing username', (done) => {
      const user = new User({ username: 'testuser', password: 'password123' });
      user.save().then(() => {
        chai.request(app)
          .post('/api/v1/auth/signup')
          .send({ username: 'testuser', password: 'password123' })
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('should login an existing user', (done) => {
      const user = new User({ username: 'testuser', password: 'password123' });
      user.save().then(() => {
        chai.request(app)
          .post('/api/v1/auth/login')
          .send({ username: 'testuser', password: 'password123' })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('token');
            done();
          });
      });
    });

    it('should not login a non-existent user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({ username: 'nonexistent', password: 'password123' })
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
  });
});
