import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PREGNANCY_TRACKER } from '../../utils/mutations';
import { Button, Input, Textarea, Card, CardBody, Alert } from '@material-tailwind/react';
import Auth from '../../utils/auth';

const PregnancyTrackerForm = () => {
    // holds PregnancyTrackerForm form state
    const [formState, setFormState] = useState({ stage: '', dueDate: '', birthDate: '' });
    // ADD_PREGNANCY_TRACKER mutation
    const [addPregnancyTracker, { loading, error }] = useMutation(ADD_PREGNANCY_TRACKER);

    // update formState based on what user inputs (OnChange event)
    const handleChange = (event) => {
        // event.target.name + event.target.value
        const { name, value } = event.target;
        // set the formState field that triggered the change event 
        setFormState({
            ...formState,
            [name]: value,
        });
    }

    // onSubmit create the pregnancy tracker
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await addPregnancyTracker({ variables: { ...formState } });
            // Clear the textarea after successful submission
            setFormState({
                stage: '',
                dueDate: '',
                birthDate: ''
            });
        } catch(error) {
            console.error("Error adding pregnancy tracker:", err);
        }
    }

    return (
        <Card>
            <CardBody>
            <b>Track Your Pregnancy</b>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="stage">Stage:</label> {' '}
                    <select
                    name="stage"
                    id="stage"
                    value={formState.stage}
                    onChange={handleChange}
                    >
                        <option value="">Select Stage</option>
                        <option value="pregnancy">Pregnancy</option>
                        <option value="postpartum">Postpartum</option>
                    </select>
                </div>
                {formState.stage === 'pregnancy' && (
                    <div>
                        <label htmlFor="dueDate">Due Date:</label>  {' '}
                        <input
                        type="date"
                        name="dueDate"
                        id="dueDate"
                        value={formState.dueDate}
                        onChange={handleChange}
                        />
                    </div>
                )}
                {formState.stage === 'postpartum' && (
                    <div>
                        <label htmlFor="birthDate">Birth Date:</label> {' '}
                        <input
                        type="date"
                        name="birthDate"
                        id="birthDate"
                        value={formState.birthDate}
                        onChange={handleChange}
                        />
                    </div>
                )}
                <button type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
                {error && <p>Error submitting the form: {error.message}</p>}
            </form>
            </CardBody>
        </Card>
    )
}

export default PregnancyTrackerForm