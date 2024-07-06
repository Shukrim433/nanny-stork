import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import {
  ADD_PREGNANCY_TRACKER,
  UPDATE_PREGNANCY_TRACKER,
} from "../../utils/mutations";
import {
  Button,
  Input,
  Textarea,
  Card,
  CardBody,
  Alert,
} from "@material-tailwind/react";
import Auth from "../../utils/auth";

const PregnancyTrackerForm = ({
  initialData,
  trackerId,
  refetchPregnancyData,
  setIsEditing,
}) => {
  // holds PregnancyTrackerForm form state
  const [formState, setFormState] = useState({
    stage: "",
    dueDate: "",
    birthDate: "",
  });

  const [addPregnancyTracker, { loading: adding, error: addError }] =
    useMutation(ADD_PREGNANCY_TRACKER);

  const [updatePregnancyTracker, { loading: updating, error: updateError }] =
    useMutation(UPDATE_PREGNANCY_TRACKER);

  // runs everytime the initialData state/prop runs
  useEffect(() => {
    if (initialData) {
      setFormState(initialData);
    }
  }, [initialData]);

  // update formState based on what user inputs (OnChange event)
  const handleChange = (event) => {
    // event.target.name + event.target.value
    const { name, value } = event.target;
    // set the formState field that triggered the change event
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // onSubmit create the pregnancy tracker
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (initialData) {
        await updatePregnancyTracker({
          variables: { trackerId, ...formState },
        });
      } else {
        await addPregnancyTracker({ variables: { ...formState } });
      }
      setFormState({
        stage: "",
        dueDate: "",
        birthDate: "",
      });
      //   window.location.assign("/me");
      refetchPregnancyData();
      setIsEditing(false);
    } catch (error) {
      console.error("Error adding pregnancy tracker:", error);
    }
  };

  // determine if the submit button should be disabled
  const isSubmitDisabled = () => {
    if (formState.stage === "") {
      return true;
    }
    if (formState.stage === "pregnancy" && formState.dueDate === "") {
      return true;
    }
    if (formState.stage === "postpartum" && formState.birthDate === "") {
      return true;
    }
    return false;
  };

  return (
    <Card>
      <CardBody>
        <b>Track Your Pregnancy</b>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="stage">Stage:</label>{" "}
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
          {formState.stage === "pregnancy" && (
            <div>
              <label htmlFor="dueDate">Due Date:</label>{" "}
              <input
                type="date"
                name="dueDate"
                id="dueDate"
                value={formState.dueDate}
                onChange={handleChange}
              />
            </div>
          )}
          {formState.stage === "postpartum" && (
            <div>
              <label htmlFor="birthDate">Birth Date:</label>{" "}
              <input
                type="date"
                name="birthDate"
                id="birthDate"
                value={formState.birthDate}
                onChange={handleChange}
              />
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitDisabled() || adding || updating}
          >
            {adding || updating ? "Submitting..." : "Submit"}
          </button>
          {addError && <p>Error adding the form: {addError.message}</p>}
          {updateError && <p>Error updating the form: {updateError.message}</p>}
        </form>
      </CardBody>
    </Card>
  );
};

export default PregnancyTrackerForm;

//
