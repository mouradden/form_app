import "../global.css"
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

import ContinueButton from "@/components/ContinueButton";
import Header from "@/components/Header";
import StepsNav from "@/components/StepsNav";
import Personal from "@/components/Personal";
import Additional from "@/components/Additional";
import Review from "@/components/Review";


export default function Index() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    website: '',
    portfolio: '',
    coverLetter: '',
    filesUploaded: [],
  });
  
    
  return (
    <SafeAreaView className="flex-1 gap-2">
      {/* the Header on the top of the screen */}
      <Header />
      <View className=" px-6 py-5">
        {/* Steps Header */}
        <StepsNav formData={formData} currentStep={currentStep} setCurrentStep={setCurrentStep}/>

      </View>
      {/* the form */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex:1}}>
        <ScrollView className="">
          {currentStep === 1 && <Personal formData={formData} setFormData={setFormData} />}
          {currentStep === 2 && <Additional formData={formData} setFormData={setFormData} />}
          {currentStep === 3 && <Review formData={formData} setFormData={setFormData} setCurrentStep={setCurrentStep}/>}
        </ScrollView>
      </KeyboardAvoidingView>
      <ContinueButton formData={formData} currentStep={currentStep} setCurrentStep={setCurrentStep} setFormData={setFormData}/>
    </SafeAreaView>
  );
}
