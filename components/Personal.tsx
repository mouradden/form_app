import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import { StepProps } from "../utils/types";
import { isValidateEmail } from '@/utils/validation'; 
import PhoneInput, { ICountry } from 'react-native-international-phone-number';



const Personal: React.FC<StepProps> = ({ formData, setFormData }) => {
  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [selectedCountry, setSelectedCountry] = useState<ICountry>();
  const [phoneNumber, setPhoneNumber] = useState(formData.phoneNumber || ''); // Store phone number locally

  // Update the phone number whenever it changes, including the calling code
  useEffect(() => {
    if (phoneNumber && selectedCountry) {
      // Ensure the phone number always has the calling code of the selected country
      setFormData((prev) => ({
        ...prev,
        phoneNumber: `${selectedCountry.callingCode} ${phoneNumber.replace(selectedCountry.callingCode, '')}`, // Remove old code if any
      }));
    }
  }, [phoneNumber, selectedCountry, setFormData]);

  // Update phone number in the form data
  const handlePhoneNumberChange = (formattedNumber: string) => {
    setPhoneNumber(formattedNumber);
  };

  // Handle country change and update the selected country
  const handleSelectedCountry = (country: ICountry) => {
    setSelectedCountry(country);
  };

  return (
    <>
      <View className="flex flex-col p-6 bg-white gap-6">
        <View className="flex flex-col gap-1">
          <Text className="text-2xl">Personal Information</Text>
          <Text className="text-gray-500 text-lg">Let us get to know you a bit better by sharing your basic info.</Text>
          <Text className="text-red-500 text-lg">*Required fields</Text>
        </View>

        {/* Full Name Section */}
        <View className="gap-2">
          <Text className="text-2xl">Full name<Text className="text-red-500">*</Text></Text>
          <TextInput
            value={formData.fullName}
            onChangeText={(value) => handleChange("fullName", value)}
            placeholder="Enter your full name"
            className="p-4 text-xl border border-gray-400 rounded-lg bg-gray-100"
          />
          <Text className="text-gray-500">We're big on real names, so people know who's who.</Text>
        </View>

        {/* Phone Number Section */}
        <View className="gap-2">
          <Text className="text-2xl">Phone number<Text className="text-red-500">*</Text></Text>
          <View className="w-full border bg-gray-50 rounded-lg border border-gray-400">
            <PhoneInput
              defaultCountry='MA'
              value={phoneNumber}
              onChangePhoneNumber={handlePhoneNumberChange}
              selectedCountry={selectedCountry}
              onChangeSelectedCountry={handleSelectedCountry}
              placeholder="Enter ph one number"
            />
          </View>
        </View>

        {/* Email Section */}
        <View className="gap-2">
          <Text className="text-2xl">Email address<Text className="text-red-500">*</Text></Text>
          <TextInput
            value={formData.email}
            onChangeText={(value) => handleChange("email", value)}
            placeholder="Enter your email address"
            className="p-4 text-xl border border-gray-400 rounded-lg bg-gray-100"
          />
          {formData.email.trim() !== '' && !isValidateEmail(formData.email) && (
            <Text className="text-lg text-red-500">* Email format invalid</Text>
          )}
        </View>
      </View>
      <View className='bg-gray-200 w-full h-3'/>
      <View className="flex flex-col p-6 bg-white gap-4">
        {/* Website and Portfolio Sections */}
        <View className="gap-2">
          <Text className="text-2xl">Personal website</Text>
          <TextInput
            value={formData.website}
            onChangeText={(value) => handleChange("website", value)}
            placeholder="Enter your Personal website"
            className="p-4 text-xl border border-gray-400 rounded-lg bg-gray-100"
          />
          <Text className="text-gray-500">Your home page, blog, or company site</Text>
        </View>

        <View className="gap-2">
          <Text className="text-2xl">Portfolio URL</Text>
          <TextInput
            value={formData.portfolio}
            onChangeText={(value) => handleChange("portfolio", value)}
            placeholder="Enter your Portfolio URL"
            className="p-4 text-xl border border-gray-400 rounded-lg bg-gray-100"
          />
          <Text className="text-gray-500">Only shared with potential employers</Text>
        </View>
      </View>
    </>
  );
};

export default Personal;
