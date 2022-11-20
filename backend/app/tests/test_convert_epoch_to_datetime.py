from app.utils import convert_epoch_to_datetime


import unittest 

result = {
    "date":"12 Nov, 2022",
    "time":"12:00pm"
}

epoch_time=243566

class TestConvertEpochToDatetime(unittest.TestCase):

    def test_convert_epoch_to_datetime(self):
        converted = convert_epoch_to_datetime(epoch_time)
        self.assertEqual(type(converted), type(result))
        self.assertEqual(len(converted),len(result))

if __name__=='__main__':
    unittest.main()
