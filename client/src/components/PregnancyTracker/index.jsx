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
  <div className="tracker-container bg-white shadow-md rounded-lg p-4 ">
    {!isEditing ? (
      <div className="flex flex-col justify-center items-center text-xl font-semibold">
        {trackerData.stage === 'pregnancy' ? (
          <>
            <p>You are currently pregnant!</p>
            <img  className="w-1/2 lg:w-1/4 my-3"src="images/stork-delivery.gif" alt="stork flying holding baby" />
            {trackerData.dueDate && <p>Your due date is: {trackerData.dueDate}</p>}
          </>
        ) : (
          <>
            <p>You are currently postpartum!</p>
            {trackerData.birthDate && <p>Your birth date was: {trackerData.birthDate}</p>}
          </>
        )}
      </div>
    ) : (
      <PregnancyTrackerForm initialData={trackerData} trackerId={pregnancyTracker.tracker._id}/>
    )}
    
    {!isEditing && (
      <button onClick={handleEditClick} className="flex items-center mt-4">
          <svg className="h-8 w-8 text-gray-500 mr-2" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"  /* code for edit icon */
           strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" />
            <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
            <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
            <line x1="16" y1="5" x2="19" y2="8" />
          </svg>
      </button>
    )}
  </div>
)
};

export default PregnancyTracker;