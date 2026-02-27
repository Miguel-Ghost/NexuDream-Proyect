import { View, TouchableOpacity, Pressable } from 'react-native';

interface ShutterButtonProps {
  onPress: () => void;
}

export function ShutterButton({ onPress }: ShutterButtonProps) {
  return (
    <TouchableOpacity 
      className="relative w-20 h-20 items-center justify-center rounded-full border-4 border-white shadow-lg bg-white active:scale-95"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      }}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {/* Outer ring */}
      <View 
        className="absolute inset-0 rounded-full"
        style={{
          borderWidth: 4,
          borderColor: 'rgba(255, 179, 0, 0.3)',
        }}
      />
      
      {/* Inner circle */}
      <View className="w-16 h-16 rounded-full bg-secondary border-[3px] border-white" />
    </TouchableOpacity>
  );
}