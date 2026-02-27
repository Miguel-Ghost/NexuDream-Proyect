import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export function StatusCard() {
  return (
    <View className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 relative overflow-hidden bg-[#2f7f34]">
      <View className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/10" />
      <View className="absolute -left-4 -bottom-4 w-32 h-32 rounded-full bg-white/5" />
      
      <View className="flex-row items-start justify-between relative z-10">
        <View>
          <Text className="text-white/80 text-sm font-medium mb-1">
            Estado del Sistema
          </Text>
          <Text className="text-xl font-bold text-white mb-4">
            Modelo CNN Activo
          </Text>
        </View>
        <MaterialIcons name="psychology" size={36} color="rgba(255,255,255,0.9)" />
      </View>
      
      <View className="flex-row items-center gap-3 relative z-10">
        <View className="flex-row items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-lg border border-white/10">
          <MaterialIcons name="check-circle" size={16} color="white" />
          <Text className="text-sm font-bold text-white">99.5% Precisión</Text>
        </View>
        
        <View className="flex-row items-center gap-1">
          <MaterialIcons name="update" size={14} color="rgba(255,255,255,0.8)" />
          <Text className="text-xs text-white/80">Actualizado hoy</Text>
        </View>
      </View>
    </View>
  );
}