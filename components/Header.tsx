import { View, Text, Pressable, Alert } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const Header = () => {
  return (
      <View className=" bg-white p-6 flex flex-row items-center gap-4">
        <Pressable onPress={()=>{
          Alert.alert("Alert", "go back not working for the moment", [{ text: "OK" }]);
        }
        }>
          <AntDesign name="left" size={30} color="black" />
        </Pressable>
        <View className="h-16 w-16 rounded-full bg-white border border-2 border-gray-300 items-center justify-center">
          <FontAwesome6 name="discord" size={30} color="blue"/>
        </View>
        <View className="flex flex-col gap-2 flex-1">
          <Text className="text-black font-semibold">Sr. Web Designer</Text>
          <Text className="text-gray-500">Discord</Text>
        </View>
        <Pressable className="items-center justify-center" 
          onPress={()=>{
            Alert.alert("Alert", "this button not working for the moment", [{ text: "OK" }]);
          }}
        >
          <FontAwesome6 name="ellipsis-vertical" size={30} color="gray" />
        </Pressable>
      </View>
  )
}

export default Header