import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export default function DeleteNotification({
  show,
  closeModal,
  emptyNotification,
}) {
  const { t } = useTranslation(['notification']);
  return (
    <div
      className={show ? 'notificaton_feed-delecon' : 'notificaton_feed-none'}
    >
      <div className="notificaton_feed-dele">
        <h1 className="notificatin_feed-hd">{t('areyousure')}</h1>
        <p>{t('areyousureyouwanttoempty')}</p>
        <div className="notificaton_feed-btnflex">
          <button
            className="notificaton_feed-btn notificaton_feed-cancel"
            type="button"
            onClick={closeModal}
          >
            {t('cancel')}
          </button>
          <button
            className="notificaton_feed-btn notificaton_feed-empty"
            type="button"
            onClick={emptyNotification}
          >
            {t('empty')}
          </button>
        </div>
      </div>
    </div>
  );
}
DeleteNotification.propTypes = {
  show: PropTypes.bool,
  emptyNotification: PropTypes.func,
  closeModal: PropTypes.func,
};
