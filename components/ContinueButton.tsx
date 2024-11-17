import React from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { FormDataProps } from '@/utils/types';
import useFormValidation from '@/hooks/useFormValidation';

interface ContinueButtonProps {
    formData: FormDataProps;
    currentStep: number;
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
    setFormData: React.Dispatch<React.SetStateAction<FormDataProps>>;
  }

  const ContinueButton: React.FC<ContinueButtonProps> = ({ formData, currentStep, setCurrentStep, setFormData })=>{
  const isFormValid = useFormValidation(formData, currentStep);

  const handleSubmit = () => {
    if (currentStep === 3) {
        // when i submit the form, i clean all the fields and get back to the first step
      Alert.alert("Success", "The form was submitted successfully", [{ text: "OK" }]);
      setFormData({
        fullName: '',
        phoneNumber: '',
        email: '',
        website: '',
        portfolio: '',
        coverLetter: '',
        filesUploaded: [],
      });
      setCurrentStep(1);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <View>
      <Pressable
        className={`flex p-4 rounded-lg mx-6 mb-2 ${!isFormValid ? 'bg-[#b2baf0]' : 'bg-blue-600'}`}
        onPress={handleSubmit}
        disabled={!isFormValid}
      >
        <Text className="text-white text-xl text-center font-semibold">
          {currentStep === 3 ? "Submit" : "Continue"}
        </Text>
      </Pressable>
    </View>
  );
};

export default ContinueButton;
