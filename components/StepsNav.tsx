import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { FormDataProps } from '@/utils/types';
import useFormValidation from '@/hooks/useFormValidation';

interface StepsNavBProps {
    formData: FormDataProps;
    currentStep: number;
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  }
const StepsNav: React.FC<StepsNavBProps> = ({formData, currentStep, setCurrentStep}) => {
    const steps = [
    { id: 1, label: 'Personal'},
    { id: 2, label: 'Additional'},
    { id: 3, label: 'Review'},
  ];
  const isFormValid = useFormValidation(formData, currentStep);

  return (
        <View className="flex flex-row items-center justify-between">
          {steps.map((step) => {
            const isCompleted = step.id < currentStep;
            const isActive = step.id === currentStep;

            return (
              <Pressable
                disabled={step.id > currentStep }
                onPress={() => setCurrentStep(step.id)}
                key={step.id} 
                className="flex flex-row items-center gap-2">
                <Text
                  className={`text-xl h-8 w-8 text-center font-semibold rounded-full text-white ${
                    isActive ? 'bg-blue-600' : isCompleted ? 'bg-green-600' : 'bg-gray-400'
                  }`}
                >
                  {step.id}
                </Text>
                <Text
                  className={`text-xl font-semibold ${
                    isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
                  }`}
                >
                  {step.label}
                </Text>
                {step.id !== steps.length && (
                  <Text className={`text-xl font-semibold ${isActive || isCompleted ? 'text-blue-600' : 'text-gray-400'}`}>
                    ---
                  </Text>
                )}
              </Pressable>
            );
          })}
        </View>
  )
}

export default StepsNav