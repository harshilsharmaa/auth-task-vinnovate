const chai = require('chai');
const chaiHttp = require('chai-http');
const {describe, it} = require('mocha')
const {expect} = require('chai');
const User = require('../models/User');

chai.use(chaiHttp);

const BASE_URL = "http://localhost:4000/api";

describe("user", ()=>{

    const userData = {
        name: "Test User 1",
        email: "test1@gmail.com",
        password: "12345678"
    }

    describe("User Registration", ()=>{

    
        it("when no data is passed", async()=>{
            try {

                const res = await chai.request(`${BASE_URL}`).post('/register');
    
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error').to.equal('Please fill all the fields');
                
            } catch (error) {
                throw error;
            }
        })

        it("when all data is passed", async()=>{
            try {

                const res = await chai.request(`${BASE_URL}`).post('/register').send(userData);

                expect(res).to.have.status(201);
                expect(res.body).to.have.property('message').to.equal('User created successfully');
                expect(res.body).to.have.property('user').to.haveOwnProperty('email').to.equal(userData.email);

            } catch (error) {
                throw error;
            }
        })

        it("Try to regsiter already exists email", async()=>{
            try {
                const res = await chai.request(`${BASE_URL}`).post('/register').send(userData);

                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error').to.equal('User with this email already exists');

            } catch (error) {
                throw error
            }
        })
    })

    describe("User Login", ()=>{
        it('when no data is passed', async()=>{
            try {
                const res = await chai.request(`${BASE_URL}`).post('/login');                

                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error').to.equal('Please fill all the fields');
            } catch (error) {
                throw error
            }
        })

        it('Try to login with not registered email', async()=>{
            try {
                const res = await chai.request(`${BASE_URL}`).post('/login').send({email:"notregistered@test.com", password:"12345678"});                

                expect(res).to.have.status(404);
                expect(res.body).to.have.property('error').to.equal('User with this email does not exist');
            } catch (error) {
                throw error
            }
        })
        it('Try to login with wrong password', async()=>{
            try {
                const res = await chai.request(`${BASE_URL}`).post('/login').send({email:userData.email, password:"wrong1234"});                

                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error').to.equal('Invalid password');
            } catch (error) {
                throw error
            }
        })

        it('Login with correct credentials', async()=>{
            try {
                const res = await chai.request(`${BASE_URL}`).post('/login').send({email:userData.email, password:userData.password});                

                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message').to.equal('User loggedIn successfully');
                expect(res.body).to.have.property('user').to.haveOwnProperty('email').to.equal(userData.email);
            } catch (error) {
                throw error
            }
        })
    })


    after(function(done){
        try {
            const res = chai.request(BASE_URL).delete("/delete/profile").send({email:userData.email})
            .then((a)=>{
                done();
            })
        } catch (error) {
            throw error;
        }
    })
})