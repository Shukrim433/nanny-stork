import { useQuery } from '@apollo/client';
import { QUERY_PREGNANCY_TRACKER } from '../../utils/queries'

const  PregnancyTracker = ({ trackerId }) => {
    // QUERY_PREGNANCY_TRACKER query
    const { loading, data } = useQuery(QUERY_PREGNANCY_TRACKER, {
    variables: { trackerId: trackerId }
    });
    const tracker = data?.pregnancyTracker || {}

    if (loading ) {
        return <div>Loading...</div>
    }
    return (
        <div>
            pregnancy tracker:
            {tracker.stage}
        </div>
    )
}

export default PregnancyTracker;