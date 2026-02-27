import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface ScanHistoryItemProps {
  scan: {
    id: string;
    cropName: string;
    diagnosis: string;
    confidence: number;
    isHealthy: boolean;
    time: string;
  };
}

export function ScanHistoryItem({ scan }: ScanHistoryItemProps) {
  const bgColor = scan.isHealthy ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20';
  const textColor = scan.isHealthy ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  const iconName = scan.isHealthy ? 'health-and-safety' : 'pest-control';

  return (
    <TouchableOpacity className="flex-row items-center p-3 bg-surface-light dark:bg-surface-dark rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
      <View className={`w-12 h-12 rounded-lg ${bgColor} flex items-center justify-center mr-4`}>
        <MaterialIcons name={iconName as any} size={24} color={scan.isHealthy ? '#16a34a' : '#dc2626'} />
      </View>
      
      <View className="flex-1">
        <Text className="font-semibold text-slate-800 dark:text-black text-sm">
          {scan.cropName}
        </Text>
        <Text className={`text-xs ${textColor} font-medium`}>
          {scan.diagnosis} ({scan.confidence}%)
        </Text>
      </View>
      
      <View className="items-end">
        <Text className="text-xs text-slate-400">{scan.time}</Text>
        <MaterialIcons name="chevron-right" size={16} color="#cbd5e1" />
      </View>
    </TouchableOpacity>
  );
}