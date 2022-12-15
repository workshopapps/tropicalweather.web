export default function getWeatherDescriptionCategory(description) {
    description = description?.toLowerCase();
    const categories = {
        rain: ['rainy', 'rain', 'water', 'pouring', 'showers', 'drizzling', 'fog', 'fogs'],
        clouds: ['cloud', 'clouds', 'storm', 'stormy'],
        sun: ['sun', 'sunset', 'sunny'],
    };

    const keys = Object.keys(categories);
    for (let i = 0; i < keys.length; i += 1) {
        if (categories[keys[i]].some((val) => description?.indexOf(val) !== -1)) {
            if (keys[i] === 'clouds') {
                return `${keys[i]}.png`;
            }
            return `${keys[i]}.svg`;
        }
    }
    return 'clear.png';
}

export function to12HourFormat(date) {
    const time = Number(date.slice(11, 13));
    let val = '12 pm';
    if (time === 0) {
        val = '12:00 am';
    } else if (time < 12) {
        val = `${time}:00 am`;
    } else if (time === 12) {
        val = '12:00 pm';
    } else {
        val = `${time - 12}:00 pm`;
    }

    if (val.length === 4) {
        return `0${val}`;
    }
    return val;
}

export const patchForecast = [
    { main: 'No data', datetime: '2022-12-09 00:00', risk: 'No data' },
    { main: 'No data', datetime: '2022-12-09 01:00', risk: 'No data' },
    { main: 'No data', datetime: '2022-12-09 02:00', risk: 'No data' },
    { main: 'No data', datetime: '2022-12-09 03:00', risk: 'No data' },
    { main: 'No data', datetime: '2022-12-09 04:00', risk: 'No data' },
    { main: 'No data', datetime: '2022-12-09 05:00', risk: 'No data' },
    { main: 'No data', datetime: '2022-12-09 06:00', risk: 'No data' },
    { main: 'No data', datetime: '2022-12-09 07:00', risk: 'No data' },
    { main: 'No data', datetime: '2022-12-09 08:00', risk: 'No data' },
    { main: 'No data', datetime: '2022-12-09 09:00', risk: 'No data' },
    { main: 'No data', datetime: '2022-12-09 10:00', risk: 'No data' },
    { main: 'No data', datetime: '2022-12-09 11:00', risk: 'No data' },
    { main: 'No data', datetime: '2022-12-09 12:00', risk: 'No data' },
    { main: 'No data', datetime: '2022-12-09 13:00', risk: 'No data' },
    { main: 'No data', datetime: '2022-12-09 14:00', risk: 'No data' },
    { main: 'No data', datetime: '2022-12-09 15:00', risk: 'No data' },
    { main: 'No data', datetime: '2022-12-09 16:00', risk: 'No data' },
    { main: 'No data', datetime: '2022-12-09 17:00', risk: 'No data' },
    { main: 'No data', datetime: '2022-12-09 18:00', risk: 'No data' },
    { main: 'No data', datetime: '2022-12-09 19:00', risk: 'No data' },
    { main: 'No data', datetime: '2022-12-09 20:00', risk: 'No data' },
    { main: 'No data', datetime: '2022-12-09 21:00', risk: 'No data' },
    { main: 'No data', datetime: '2022-12-09 22:00', risk: 'No data' },
    { main: 'No data', datetime: '2022-12-09 23:00', risk: 'No data' },
];
