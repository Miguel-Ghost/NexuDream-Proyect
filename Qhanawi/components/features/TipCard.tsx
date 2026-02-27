import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export function TipCard() {
  return (
    <View className="rounded-lg bg-black/50 px-4 py-2">
      <View className="flex-row items-center gap-2">
        <MaterialIcons name="lightbulb" size={18} color="#FFB300" />
        <Text className="text-white text-sm font-medium leading-normal">
          Tip: Evita sombras fuertes y fondos ruidosos
        </Text>
      </View>
    </View>
  );
}