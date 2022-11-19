from app.utils import convert_epoch_to_datetime
import pytest 


result = {
    "date":"12 Nov, 2022",
    "time":"12:00pm"
}

@pytest.mark.parametrize("epoch",[145678900])
def test_convert_epoch_to_datetime(epoch):
    converted = convert_epoch_to_datetime(epoch)
    assert type(converted) == type(result)
    assert len(converted)==len(result)
