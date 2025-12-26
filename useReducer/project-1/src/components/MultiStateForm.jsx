import React, { useReducer } from "react";
import { FormReducer, initialState } from "./reducer/FormReducer";

const MultiStateForm = () => {
  const [state, dispatch] = useReducer(FormReducer, initialState);
  const { step, formData, isSubmitted } = state;

  if (isSubmitted) {
    return (
      <div>
        <h2>Form Submitted Successfully 🎉</h2>
        <button onClick={() => dispatch({ type: "RESET_FORM" })}>
          Reset Form
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>Step {step}</h2>

      {/* STEP 1 */}
      {step === 1 && (
        <>
          <input
            placeholder="Name"
            value={formData.name}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "name",
                value: e.target.value,
              })
            }
          />

          <input
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "email",
                value: e.target.value,
              })
            }
          />

          <button onClick={() => dispatch({ type: "NEXT_STEP" })}>
            Next
          </button>
        </>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <>
          <input
            placeholder="Username"
            value={formData.username}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "username",
                value: e.target.value,
              })
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "password",
                value: e.target.value,
              })
            }
          />

          <button onClick={() => dispatch({ type: "PREVIOUS_STEP" })}>
            Back
          </button>
          <button onClick={() => dispatch({ type: "NEXT_STEP" })}>
            Next
          </button>
        </>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <>
          <h3>Review Details</h3>
          <p>Name: {formData.name}</p>
          <p>Email: {formData.email}</p>
          <p>Username: {formData.username}</p>

          <button onClick={() => dispatch({ type: "PREVIOUS_STEP" })}>
            Back
          </button>
          <button onClick={() => dispatch({ type: "SUBMIT_FORM" })}>
            Submit
          </button>
        </>
      )}
    </div>
  );
};

export default MultiStateForm;
