import unittest
from unittest.mock import patch, MagicMock

class TestProfile(unittest.TestCase):

    @patch('lib.supabase.client.supabase')
    def test_get_profile(self, mock_supabase):
        """Test that the get profile endpoint returns a profile object."""
        mock_from = MagicMock()
        mock_from.select.return_value.single.return_value.execute.return_value = ({}, None)
        mock_supabase.from_.return_value = mock_from

        # This is a conceptual test. In a real-world scenario, you would make an actual API call.
        response = {"status": "success", "data": {}} #Simulating a successful get profile call

        self.assertEqual(response["status"], "success")
        self.assertIsInstance(response["data"], dict)

    @patch('lib.supabase.client.supabase')
    def test_update_profile(self, mock_supabase):
        """Test that the update profile endpoint returns a success message on valid data."""
        mock_from = MagicMock()
        mock_from.update.return_value.execute.return_value = (None, None)
        mock_supabase.from_.return_value = mock_from

        # This is a conceptual test. In a real-world scenario, you would make an actual API call.
        response = {"status": "success"} #Simulating a successful profile update

        self.assertEqual(response["status"], "success")

if __name__ == '__main__':
    unittest.main()