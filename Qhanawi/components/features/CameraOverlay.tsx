import { View, Text, Animated } from 'react-native';
import { useEffect, useRef} from 'react';

export function CameraOverlay() {
  const scanAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      scanAnimation.setValue(0);
      Animated.timing(scanAnimation, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => animate());
    };

    animate();
  }, [scanAnimation]);

  const translateY = scanAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 300], // Ajustar según el alto del frame
  });

  const opacity = scanAnimation.interpolate({
    inputRange: [0, 0.1, 0.9, 1],
    outputRange: [0, 1, 1, 0],
  });

  return (
    <View className="relative flex-1 rounded-2xl border-2 border-dashed border-secondary overflow-hidden">
      <View className="absolute inset-0 bg-black/40" style={{
        borderTopWidth: 120,
        borderBottomWidth: 120,
        borderLeftWidth: 40,
        borderRightWidth: 40,
        borderColor: 'rgba(0,0,0,0.6)',
      }} />

      <View className="absolute top-0 left-0 w-6 h-6 border-l-4 border-t-4 border-secondary rounded-tl-lg" 
        style={{ marginLeft: -2, marginTop: -2 }} 
      />
      <View className="absolute top-0 right-0 w-6 h-6 border-r-4 border-t-4 border-secondary rounded-tr-lg"
        style={{ marginRight: -2, marginTop: -2 }}
      />
      <View className="absolute bottom-0 left-0 w-6 h-6 border-l-4 border-b-4 border-secondary rounded-bl-lg"
        style={{ marginLeft: -2, marginBottom: -2 }}
      />
      <View className="absolute bottom-0 right-0 w-6 h-6 border-r-4 border-b-4 border-secondary rounded-br-lg"
        style={{ marginRight: -2, marginBottom: -2 }}
      />

      <View className="absolute bottom-4 left-0 right-0 items-center">
        <View className="bg-black/30 px-3 py-1 rounded-full">
          <Text className="text-white/90 text-sm font-semibold tracking-wide">
            Enfoca la hoja aquí
          </Text>
        </View>
      </View>

      <Animated.View 
        className="absolute left-0 right-0 h-1 bg-secondary/80"
        style={{ 
          transform: [{ translateY }],
          opacity,
          shadowColor: '#FFB300',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.8,
          shadowRadius: 15,
        }}
      />
    </View>
  );
}