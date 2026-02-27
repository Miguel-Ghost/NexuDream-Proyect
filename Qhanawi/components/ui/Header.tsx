import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export function Header() {
  return (
    <View className="flex-col items-center pt-8 pb-4 px-6 bg-surface-light dark:bg-surface-dark rounded-b-2xl shadow-sm">
      <View className="flex-row w-full items-center justify-between mb-2">
        <TouchableOpacity className="p-2 -ml-2 rounded-full text-slate-700 dark:text-slate-300">
          <MaterialIcons name="menu" size={24} color="#100606" />
        </TouchableOpacity>
        
        <View className="flex-row items-center gap-2">
          <MaterialIcons name="spa" size={32} color="#2f7f34" />
          <Text className="text-2xl font-bold text-primary tracking-tight">Qhanawi</Text>
        </View>
        
        <TouchableOpacity className="p-2 -mr-2 rounded-full relative text-slate-700 dark:text-slate-300">
          <MaterialIcons name="notifications" size={24} color="#100606" />
          <View className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-surface-dark" />
        </TouchableOpacity>
      </View>
    </View>
  );
}