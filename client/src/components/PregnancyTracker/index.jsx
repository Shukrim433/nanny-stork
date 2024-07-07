import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";
import Auth from "../../utils/auth";
import PregnancyTrackerForm from "../PregnancyTrackerForm";
import "./tracker.css";

const PregnancyTracker = ({setShowForm}) => {
  setShowForm(false)
  const [isEditing, setIsEditing] = useState(false);
  // QUERY_USER_TRACKER query
  const { loading, data, error, refetch } = useQuery(QUERY_USER, {
    variables: {
      username: Auth.getProfile().authenticatedPerson.username,
    },
  });

  /* console.log(data?.user?.tracker, loading, error, "tracker data"); */
  let pregnancyTracker = data?.user || {};

  /* console.log(pregnancyTracker, "pregnancyTracker"); */

  const formatUnixTimestamp = (timestamp) => {
    if (!timestamp) return "";
    const timestampInt = parseInt(timestamp, 10);
    const date =
      timestampInt.toString().length === 13
        ? new Date(timestampInt)
        : new Date(timestampInt * 1000);
    return date.toLocaleDateString();
  };

  const trackerData = {
    stage: pregnancyTracker.tracker.stage,
    dueDate: formatUnixTimestamp(pregnancyTracker.tracker.dueDate) || "",
    birthDate: formatUnixTimestamp(pregnancyTracker.tracker.birthDate) || "",
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <div className="tracker-container bg-white shadow-md rounded-lg p-4 ">
      {!isEditing ? (
        <div className="flex flex-col justify-center items-center text-xl font-semibold">
          {trackerData.stage === "pregnancy" ? (
            <>
              <p>You are currently pregnant!</p>
              <img
                className="w-1/2 lg:w-1/4 my-3"
                src="images/stork-delivery.gif"
                alt="stork flying holding baby"
              />
              {trackerData.dueDate && (
                <p>Your due date is: {trackerData.dueDate}</p>
              )}
            </>
          ) : (
            <>
              <p>You are currently postpartum!</p>
              {trackerData.birthDate && (
                <p>Your birth date was: {trackerData.birthDate}</p>
              )}
            </>
          )}
        </div>
      ) : (
        <PregnancyTrackerForm
          initialData={trackerData}
          trackerId={pregnancyTracker.tracker._id}
          refetchPregnancyData={refetch}
          setIsEditing={setIsEditing}
        />
      )}

      {!isEditing && (
        <button onClick={handleEditClick} className="flex items-center mt-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default PregnancyTracker;
