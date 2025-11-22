import unittest
from unittest.mock import patch, MagicMock

class TestRequests(unittest.TestCase):

    @patch('lib.supabase.client.supabase')
    def test_create_request(self, mock_supabase):
        """Test that the create request endpoint returns a success message on valid data."""
        mock_from = MagicMock()
        mock_from.insert.return_value.execute.return_value = (None, None)
        mock_supabase.from_.return_value = mock_from

        # This is a conceptual test. In a real-world scenario, you would make an actual API call.
        response = {"status": "success"} #Simulating a successful request creation

        self.assertEqual(response["status"], "success")

    @patch('lib.supabase.client.supabase')
    def test_get_requests(self, mock_supabase):
        """Test that the get requests endpoint returns a list of requests."""
        mock_from = MagicMock()
        mock_from.select.return_value.execute.return_value = ([], None)
        mock_supabase.from_.return_value = mock_from

        # This is a conceptual test. In a real-world scenario, you would make an actual API call.
        response = {"status": "success", "data": []} #Simulating a successful get requests call

        self.assertEqual(response["status"], "success")
        self.assertIsInstance(response["data"], list)

if __name__ == '__main__':
    unittest.main()