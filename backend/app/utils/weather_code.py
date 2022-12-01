
import json


class WmoCodes:
    """Class to hold WMO codes for Meteo API"""

    with open("wmo_codes.json", "r") as f:
        wmo_codes: dict[str, str] = json.load(f)

    def get_wmo_code(cls, code: int) -> str:
        """Get WMO description for a code"""
        code_desc = cls.wmo_codes.get(str(code), "Unknown")

        code_descs = code_desc.split(':')
        if len(code_descs) > 1:
            return code_descs[0]

        return code_desc
