
import datetime
from .general import get_location_obj, reverse_geocode
from sqlalchemy.orm import Session

from firebase_admin import auth, credentials, messaging

from decouple import config

path_key_dir = config.get('GOOGLE_APPLICATION_CREDENTIALS')

cred = credentials.Certificate(path_key_dir)
firebase_admin.initialize_app(cred)



async def send_alert_notification(_payload, _topic):

    """Send push_notification based on topic subscribe to

    :param _payload: payload
    :type _payload: dict
    :param topic: topic
    :type topic: str
    """
    message = messaging.Message(
        notification=messaging.Notification(
                    title=_payload['event'],
                    body=_payload['message']
    ),
    android=messaging.AndroidConfig(
        ttl=datetime.timedelta(seconds=3600),
        priority='normal',
        notification=messaging.AndroidNotification(
            color="#f45342"
        ),

    ),
    apns=messaging.APNSConfig(
        payload=messaging.APNSPayload(
            aps=messaging.Aps(bage=42)
        ),
    ),
    topic=_topic
    )
    return message

async def create_alert_topic(lat: float, lon: float, db_instance: Session = Depends(get_db)):
    """Create tooic based on users-locations

    :param lon: longitude
    :type lon: float
    :param lat: latitude
    :type lon: float
    :param db: database
    :type db: database instance
    """
    
    # reverse lat, lon to city and state name
    latlng = reverse_geocode(lat, lon)
    city = latlng.get('city')
    state = latlng.get('state')

    # get location from db base on  city and state
    location = get_location_obj(db_instance, city, state)

    if location is not None:
        topic = f"{location.city}-{location.state}"

        dt = []
        for data in location.alerts:
            date_time = convert_epoch_to_datetime(data.start)
            
            # create a payload with the alert info in db
            _payload = {
                "event": data.event,
                "message": data.message,
                "date": f"{date_time['date']} ' '{date_time['time']}"
     
           }
        #    call the notification function recursively with the payload
    return send_alert_notification(_payload, topic)