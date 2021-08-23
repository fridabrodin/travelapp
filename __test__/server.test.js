import "@babel/polyfill";

const app = require('../src/server/index.js')
const supertest = require('supertest')
const request = supertest(app)

  it('test endpoint', async () => {
    const response = await request.get('/test')

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('pass!');

  })

