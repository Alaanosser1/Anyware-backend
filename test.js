const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");
const app = require("./server.js");

describe("Announcement Routes", function () {
  it("should create a new announcement", (done) => {
    const announcement = {
      title: "Test Announcement",
      content: "This is a test announcement.",
    };

    this.timeout(5000);
    request(app)
      .post("/announcements/create")
      .send(announcement)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.title).to.equal(announcement.title);
        expect(res.body.content).to.equal(announcement.content);
        done();
      });
  });
});
