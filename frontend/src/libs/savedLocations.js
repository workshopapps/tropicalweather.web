const getSavedLocations = () => {
  const locations = JSON.parse(localStorage.getItem('saved-locations'));
  if (locations) {
    return locations;
  }
  localStorage.setItem('saved-locations', JSON.stringify([]));
  return [];
};

const saveLocation = (location) => {
  const locations = getSavedLocations();
  locations.push({ location, id: Date.now() });
  localStorage.setItem('saved-locations', JSON.stringify(locations));
  return locations;
};

const deleteLocations = (idList) => {
  const locations = getSavedLocations();
  const newLocations = locations.filter((location) => !idList.includes(location.id));
  localStorage.setItem('saved-locations', JSON.stringify(newLocations));
  return newLocations;
};

export { getSavedLocations, saveLocation, deleteLocations };
