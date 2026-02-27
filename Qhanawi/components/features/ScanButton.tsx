import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


export function ScanButton() {
    const router = useRouter();

  return (
    <View className="flex-col items-center justify-center">
      <TouchableOpacity className="relative flex items-center justify-center w-24 h-24 bg-secondary rounded-2xl mb-4 active:scale-95 bg-[#FFB300]"
      style={{
        shadowColor: '#FFB300',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 10,
      }}
      onPress={()=> router.push('/scan')}>
        <View className="absolute inset-0 bg-white/20 rounded-2xl" />
        <View className="flex-col items-center">
          <MaterialIcons name="center-focus-strong" size={40} color="white" />
        </View>
      </TouchableOpacity>
      
      <Text className="text-xl font-bold text-slate-800 dark:text-black">
        Escanear Cultivo
      </Text>
      <Text className="text-sm text-slate-500 dark:text-slate-400">
        Toque para iniciar análisis
      </Text>
    </View>
  );
}