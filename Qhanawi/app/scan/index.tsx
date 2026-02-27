import { View, Text, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { CameraOverlay } from '@/components/features/CameraOverlay';
import { ShutterButton } from '@/components/features/ShutterButton';
import { ControlButton } from '@/components/features/ControlButton';
import { TipCard } from '@/components/features/TipCard';
import { predictImage } from '@/lib/api';
import * as ImagePicker from 'expo-image-picker';

export default function ScanScreen() {
  const router = useRouter();
  const [flashOn, setFlashOn] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePrediction = async (uri: string) => {
    try {
      setLoading(true);
      
      const result = await predictImage(uri);
      
      router.push({
        pathname: '/results/[id]',
        params: {
          id: Date.now().toString(),
          imageData: JSON.stringify(result.data),
          imageUri: uri // Pasar la URI de la imagen para mostrarla
        }
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      Alert.alert(
        'Error',
        `No se pudo procesar la imagen. Inténtalo de nuevo.\n\nDetalle: ${errorMessage}`,
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  };

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Necesitamos acceso a la cámara para tomar fotos');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      await handlePrediction(result.assets[0].uri);
    }
  };

  const handlePickFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Necesitamos acceso a tu galería');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      await handlePrediction(result.assets[0].uri);
    }
  };

  const handleHistory = () => {
    router.push('/(tabs)/history');
  };

  const handleUpload = async () => {
    await handlePickFromGallery();
  };

  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark overflow-hidden relative">
      <StatusBar style="light" />

      {loading && (
        <View className="absolute inset-0 z-50 bg-black/80 items-center justify-center">
          <ActivityIndicator size="large" color="#FFB300" />
          <Text className="text-white mt-4 text-lg font-semibold">
            Analizando imagen...
          </Text>
        </View>
      )}
      
      <View className="absolute inset-0 z-0">
        <Image
          source={{ 
            uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATuWLnfWx3FUPPAe6TBEPxI0hghwpvXvqGk_MKeup5caY_MhoY6RYFUUtWpl6UWNBqTfKwR0jvHvedHMAYQJhNEbi1c8FzMI8pIU0Ne9HlXZJSYXtvxYgguZpB8rBki2WmcEXPjVDTGSE-x6_CvXALvMpVB-Jm3JFBXUlyZyhAS6emi5PLgrqDws9DOR1q_liBB_XHZgdlvSUHHBvFdLjP6wNZ4rOMw-LlIM3MRGQ-8PkBtEU65QXFiKjBDUUMQDbxNHlUAyo5Vhjl' 
          }}
          className="w-full h-full"
          resizeMode="cover"
        />
        <View className="absolute inset-0 bg-black/40" />
      </View>

      <View className="relative z-10 flex-1 flex flex-col justify-between">
        
        <View className="flex-row items-center justify-between p-4 pt-12 pb-2">
          <TouchableOpacity 
            className="flex-row items-center justify-center rounded-full bg-black/30 px-4 py-2"
            onPress={() => router.back()}
          >
            <Text className="text-white text-sm font-semibold tracking-wide">
              Cancelar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="w-10 h-10 items-center justify-center rounded-full bg-black/30"
            onPress={() => setFlashOn(!flashOn)}
          >
            <MaterialIcons 
              name={flashOn ? 'flash-on' : 'flash-off'} 
              size={24} 
              color="white" 
            />
          </TouchableOpacity>
        </View>

        <View className="flex-1 items-center justify-center px-8 pb-20">
          <View className="mb-6">
            <TipCard />
          </View>

          <View className="w-full max-w-sm aspect-[3/4]">
            <CameraOverlay />
          </View>
        </View>

        <View className="w-full bg-surface-light dark:bg-surface-dark rounded-t-[2rem] shadow-lg px-6 pt-6 pb-10 flex-col items-center gap-6 z-20">
          
          <View className="flex-row w-full items-center justify-between max-w-md">
            <ControlButton
              icon="photo-library"
              label="Galería"
              bgColor="bg-primary/10"
              textColor="text-primary"
              activeBgColor="bg-primary"
              activeTextColor="text-white"
              onPress={handlePickFromGallery}
            />

            <ShutterButton onPress={handleTakePhoto} />

            <ControlButton
              icon="history"
              label="Historial"
              bgColor="bg-slate-100 dark:bg-zinc-800"
              textColor="text-slate-600 dark:text-slate-300"
              activeBgColor="bg-primary/10"
              activeTextColor="text-primary"
              onPress={handleHistory}
            />
          </View>

          <TouchableOpacity 
            className="w-full max-w-xs h-12 flex-row items-center justify-center rounded-full bg-primary shadow-md shadow-primary/20 dark:shadow-none"
            onPress={handleUpload}
          >
            <MaterialIcons name="upload-file" size={20} color="white" />
            <Text className="text-white font-bold text-sm tracking-wide ml-2">
              Subir Galería
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}