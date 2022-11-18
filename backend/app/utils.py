# Utility functions

import geocoder


def geocode_address(city_name: str, lga: str = "", state: str = ""):
    """Get geocode of city, lga and state

    :param city_name: city name
    :type city_name: str
    :param lga: local government area
    :type lga: str or None
    :param state: state
    :type state: str or None
    :return: geocode in format [lat, long]
    :rtype: list or None
    """

    address = f"{city_name}"

    if lga:
        address += f", {lga}"

    if state:
        address += f", {state}"

    g = geocoder.osm(address)
    return g.latlng
