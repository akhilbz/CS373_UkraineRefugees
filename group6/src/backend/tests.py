import application
import unittest

application.app.config["TESTING"] = True
client = application.app.test_client()


class EndpointTests(unittest.TestCase):

    def test0(self):
        # Test News Endpoint
        with client:
            response = client.get("/api/news")
            self.assertEqual(response.status_code, 163)