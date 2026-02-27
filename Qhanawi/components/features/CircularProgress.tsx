import { View, Text } from 'react-native';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}

export function CircularProgress({ 
  percentage, 
  size = 160, 
  strokeWidth = 3 
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;
  const center = size / 2;

  return (
    <View className="relative" style={{ width: size, height: size }}>
      <Svg width={size} height={size} className="rotate-[-90deg]">
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#66BB6A"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </Svg>
      
      <View className="absolute inset-0 items-center justify-center">
        <Text className="text-3xl font-bold text-slate-900 dark:text-black">
          {percentage}%
        </Text>
      </View>
    </View>
  );
}