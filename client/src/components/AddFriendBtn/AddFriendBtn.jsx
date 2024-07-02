import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { ADD_FRIEND } from '../../utils/mutations';
import { Button } from "@material-tailwind/react";

const AddFriendButton = ({ friendName, isFriend }) => {
  const [addFriend, { data, loading, error }] = useMutation(ADD_FRIEND);

  const handleAddFriend = () => {
    addFriend({ variables: { friendName } });
  };

  if (loading) return <p>Adding friend...</p>;
  if (error) return <p>An error occurred</p>;

  return (
    <>
      {!isFriend && (
        <Button onClick={handleAddFriend}>Add Friend</Button>
      )}
      {data && <p>Friend added successfully!</p>}
    </>
  );
};

export default AddFriendButton;