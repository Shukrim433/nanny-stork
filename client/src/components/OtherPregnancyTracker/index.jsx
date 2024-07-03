const OtherPregnancyTracker = ({user}) => {
    console.log(user)
    const pregnancyTracker = user || {}

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

    

    return (
        <div className="tracker-container">
            <p>
            {trackerData.stage === 'pregnancy' ? (
                <>
                <p>{user.username} is currently pregnant! </p>
                {trackerData.dueDate ? (<p>Their due date is: {trackerData.dueDate}</p>) : ('')}
                </>
                ) : (
                <>
                <p>{user.username} is currently postpartum! </p>
                {trackerData.birthDate ? (<p>Their birth date was: {trackerData.birthDate}</p>) : ('') }
                </>
                )}
            </p>
      </div>
    )
    

}


export default OtherPregnancyTracker