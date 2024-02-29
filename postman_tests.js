pm.test("Welcome message is returned", function () {
    pm.response.to.have.status(200);
    pm.expect(typeof pm.response.text()).to.equal("string");
});