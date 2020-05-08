/* global describe it */
process.env.TEST_MODE = true
const should = require('should')
const request = require('supertest')
const server = require('../server')

describe('Mercado Livre', () => {
  describe('List products', () => {
    it('Should list 150 products', done => {
      request(server)
        .post('/v1/search')
        .send({ search: 'cadeado', limit: 150 })
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.be.eql(200)
          res.body.should.have.properties('data')
          res.body.data.should.be.instanceOf(Array)
          res.body.data.length.should.be.eql(150)
  
          res.body.data.forEach(item => {
            item.should.have.properties('name', 'link', 'price', 'store', 'state')
          })
  
          done()
        })
    })
    it('Should return product not found message', done => {
      request(server)
        .post('/v1/search')
        .send({ search: '123adalovelace123', limit: 1 })
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.be.eql(404)
          res.body.should.be.instanceOf(Object)
          res.body.should.have.properties('message')
          res.body.message.should.eql('Product not found')
  
          done()
        })
    })
  })
  describe('Validations', () => {
    it('Should return 400 Bad Request when no parameters are informed', done => {
      request(server)
        .post('/v1/search')
        .send({ })
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.be.eql(400)
          res.body.should.be.instanceOf(Object)
          res.body.should.have.properties('message', 'errors')
          res.body.message.should.equal('Validation errors')
          res.body.errors[0].should.have.value('code', 'INVALID_REQUEST_PARAMETER')
          res.body.errors[0].should.have.value('name', 'search')
          res.body.errors[1].should.have.value('code', 'INVALID_REQUEST_PARAMETER')
          res.body.errors[1].should.have.value('name', 'limit')

          done()
        })
    })
    it('Should return 400 Bad Request when a string is entered at the limit', done => {
      request(server)
        .post('/v1/search')
        .send({ search: 'cadeado', limit: 'aaa' })
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.be.eql(400)
          res.body.should.be.instanceOf(Object)
          res.body.should.have.properties('message', 'errors')
          res.body.message.should.equal('Validation errors')
          res.body.errors[0].should.have.value('code', 'INVALID_REQUEST_PARAMETER')
          res.body.errors[0].errors[0].should.have.value('code', 'INVALID_TYPE')
  
          done()
        })
    })
    it('Should return 400 Bad Request when the zero value is entered in the limit', done => {
      request(server)
        .post('/v1/search')
        .send({ search: 'cadeado', limit: 0 })
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.be.eql(400)
          res.body.should.be.instanceOf(Object)
          res.body.should.have.properties('message', 'errors')
          res.body.message.should.equal('Validation errors')
          res.body.errors[0].should.have.value('code', 'INVALID_REQUEST_PARAMETER')
          res.body.errors[0].errors[0].should.have.value('code', 'MINIMUM')
  
          done()
        })
    })
    it('Should return 400 Bad Request when the search field is empty', done => {
      request(server)
        .post('/v1/search')
        .send({ search: '', limit: 1 })
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.be.eql(400)
          res.body.should.be.instanceOf(Object)
          res.body.should.have.properties('message', 'errors')
          res.body.message.should.equal('Validation errors')
          res.body.errors[0].should.have.value('code', 'INVALID_REQUEST_PARAMETER')
          res.body.errors[0].errors[0].should.have.value('code', 'MIN_LENGTH')
  
          done()
        })
    })
  })
})
