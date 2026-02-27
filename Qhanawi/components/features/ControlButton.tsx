import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface ControlButtonProps {
  icon: string;
  label: string;
  bgColor: string;
  textColor: string;
  activeBgColor: string;
  activeTextColor: string;
  onPress: () => void;
}

export function ControlButton({ 
  icon, 
  label, 
  bgColor, 
  textColor,
  activeBgColor,
  activeTextColor,
  onPress 
}: ControlButtonProps) {
  return (
    <TouchableOpacity 
      className="flex-col items-center justify-center gap-1"
      onPress={onPress}
    >
      <View 
        className={`w-12 h-12 items-center justify-center rounded-full ${bgColor} ${textColor}`}
      >
        <MaterialIcons name={icon as any} size={24} color="currentColor" />
      </View>
      <Text className="text-xs font-medium text-slate-500 dark:text-slate-400">
        {label}
      </Text>
    </TouchableOpacity>
  );
}   