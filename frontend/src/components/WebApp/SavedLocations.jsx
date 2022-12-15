import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GrClose } from 'react-icons/gr';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { BsMap, BsThreeDotsVertical, BsPencil } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { getSavedLocations, deleteLocations } from '../../libs/savedLocations';

export default function SavedLocations() {
  const [savedLocations, setSavedLocations] = useState([]);
  const [editLocations, setEditLocations] = useState(false);
  const [locationIdsToDelete, setlocationIdsToDelete] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const { t } = useTranslation(['dashboard']);

  const navigate = useNavigate();

  const gotoDashboard = (city) => {
    navigate(`/app/dashboard?city=${city}`);
  };

  useEffect(() => {
    const savedLocations = getSavedLocations();
    setSavedLocations(savedLocations);
  }, []);

  const clearLocations = () => {
    const newLocations = deleteLocations(locationIdsToDelete);
    setSavedLocations(newLocations);
    setEditLocations(false);
  };
  return (
    <section id="saved-locations">
      <div className="relative flex items-center justify-between w-full">
        <h2 className="text-2xl font-bold">
          {t('savedlocations')}
        </h2>
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
            onClick={() => {
              setOpenEdit(false);
              setEditLocations(false); setlocationIdsToDelete([]);
            }}
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
            <p>{t('edit')}</p>
          </button>
        )}
      </div>

      {savedLocations.length < 1 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-12 mx-auto w-max md:py-20">
          <BsMap className="text-3xl text-primary-btn" />
          <h2 className="text-2xl font-bold">
            {t('nolocation')}
          </h2>
          <p>
            {t('youcansave')}
          </p>
        </div>
      ) : (
        <div className="flex flex-col justify-start gap-10 my-10">
          {savedLocations.map((location) => (
            <div
              className="flex items-center justify-between gap-2 p-4 rounded-lg shadow-md bg-[var(--accents-primary)]"
              key={location.location}
            >
              <div className="flex items-center gap-4">
                <HiOutlineLocationMarker className="text-lg" />
                <button type="button" onClick={() => gotoDashboard(location.location)} className="cursor-pointer hover:underline">
                  <span className="text-sm capitalize md:text-xl">
                    {location.location}
                  </span>
                </button>
              </div>
              {editLocations && (
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-[18px] h-[18px] md:h-6 md:w-6 appearance-none rounded-md border-2 border-[var(--accents-3)] focus:outline-none checked:bg-primary-btn checked:border-primary-btn checked-box"
                    onChange={() => setlocationIdsToDelete([...locationIdsToDelete, location.id])}
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
