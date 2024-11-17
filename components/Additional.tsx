import { View, Text, TextInput, Pressable } from 'react-native'
import { FileData, StepProps } from "../utils/types";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as DocumentPicker from 'expo-document-picker';

const Additional: React.FC<StepProps> = ({formData, setFormData}) => {
    const handleChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
      };

      const addFileToFormData = (newFile: FileData) => {
        setFormData((prev) => ({
          ...prev,
          filesUploaded: [...prev.filesUploaded, newFile],
        }));
      };
      const uploadFile = async () => {
        try {
          const docRes = await DocumentPicker.getDocumentAsync({
            type: [
              "application/pdf",
              "application/msword",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ],
          });
      
          if (!docRes.canceled && docRes.assets?.length > 0) {
            const fileName = docRes.assets[0].name;
            const fileSize = docRes.assets[0].size;
      
            if (fileSize === undefined) {
              return;
            }
      
            // Reject files greater than 12MB
            if (fileSize > 12 * 1024 * 1024) {
              return;
            }
      
            let formattedSize;
      
            // Convert size to MB or KB
            if (fileSize > 1024 * 1024) { // Greater than 1MB
              formattedSize = (fileSize / (1024 * 1024)).toFixed(2) + ' MB';
            } else if (fileSize > 1024) { // Greater than 1KB but less than 1MB
              formattedSize = (fileSize / 1024).toFixed(2) + ' KB';
            } else {
              formattedSize = fileSize + ' B'; // In bytes
            }
      
            const newFile = { filename: fileName, size: formattedSize };
      
            // Append the new file to the existing files array
            addFileToFormData(newFile);
      
          } else {
            console.log("File selection was canceled or no assets found.");
          }
        } catch (error) {
          console.log("Error while selecting file: ", error);
        }
      };
      
      const removeFile = (fileName: string) => {
        setFormData((prev) => ({
          ...prev,
          filesUploaded: prev.filesUploaded.filter((file) => file.filename !== fileName),
        }));
      };
      
  return (
        <>
          <View className="flex flex-col gap-6">
            <View className="flex flex-col gap-1 bg-white p-6 ">
                <Text className="text-2xl">Personal Information</Text>
                <Text className="text-gray-500 text-lg">In order to match you with the right opportunities we need some additional infomation first</Text>
                <Text className="text-red-500 text-lg">*Required fields</Text>
                <View className="gap-2">
                  <Text className="text-start text-2xl">Cover Letter<Text className="text-red-500">*</Text></Text>
                  <TextInput value={formData.coverLetter} onChangeText={(value) => handleChange("coverLetter", value)} placeholder="Sell yourself here" multiline={true} className=" h-48 p-4 text-xl border border-gray-400 rounded-lg bg-gray-100"/>
                </View>
            </View>
            <View className="bg-white gap-4 p-6 h-full">
              <Text className="text-2xl">Resume</Text>
              <View className="flex flex-col gap-3 ">
                {formData.filesUploaded.map((file, index) => (
                  <View className="flex flex-row gap-6 items-center" key={index}>
                    <View className="rounded-full p-3 bg-sky-100 shadow-lg">
                      <MaterialCommunityIcons name="newspaper-variant-outline" size={22} color="black" />
                    </View>
                    <View className="flex flex-col flex-1">
                      <Text  className="text-xl">{file.filename}</Text>
                      <Text className="text-gray-400">{file.size}</Text>
                    </View>
                    <Pressable onPress={()=>removeFile(file.filename)}>
                      <FontAwesome name="trash-o" size={24} color="black" />
                    </Pressable>
                  </View>
                ))}
              </View>

              <Pressable 
                onPress={uploadFile}
                className="flex flex-row items-center gap-4">
                <AntDesign name="pluscircle" size={60} color="black" />
                <View className="flex flex-col">
                  <Text className="text-xl">Add a file</Text>
                  <Text className="text-gray-500">Max fille size 12MB (.pdf, .doc, .docx)</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </>
  );
}
export default Additional