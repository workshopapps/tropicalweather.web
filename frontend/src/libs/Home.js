export default function getWeatherDescriptionCategory(description) {
    const categories = {
        rain: ['rainy', 'rain', 'water', 'pouring'],
        clouds: ['cloud', 'clouds', 'storm'],
        sun: ['sun', 'sunset', 'sunny'],
    };

    const keys = Object.keys(categories);
    for (let i = 0; i < keys.length; i += 1) {
        if (categories[keys[i]].some((val) => description.indexOf(val) !== -1)) {
            return `${keys[i]}.svg`;
        }
    }
    return 'clear.png';
}

export function to12HourFormat(date) {
    const time = Number(date.slice(11, 13));
    let val = '12 pm';
    if (time === 0) {
        val = '12 am';
    } else if (time < 12) {
        val = `${time} am`;
    } else if (time === 12) {
        val = '12 pm';
    } else {
        val = `${time - 12} pm`;
    }

    if (val.length === 4) {
        return `0${val}`;
    }
    return val;
}
