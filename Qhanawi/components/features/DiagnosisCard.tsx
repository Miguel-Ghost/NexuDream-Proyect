import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface DiagnosisCardProps {
  title: string;
  description: string;
  onViewDetails: () => void;
}

export function DiagnosisCard({ 
  title, 
  description, 
  onViewDetails 
}: DiagnosisCardProps) {
  return (
    <View className="bg-[#FFF3E0] dark:bg-orange-900/30 border border-orange-100 dark:border-orange-800/50 rounded-xl p-5 shadow-sm">
      <View className="flex-row items-start gap-4">
        <View className="bg-orange-100 dark:bg-orange-800 p-2 rounded-full shrink-0 text-orange-600 dark:text-orange-200">
          <MaterialIcons name="warning" size={24} color="#FFB300" />
        </View>
        
        <View className="flex-1">
          <Text className="text-lg font-bold text-orange-800 dark:text-orange-100 mb-1">
            {title}
          </Text>
          <Text className="text-sm text-orange-900/80 dark:text-orange-100/80 leading-relaxed">
            {description}
          </Text>
        </View>
      </View>

      <TouchableOpacity 
        className="mt-4 pt-4 border-t border-secondary/30 dark:border-secondary/40 flex-row justify-between items-center"
        onPress={onViewDetails}
      >
        <Text className="text-xs font-bold uppercase tracking-wider text-orange-700 dark:text-orange-300">
          Ver tratamiento detallado
        </Text>
        <MaterialIcons name="arrow-forward" size={16} color="#FFB300" />
      </TouchableOpacity>
    </View>
  );
}