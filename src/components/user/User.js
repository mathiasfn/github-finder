import React, { Fragment, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import Repos from '../repo/Repos';
import GithubContext from '../../context/github/githubContext';

const User = (props) => {
  const githubContext = useContext(GithubContext);
  const { match } = props;
  useEffect(() => {
    console.warn('USE EFFECT', match);
    githubContext.getUser(match.params.login);
    githubContext.getUserRepos(match.params.login);
    // eslint-disable-next-line
  }, []);

  if (githubContext.loading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <Link to='/' className='btn btn-light'>
        Back to search
      </Link>
      Hireable:{' '}
      {githubContext.user.hireable ? (
        <i className='fas fa-check text-success'></i>
      ) : (
        <i className='fas fa-times text-danger'></i>
      )}
      <div className='card grid-2'>
        <div className='all-center'>
          <img
            src={githubContext.user.avatar_url}
            className='round-img'
            alt=''
            style={{ width: '150px' }}
          ></img>
          <h1>{githubContext.user.name}</h1>
          <p>Location: {githubContext.user.location}</p>
        </div>
        <div>
          {githubContext.user.bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{githubContext.user.bio}</p>
            </Fragment>
          )}
          <a href={githubContext.user.html_url} className='btn btn-dark my-1'>
            Visit github profile
          </a>
        </div>
      </div>
      <Repos repos={githubContext.repos}></Repos>
    </Fragment>
  );
};

export default User;
