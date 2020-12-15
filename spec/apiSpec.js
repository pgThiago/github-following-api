describe("API request", function() {
  it("returns a list of users that an user is following on github", async function(done) {
      const response = await fetch(`https://api.github.com/users/diego3g/following`);
      console.log(response)
      expect(response.status).toEqual(200);
      done();
  });
});