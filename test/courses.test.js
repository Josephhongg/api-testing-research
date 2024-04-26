import chai from "chai"
import chaiHttp from "chai-http"
import app from "../app.js";
import {
    createCourses,
    deleteCourses
} from "../prisma/seed/coursesSeed.js"

const { expect } = chai
chai.use(chaiHttp)

before(async () => {
    await createCourses()
})

describe('api', () => {

    describe('courses', () => {
        
        it('should read courses - no courses found', async () => {
            await deleteCourses()
            chai.request(app)
            .get('/api/courses')
            .end((_, res) => {
                expect(res.status).to.be.equal(200)
                expect(res.body.msg).to.be.equal('No courses found')
            })
        })

        it('should create courses', async () => {
            chai.request(app)
            .post('/api/courses')
            .send({
                name: 'Testing course 1',
                departmentName: 'BIT'
            })
            .end((_, res) => {
                expect(res.status).to.be.equal(201)
                expect(res.body.msg).to.be.equal('Course successfully created')
            })
        })

        it('should read courses - one course found', async () => { 
            chai.request(app)
            .get('/api/courses')
            .end((_, res) => {
                expect(res.status).to.be.equal(200)
                expect(res.body.data).to.have.lengthOf(1)
            })
        })

        it('should read courses - testing course 1', async () => {
            chai.request(app)
            .end((_, res) => {
                expect(res.status).to.be.equal(200)
                expect(res.body.data.name).to.be.equal('Testing course 1')
            })
        })

        it('should create course - test course 2', async () => {
            await createCourses()
            chai.request(app)
            .send({
                name: 'Testing course 2',
                departmentName: 'Design'
            })
            .end((_, res) => {
                expect(res.status).to.be.equal(201)
                expect(res.body.msg).to.be.equal('Course successfully created')
            })
        })

        it('should create course - test course 3', async () => {
            chai.request(app)
            .send({
                name: 'Testing course 3',
                departmentName: 'BIT'
            })
            .end((_, res) => {
                expect(res.status).to.be.equal(201)
                expect(res.body.msg).to.be.equal('Course successfully created')
            })
        })

        it('should read courses that does not exist', async () => {
            chai.request(app)
            .get('/api/courses/1234')
            .end((_, res) => {
                expect(res.status).to.be.equal(200)
                expect(res.body.msg).to.be.equal('No course with the id: 1234 found')
            })
        })
        
        it('should update courses - test course 1', async () => {
            chai.request(app)
            .put('/api/courses/1')
            .send({
                name: 'test',
                country: 'test' 
            })
            .end((_, res) => {
                expect(res.body.msg).to.be.equal('Course successfully updated')
                expect(res.status).to.be.equal(200)
            })
        })

        it('should update courses - test course 2', async () => {
            chai.request(app)
            .put('/api/courses/4')
            .send({
                name: 'test',
                country: 'test' 
            })
            .end((_, res) => {
                expect(res.body.msg).to.be.equal('Course successfully updated')
                expect(res.status).to.be.equal(200)
            })
        })
        
        it('should update courses - test course 3', async () => {
            chai.request(app)
            .put('/api/courses/5')
            .send({
                name: 'test',
                country: 'test' 
            })
            .end((_, res) => {
                expect(res.body.msg).to.be.equal('Course successfully updated')
                expect(res.status).to.be.equal(200)
            })
        })

        it('should delete courses - test course 1', async () => {
            chai.request(app)
            .delete('/api/courses/1')
            .end((_, res) => {
                expect(res.body.msg).to.be.equal('Course successfully deleted')
                expect(res.status).to.be.equal(200)
            })
        })
        
        it('should delete courses - test course 2', async () => {
            chai.request(app)
            .delete('/api/courses/4')
            .end((_, res) => {
                expect(res.body.msg).to.be.equal('Course successfully deleted')
                expect(res.status).to.be.equal(200)
            })
        })

        it('should delete courses - test course 3', async () => {
            chai.request(app)
            .delete('/api/courses/5')
            .end((_, res) => {
                expect(res.body.msg).to.be.equal('Course successfully deleted')
                expect(res.status).to.be.equal(200)
            })
        })
    })
})