import React, { useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { BsMap, BsThreeDotsVertical, BsPencil } from 'react-icons/bs';
import PropTypes from 'prop-types';

export default function SavedLocations({
  locations, clearLocations, editLocations, setEditLocations, addToDeleteList, deleteList }) {
  const [openEdit, setOpenEdit] = useState(false);
  return (
    <section id="saved-locations" className="mt-20">
      <div className="relative flex items-center justify-between w-full">
        <h2 className="text-2xl font-bold">Saved Locations</h2>
        {!openEdit && (
          <button
            title="open"
            type="button"
            className="btn btn-ghost btn-circle"
            onClick={() => setOpenEdit(true)}
          >
            <BsThreeDotsVertical />
          </button>
        )}
        {openEdit && (
          <button
            title="close"
            type="button"
            className="btn btn-ghost btn-circle"
            onClick={() => { setOpenEdit(false); setEditLocations(false); addToDeleteList([]); }}
          >
            <GrClose />
          </button>
        )}
        {openEdit && (
          <button
            type="button"
            title="today"
            className="absolute right-0 flex items-center gap-4 px-4 py-2 rounded-md shadow-md cursor-pointer w-52 top-10"
            onClick={() => { setEditLocations(true); setOpenEdit(false); }}
          >
            <BsPencil className="text-xl" />
            <p>Edit</p>
          </button>
        )}
      </div>

      {locations.length < 1 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-12 mx-auto w-max md:py-20">
          <BsMap className="text-3xl text-primary-btn" />
          <h2 className="text-2xl font-bold">
            No Location saved yet
          </h2>
          <p>
            You can save a location to view the details later
          </p>
        </div>
      ) : (
        <div className="flex flex-col justify-start gap-10 my-10">
          {locations.map((location) => (
            <div
              className="flex items-center justify-between gap-2 p-4 rounded-lg shadow-md bg-[var(--accents-primary)]"
              key={location.location}
            >
              <div className="flex items-center gap-4">
                <HiOutlineLocationMarker className="text-lg" />
                <span className="text-sm capitalize md:text-xl">
                  {location.location}
                </span>
              </div>
              {editLocations && (
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-[18px] h-[18px] md:h-6 md:w-6 appearance-none rounded-md border-2 border-[var(--accents-3)] focus:outline-none checked:bg-primary-btn checked:border-primary-btn checked-box"
                    onChange={() => addToDeleteList([...deleteList, location.id])}
                  />
                </label>
              )}
            </div>
          ))}
        </div>
      )}

      {editLocations && (
        <div className="flex items-center justify-center w-full gap-12 md:gap-36">
          <button
            type="button"
            className="px-6 py-4 text-xl font-medium border rounded-lg border-primary-btn text-primary-btn"
            onClick={() => setEditLocations(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-6 py-4 text-xl font-medium text-white rounded-lg bg-primary-btn"
            onClick={() => clearLocations()}
          >
            Delete
          </button>
        </div>
      )}
    </section>
  );
}

SavedLocations.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    location: PropTypes.string,
  })).isRequired,
  clearLocations: PropTypes.func.isRequired,
  editLocations: PropTypes.bool.isRequired,
  setEditLocations: PropTypes.func.isRequired,
  addToDeleteList: PropTypes.func.isRequired,
  deleteList: PropTypes.arrayOf(PropTypes.number).isRequired,
};
