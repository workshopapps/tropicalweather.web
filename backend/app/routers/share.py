

from fastapi import APIRouter
from schemas import ShareLink
from utils.general import compose_location

router = APIRouter(
    tags=['weather-share'],
)


@router.get('/generate/share-link', response_model=ShareLink)
async def generate_share_link(city: str, state: str, country: str):
    """Generates a share link for a location.

    Args:
        city (str): City of the location.
        state (str): State of the location.
        country (str): Country of the location.

    Returns:
        ShareLink: Share link
    """

    uid = compose_location(
        city, state, country
    )

    return {
        "link": f"https://tropicalweather.hng.tech/share/{uid}"
    }
