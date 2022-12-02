
import json

from conf.settings import BASE_DIR


class WmoCodes:
    """Class to hold WMO codes for Meteo API"""

    with open(BASE_DIR / "utils/wmo_codes.json", "r") as f:
        wmo_codes: dict[str, str] = json.load(f)

    @classmethod
    def get_wmo_code(cls, code: str) -> str:
        """Get WMO description for a code"""
        code_desc = cls.wmo_codes.get(str(code), "Unknown")

        code_descs = code_desc.split(':')
        if len(code_descs) > 1:
            return code_descs[0]

        return code_desc
