import React, { PropTypes } from 'react';

function Dashboard() {
  return (
    <div>
      <h1>Hello.</h1>
      <hr />
    </div>
  );
}

Dashboard.propTypes = {
  location: PropTypes.object,
};

export default Dashboard;
