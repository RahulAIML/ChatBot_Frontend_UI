// JOI DOCUMENTATION

import Joi from "joi";

const schema = Joi.object({
  hsc: Joi.number().valid(0, 1).required().messages({
    "any.required": "HSC field is required",
    "any.only": "Invalid HSC value",
  }),
  hscresult: Joi.when("hsc", {
    is: 1,
    then: Joi.number().required().messages({
      "any.required": "HSC Result is required when HSC is 1",
      "number.base": "HSC Result cannot be empty when HSC is 1",
    }),
    otherwise: Joi.valid(0).messages({
      "any.only": "HSC Result must be 0 when HSC is not 1",
    }),
  }),
});



import { useState } from "react";
import Joi from "joi";

const MyForm = () => {
  const [formData, setFormData] = useState({ hsc: "", hscresult: "" });
  const [errors, setErrors] = useState({});

//   const validateForm = () => {
//     const { error } = schema.validate(formData, { abortEarly: false });
//     if (!error) return null;

//     const errorMessages = {};
//     error.details.forEach((err) => {
//         if (err.message !== '') {
//         const field = errorMessages[err.path[0]] + 'Err' ;
//         setState((_prevState) => ({
//             ..._prevState,
//             [field]: true,
//             [`${field}Msg`]: err.message,
//           }));
//         }
//     });

//     return errorMessages;
//   };

  const handleSubmit = async (_e) => {
    try {
      _e.preventDefault();
       schema.validate(formData, { abortEarly: false });
    } catch (error) {
        const errorMessages = {};
        error.details.forEach((err) => {
            if (err.message !== '') {
            const field = errorMessages[err.path[0]] + 'Err' ;
            setState((_prevState) => ({
                ..._prevState,
                [field]: true,
                [`${field}Msg`]: err.message,
              }));
            }
        });
    
        return errorMessages;
    }
    handelOpenModal('Press Confirm, If You are sure data provided by you is Correct.');
    
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm();
//     if (validationErrors) {
//       setErrors(validationErrors);
//       return;
//     }

//     console.log("Form Submitted Successfully", formData);
//   };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>HSC (0 or 1):</label>
        <input type="number" name="hsc" value={formData.hsc} onChange={handleChange} />
        {errors.hsc && <p style={{ color: "red" }}>{errors.hsc}</p>}
      </div>

      <div>
        <label>HSC Result:</label>
        <input type="number" name="hscresult" value={formData.hscresult} onChange={handleChange} />
        {errors.hscresult && <p style={{ color: "red" }}>{errors.hscresult}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
