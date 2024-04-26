import chai from "chai"
import chaiHttp from "chai-http"
import app from "../app.js";
import {
    createInstitutions,
    deleteInstitutions
} from "../prisma/seed/institutionsSeed.js"

const { expect } = chai
chai.use(chaiHttp)

before(async () => {
    await createInstitutions()
})

describe('api', () => {
    
    describe('institutions', () => {
        it('should read institutions - no institutions found', async () => {
            await deleteInstitutions()
            chai.request(app)
            .get('/api/institutions')
            .end((_, res) => {
                expect(res.status).to.be.equal(200)
                expect(res.body.msg).to.be.equal('No institutions found')
            })
        })
    
        it('should create institution - auckland university of technology', async () => {
            chai.request(app)
            .post('/api/institutions')
            .send({
                name: 'Auckland University of Technology',
                country: 'New Zealand' 
            })
            .end((_, res) => {
                expect(res.status).to.be.equal(201)
                expect(res.body.msg).to.be.equal('Institution successfully created')
            })
        })
    
        it('should read institutions - one institution found', async () => {
            chai.request(app).get('/api/institutions')
            .end((_, res) => {
                expect(res.status).to.be.equal(200)
                expect(res.body.data).to.have.lengthOf(1)
            })
        })
    
        it('should read institutions - auckland university of technology', async () => {
            chai.request(app)
            .get('/api/institutions/3')
            .end((_, res) => {
                expect(res.status).to.be.equal(200)
                expect(res.body.data.name).to.be.equal('Auckland University of Technology')
            })
        })
    
        it('should create institution - waikato institute of technology', async () => {
            await createInstitutions()
            chai.request(app)
            .post('/api/institutions')
            .send({
                name: 'Waikato Institute of Technology',
                country: 'New Zealand'
            })
            .end((_, res) => {
                expect(res.status).to.be.equal(201)
                expect(res.body.msg).to.be.equal('Institution successfully created')
            })
        })
    
        it('should create institution - university of waikato', async () => {
            chai.request(app)
            .post('/api/institutions')
            .send({
                name: 'University of Waikato',
                country: 'New Zealand'
            })
            .end((_, res) => {
                expect(res.status).to.be.equal(201)
                expect(res.body.msg).to.be.equal('Institution successfully created')
            })
        })
    
        it('should read institutions that does not exist', async () => {
            chai.request(app)
            .get('/api/institutions/1234')
            .end((_, res) => {
                expect(res.status).to.be.equal(200)
                expect(res.body.msg).to.be.equal('No institution with the id: 1234 found')
            })
        })
        
        it('should update institutions - auckland university of technology', async () => {
            chai.request(app)
            .put('/api/institutions/1')
            .send({
                name: 'test',
                country: 'test' 
            })
            .end((_, res) => {
                expect(res.body.msg).to.be.equal('Institution successfully updated')
                expect(res.status).to.be.equal(200)
            })
        })
    
        it('should update institutions - waikato institute of technology', async () => {
            chai.request(app)
            .put('/api/institutions/4')
            .send({
                name: 'test',
                country: 'test'
            })
            .end((_, res) => {
                expect(res.body.msg).to.be.equal('Institution successfully updated')
                expect(res.status).to.be.equal(200)
            })
        })
    
        it('should update institutions - university of waikato', async () => {
            chai.request(app)
            .put('/api/institutions/5')
            .send({
                name: 'test',
                country: 'test'
            })
            .end((_, res) => {
                expect(res.body.msg).to.be.equal('Institution successfully updated')
                expect(res.status).to.be.equal(200)
            })
        })

        it('should delete institutions - auckland university of technology', async () => {
            chai.request(app)
            .delete('api/institutions/1')
            .end((_, res) => {
                expect(res.body.msg).to.be.equal('Institution successfully deleted')
                expect(res.status).to.be.equal(200)
            })
        })

        it('should delete institutions - waikato institute of technology', async () => {
            chai.request(app)
            .delete('api/institutions/4')
            .end((_, res) => {
                expect(res.body.msg).to.be.equal('Institution successfully deleted')
                expect(res.status).to.be.equal(200)
            })
        })

        it('should delete institutions - university of waikato', async () => {
            chai.request(app)
            .delete('api/institutions/5')
            .end((_, res) => {
                expect(res.body.msg).to.be.equal('Institution successfully deleted')
                expect(res.status).to.be.equal(200)
            })
        })
    })
})

after(async () => {
    await deleteInstitutions()
})


