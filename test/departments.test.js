import chai from "chai"
import chaiHttp from "chai-http"
import app from "../app.js";

const { expect } = chai
chai.use(chaiHttp)

import {
    createDepartments,
    deleteDepartments
} from "../prisma/seed/departmentsSeed.js"

before(async () => {
    await createDepartments()
})

describe('api', () => {
    
    describe('departments', () => {
    
        it('should read departments - no departments found', async () => {
            await deleteDepartments()
            chai.request(app)
            .get('/api/departments')
            .end((_, res) => {
                expect(res.status).to.be.equal(200)
                expect(res.body.msg).to.be.equal('No departments found')
            })
        })

        it('should create department - engineering', async () => {
            chai.request(app)
            .post('/api/departments')
            .send({
                name: 'Engineering',
                location: 'Dunedin',
                institutionName: 'Otago Polytechnic'
            })
            .end((_, res) => {
                expect(res.status).to.be.equal(201)
                expect(res.body.msg).to.be.equal('Department successfully created')
            })
        })

        it('should read departments - one department found', async () => {
            chai.request(app)
            .get('/api/departments')
            .end((_, res) => {
                expect(res.status).to.be.equal(200)
                expect(res.body.data).to.have.lengthOf(1)
            })
        })

        it('should read departments - engineering', async () => {
            chai.request(app).get('/api/departments/1')
            .end((_, res) => {
                expect(res.status).to.be.equal(200)
                expect(res.body.data.name).to.be.equal('Engineering')
            })
        })

        it('should create department - nursing', async () => {
            await createDepartments()
            chai.request(app)
            .post('/api/departments')
            .send({
                name: 'Nursing',
                location: 'Dunedin',
                institutionName: 'Otago Polytechnic'
            })
            .end((_, res) => {
                expect(res.status).to.be.equal(201)
                expect(res.body.msg).to.be.equal('Department successfully created')
            })
        })

        it('should create department - business', async () => {
            chai.request(app)
            .post('/api/departments')
            .send({
                name: 'Business',
                location: 'Dunedin',
                institutionName: 'Otago Polytechnic'
            })
            .end((_, res) => {
                expect(res.status).to.be.equal(201)
                expect(res.body.msg).to.be.equal('Department successfully created')
            })
        })

        it('should read departments that does not exist', async () => {
            chai.request(app)
            .get('/api/departments/1234')
            .end((_, res) => {
                expect(res.status).to.be.equal(200)
                expect(res.body.msg).to.be.equal('No department with the id: 1234 found')
            })
        })

        it('should update departments - engineering', async () => {
            chai.request(app)
            .put('/api/departments/1')
            .send({
                name: 'test',
                location: 'test',
                institutionName: 'Otago Polytechnic'
            })
            .end((_, res) => {
                expect(res.body.msg).to.be.equal('Department successfully updated')
                expect(res.status).to.be.equal(200)
            })
        })

        it('should update departments - nursing', async () => {
            chai.request(app)
            .put('/api/departments/4')
            .send({
                name: 'test',
                location: 'test',
                institutionName: 'Otago Polytechnic'
            })
            .end((_, res) => {
                expect(res.body.msg).to.be.equal('Department successfully updated')
                expect(res.status).to.be.equal(200)
            })
        })
        
        it('should update departments - business', async () => {
            chai.request(app)
            .put('/api/departments/5')
            .send({
                name: 'test',
                location: 'test',
                institutionName: 'Otago Polytechnic'
            })
            .end((_, res) => {
                expect(res.body.msg).to.be.equal('Department successfully updated')
                expect(res.status).to.be.equal(200)
            })
        })

        it('should delete department - engineering', async () => {
            chai.request(app)
            .delete('api/departments/1')
            .end((_, res) => {
                expect(res.body.msg).to.be.equal('Department successfully deleted')
                expect(res.status).to.be.equal(200)
            })
        })

        it('should delete department - nursing', async () => {
            chai.request(app)
            .delete('api/departments/4')
            .end((_, res) => {
                expect(res.body.msg).to.be.equal('Department successfully deleted')
                expect(res.status).to.be.equal(200)
            })
        })

        it('should delete department - business', async () => {
            chai.request(app)
            .delete('api/departments/5')
            .end((_, res) => {
                expect(res.body.msg).to.be.equal('Department successfully deleted')
                expect(res.status).to.be.equal(200)
            })
        })
    })
})