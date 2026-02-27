import { View, Text, Image } from 'react-native';

interface CropCardProps {
  crop: {
    id: string;
    name: string;
    image: string;
  };
}

export function CropCard({ crop }: CropCardProps) {
  return (
    <View className="flex-col items-center gap-2 min-w-[70px] mr-2">
      <View className="w-16 h-16 rounded-full border-2 border-accent-lime p-1 bg-surface-light dark:bg-surface-dark shadow-sm">
        <View className="w-full h-full rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800">
          <Image
            source={{ uri: crop.image }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
      </View>
      <Text className="text-xs font-medium text-slate-700 text-black">
        {crop.name}
      </Text>
    </View>
  );
}