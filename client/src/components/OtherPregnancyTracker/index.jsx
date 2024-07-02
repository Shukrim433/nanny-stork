import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_USER } from '../../utils/queries';

const OtherPregnancyTracker = ({username}) => {

    // QUERY_USER query
    const { loading, data, error } = useQuery(QUERY_USER, {
    // pass the URL parameter(the username) to the query
        variables: { username: username }
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
                _id: pregnancyTracker.tracker._id,
                stage: pregnancyTracker.tracker.stage,
                dueDate: formatUnixTimestamp(pregnancyTracker.tracker.dueDate) || '',
                birthDate:formatUnixTimestamp( pregnancyTracker.tracker.birthDate) || ''
      }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="tracker-container">
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
      </div>
    )
    

}


export default OtherPregnancyTracker