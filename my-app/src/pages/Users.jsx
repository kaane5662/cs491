import React from 'react';
import { useParams } from 'react-router-dom';

function Users() {
  const { id } = useParams();

  return (
    <div>
      <h1>User Page</h1>
      <p>This is the details page for user with ID: <b>{id}</b></p>
    </div>
  );
}

export default Users;