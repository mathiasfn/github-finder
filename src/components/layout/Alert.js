import React, { useContext } from 'react';
import GithubContext from '../../context/github/githubContext';

const Alert = (props) => {
  const githubContext = useContext(GithubContext);
  const { alert } = githubContext;
  return (
    alert !== null && (
      <div className={`alert alert-${alert.type}`}>
        <i className='fas fa-info-circle'></i> {alert.message}
      </div>
    )
  );
};

export default Alert;
