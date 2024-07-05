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
        <div className="tracker-container bg-white shadow-md rounded-lg p-4 ">
            <div className="flex flex-col justify-center items-center text-xl font-semibold">
            {trackerData.stage === 'pregnancy' ? (
                <>
                <p className="text-lg font-semibold">{user.username} is currently pregnant! </p>
                <img  className="w-1/2 lg:w-1/4 my-3"src="/images/stork-delivery.gif" alt="stork flying holding baby" />
                {trackerData.dueDate ? (<p className="text-lg font-semibold">Their due date is: {trackerData.dueDate}</p>) : ('')}
                </>
                ) : (
                <>
                <p className="text-lg font-semibold">{user.username} is currently postpartum! </p>
                {trackerData.birthDate ? (<p className="text-lg font-semibold">Their birth date was: {trackerData.birthDate}</p>) : ('') }
                </>
                )}
            </div>
      </div>
    )
    

}


export default OtherPregnancyTracker