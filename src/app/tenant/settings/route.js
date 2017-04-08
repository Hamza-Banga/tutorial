import React, { PropTypes } from 'react';
import { connect } from 'dva';
import Frm from './components/save';

function Settings({ dispatch, settings }) {
  const frmProps = {
    settings,
    onSave(frmData) {
      dispatch({
        type: 'settings/updateAllSettings',
        payload: frmData,
      });
    },
    onShowControls(selfRegchecked) {
      dispatch({
        type: 'settings/showControls',
        payload: selfRegchecked,
      });
    },
  };
  return (
    <div>
      <Frm {...frmProps} />
    </div>
  );
}

Settings.propTypes = {
  settings: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ settings }) {
  return { settings };
}

export default connect(mapStateToProps)(Settings);
