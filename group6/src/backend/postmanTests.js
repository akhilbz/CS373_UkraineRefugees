pm.test("response is ok", function() {
    pm.response.to.have.status(200);
});
var responseBody = pm.response.json();
pm.test("News item exists", function () {
    pm.expect(responseBody).to.not.be.empty;
});
pm.test("News item has expected attributes", function () {
    pm.expect(responseBody).to.have.property("id");
    pm.expect(responseBody).to.have.property("author");
    pm.expect(responseBody).to.have.property("title");
    pm.expect(responseBody).to.have.property("description");
    pm.expect(responseBody).to.have.property("publishedAt");
    pm.expect(responseBody).to.have.property("name");
    pm.expect(responseBody).to.have.property("content");
    pm.expect(responseBody).to.have.property("urlToImage");
});

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
var responseBody = pm.response.json();
pm.test("Support group data exists", function () {
    pm.expect(responseBody).to.not.be.empty;
});
pm.test("Support group data has expected attributes", function () {
    pm.expect(responseBody).to.have.property("id");
    pm.expect(responseBody).to.have.property("name");
    pm.expect(responseBody).to.have.property("location");
    pm.expect(responseBody).to.have.property("phn_no");
    pm.expect(responseBody).to.have.property("rating");
    pm.expect(responseBody).to.have.property("website_url");
});

// Check if the response status is 200 OK
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

var responseBody = pm.response.json();
pm.test("Country data exists", function () {
    pm.expect(responseBody).to.not.be.empty;
});
pm.test("Country data has expected attributes", function () {
    pm.expect(responseBody).to.have.property("id");
    pm.expect(responseBody).to.have.property("name");
    pm.expect(responseBody).to.have.property("capital");
    pm.expect(responseBody).to.have.property("region");
    pm.expect(responseBody).to.have.property("population");
    pm.expect(responseBody).to.have.property("languages");
    pm.expect(responseBody).to.have.property("flag");
});

pm.test("response is ok", function() {
    pm.response.to.have.status(200);
});
var responseBody = pm.response.json()[0];
pm.test("News item exists", function () {
    pm.expect(responseBody).to.not.be.empty;
});
pm.test("News item has expected attributes", function () {
    pm.expect(responseBody).to.have.property("author");
    pm.expect(responseBody).to.have.property("title");
    pm.expect(responseBody).to.have.property("description");
    pm.expect(responseBody).to.have.property("publishedAt");
    pm.expect(responseBody).to.have.property("name");
    pm.expect(responseBody).to.have.property("content");
    pm.expect(responseBody).to.have.property("urlToImage");
});

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
var responseBody = pm.response.json()[0];
pm.test("Support group data exists", function () {
    pm.expect(responseBody).to.not.be.empty;
});
pm.test("Support group data has expected attributes", function () {
    pm.expect(responseBody).to.have.property("id");
    pm.expect(responseBody).to.have.property("name");
    pm.expect(responseBody).to.have.property("location");
    pm.expect(responseBody).to.have.property("phn_no");
    pm.expect(responseBody).to.have.property("rating");
    pm.expect(responseBody).to.have.property("website_url");
});

// Check if the response status is 200 OK
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Parse the response body JSON
var responseBody = pm.response.json()[0];

// Check if the country data exists
pm.test("Country data exists", function () {
    pm.expect(responseBody).to.not.be.empty;
});
pm.test("Country data has expected attributes", function () {
    pm.expect(responseBody).to.have.property("id");
    pm.expect(responseBody).to.have.property("name");
    pm.expect(responseBody).to.have.property("capital");
    pm.expect(responseBody).to.have.property("region");
    pm.expect(responseBody).to.have.property("population");
    pm.expect(responseBody).to.have.property("languages");
    pm.expect(responseBody).to.have.property("flag");
});
