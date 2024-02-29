pm.test("Welcome message is returned", function () {
    pm.response.to.have.status(200);
    pm.expect(typeof pm.response.text()).to.equal("string");
});

pm.test("Check type of response for news articles", function () {
    pm.response.to.have.status(200);
    pm.expect(typeof pm.response.json()).to.equal("object");
});

pm.test("Check type of response for support groups", function () {
    pm.response.to.have.status(200);
    pm.expect(typeof pm.response.json()).to.equal("object");
    let groups = pm.response.json();
    for (var i = 0; i < groups.length; i++) {
        let group = groups[i];
        
        // Check if each object has 'name', 'link', and 'about' attributes
        pm.test("Object " + (i+1) + " has 'name', 'link', and 'about' attributes", function () {
            pm.expect(group).to.have.property('name');
            pm.expect(group).to.have.property('link');
            pm.expect(group).to.have.property('about');
        });
    }
});

pm.test("Check type of response for refugee testimonials", function () {
    pm.response.to.have.status(200);
    pm.expect(typeof pm.response.json()).to.equal("object");
});
