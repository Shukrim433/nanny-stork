import { useState, useEffect } from 'react';
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";
import Auth from "../../utils/auth";
import PregnancyTrackerForm from '../PregnancyTrackerForm'
import './tracker.css';

const PregnancyTracker = () => {
  const [isEditing, setIsEditing] = useState(false)
  // QUERY_USER_TRACKER query
  const { loading, data, error } = useQuery(QUERY_USER, {
        variables: { username:  Auth.getProfile().authenticatedPerson.username }
    })

  console.log(data, loading, error, "tracker data");
  const pregnancyTracker = data?.user || {}

  const formatUnixTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const timestampInt = parseInt(timestamp, 10);
    const date = timestampInt.toString().length === 13 ? new Date(timestampInt) : new Date(timestampInt * 1000);
    return date.toLocaleDateString();
  };

  const trackerData = {
            stage: pregnancyTracker.tracker.stage,
            dueDate: formatUnixTimestamp(pregnancyTracker.tracker.dueDate) || '',
            birthDate:formatUnixTimestamp( pregnancyTracker.tracker.birthDate) || ''
  }

  const handleEditClick = () => {
    setIsEditing(true);
  }

  return (
  <div className="tracker-container">
    {!isEditing ? (
      <>
      <p>
      {trackerData.stage === 'pregnancy' ? (
        <>
        <p>You are currently pregnant! </p>
        {trackerData.dueDate ? (<p>Your due date is: {trackerData.dueDate}</p>) : ('')}
        </>
        ) : (
          <>
        <p>You are currently postpartum! </p>
        {trackerData.birthDate ? (<p>Your birth date was: {trackerData.birthDate}</p>) : ('') }
        </>
        )}
      </p>
      
      <button onClick={handleEditClick}>Edit Tracker</button>
      </>
    ) : (
      <PregnancyTrackerForm initialData={trackerData}  trackerId={pregnancyTracker.tracker._id}/>
    )}
    
  </div>
)
};

export default PregnancyTracker;