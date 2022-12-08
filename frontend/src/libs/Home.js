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
