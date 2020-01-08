import React, { useContext } from 'react';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import GithubContext from '../../context/github/githubContext';

const Users = (props) => {
  const githubContext = useContext(GithubContext);
  if (githubContext.loading) {
    return <Spinner></Spinner>;
  }

  return (
    <div style={userStyle}>
      {githubContext.users.map((user) => (
        <UserItem user={user} key={user.id}></UserItem>
      ))}
    </div>
  );
};

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem'
};

export default Users;
