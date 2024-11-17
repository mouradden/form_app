import { View, Text, TextInput, Pressable } from 'react-native'
import { StepProps } from "../utils/types";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Review: React.FC<StepProps & { setCurrentStep: React.Dispatch<React.SetStateAction<number>> }> = ({ formData, setFormData, setCurrentStep }) => {

  return (
        <>
          <View className="">
            <View className="bg-white p-6">
              <Text className="text-2xl">Review your application</Text>
              <Text className="text-lg text-gray-500">Is the Information you have submitted correct ?</Text>
            </View>
            <View className="p-6 flex flex-row">
              <Text className="text-2xl flex-1">Personal information</Text>
              <Pressable onPress={()=> setCurrentStep(1)}>
                <AntDesign name="edit" size={30} color="black" />
              </Pressable>
            </View>
            <View className="bg-white p-6 gap-2">
              <View>
                <Text className="text-lg text-gray-500">Full name</Text>
                <Text className="text-lg font-semibold">{formData.fullName}</Text>
              </View>
              <View>
                <Text className="text-lg text-gray-500">Phone number</Text>
                <Text className="text-lg font-semibold">{formData.phoneNumber}</Text>
              </View>
              <View>
                <Text className="text-lg text-gray-500">Email address</Text>
                <Text className="text-lg font-semibold">{formData.email}</Text>
              </View>
              <View className="w-full h-1 bg-gray-200"/>
              <View>
                <Text className="text-lg text-gray-500">Personal website</Text>
                <Text className="text-lg font-semibold">{formData.website}</Text>
              </View>
              <View>
                <Text className="text-lg text-gray-500">Portfolio URL</Text>
                <Text className="text-lg font-semibold">{formData.portfolio}</Text>
              </View>
            </View>
            <View className="p-6 flex flex-row">
              <Text className="text-2xl flex-1">Additional information</Text>
              <Pressable onPress={()=> setCurrentStep(2)}>
                <AntDesign name="edit" size={30} color="black" />
              </Pressable>
            </View>
            <View className="bg-white p-6 gap-2">
              <View>
                <Text className="text-lg text-gray-500">Cover letter</Text>
                <Text className="text-lg font-semibold">{formData.coverLetter}</Text>
              </View>
              <View className="gap-2 justify-center">
                <Text className="text-lg text-gray-500">Resume</Text>
                <View>
                  {formData.filesUploaded.map((file, index) => (
                    <View
                      className="flex flex-row items-center gap-6 mb-4"
                      key={index}
                    >
                      {/* Icon */}
                      <View className="rounded-full p-3 bg-sky-100 shadow-lg">
                        <MaterialCommunityIcons name="newspaper-variant-outline" size={24} color="black" />
                      </View>

                      {/* File Info */}
                      <View>
                        <Text className="text-lg font-medium">{file.filename}</Text>
                        <Text className="text-sm text-gray-400">{file.size}</Text>
                      </View>
                    </View>
                  ))}

                  {/* Fallback for empty filesUploaded */}
                  {formData.filesUploaded.length === 0 && (
                    <Text className="text-gray-500 text-center mt-4">No files uploaded.</Text>
                  )}
                </View>

              </View>
            </View>
          </View>
        </>
  );
}
export default Review