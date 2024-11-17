// src/hooks/useFormValidation.js
import { FormDataProps } from '@/utils/types';
import { isValidateEmail } from '@/utils/validation';
import { useState, useEffect } from 'react';


const useFormValidation = (formData: FormDataProps, currentStep: number) => {
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const { fullName, email, phoneNumber, coverLetter } = formData;

    let isValid = false;
    if (currentStep === 1) {
      // Step 1: Validate fullName and email
      isValid = fullName.trim() !== '' && phoneNumber.trim() !== '' && email.trim() !== '' && isValidateEmail(email);
    } else if (currentStep === 2) {
      // Step 2: Validate coverLetter (depends on step 1 passing)
      isValid = fullName.trim() !== '' && email.trim() !== '' && coverLetter.trim() !== '';
    } else if (currentStep === 3) {
      // Step 3: Always valid (final step)
      isValid = true;
    }

    setIsFormValid(isValid);
  }, [formData, currentStep]);

  return isFormValid;
};

export default useFormValidation;
