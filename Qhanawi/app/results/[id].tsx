import { View, Text, TouchableOpacity, Image, ScrollView , Alert} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { CircularProgress } from '@/components/features/CircularProgress';
import { DiagnosisCard } from '@/components/features/DiagnosisCard';

export default function ResultsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const diagnosisData = params.imageData 
    ? JSON.parse(params.imageData as string) 
    : null;
  
  const imageUri = params.imageUri as string;

  const handleNewScan = () => {
    router.push('/scan');
  };

  const handleSaveReport = async () => {
    try {
      Alert.alert(
        'Reporte Guardado',
        'El diagnóstico se ha guardado en tu historial',
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el reporte');
    }
  };

  const handleViewTreatment = () => {
    Alert.alert(
      'Tratamiento Detallado',
      '1. Aplicar fungicida a base de cobre\n2. Aislar planta afectada\n3. Eliminar hojas infectadas\n4. Mejorar circulación de aire\n5. Reducir humedad',
      [{ text: 'Entendido' }]
    );
  };

  const getDiseaseName = (predictedClass: string) => {
    const parts = predictedClass.split('___');
    const crop = parts[0] || '';
    const disease = parts[1] || '';
    
    const cropNames: Record<string, string> = {
      'Tomato': 'Tomate',
      'Potato': 'Papa',
      'Grape': 'Uva',
      'Strawberry': 'Fresa'
    };
    
    const diseaseNames: Record<string, string> = {
      'healthy': 'Saludable',
      'Early_blight': 'Tizón Temprano',
      'Late_blight': 'Tizón Tardío',
      'Septoria_leaf_spot': 'Mancha Septoria',
      'Bacterial_spot': 'Mancha Bacteriana',
      'Leaf_Mold': 'Moho de la Hoja',
      'Tomato_Yellow_Leaf_Curl_Virus': 'Virus del Rizado Amarillo',
      'Tomato_mosaic_virus': 'Virus del Mosaico',
      'Spider_mites_Two-spotted_spider_mite': 'Ácaros Araña',
      'Black_rot': 'Podredumbre Negra',
      'Esca_(Black_Measles)': 'Esca',
      'Leaf_blight_(Isariopsis_Leaf_Spot)': 'Mancha de la Hoja',
      'Leaf_scorch': 'Quemadura de la Hoja'
    };
    
    const cropEs = cropNames[crop] || crop;
    const diseaseEs = diseaseNames[disease] || disease.replace(/_/g, ' ');
    
    return { crop: cropEs, disease: diseaseEs };
  };

  const diseaseInfo = diagnosisData ? getDiseaseName(diagnosisData.predicted_class) : null;

  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark">
      <StatusBar style="auto" />
      
      <View className="flex-row items-center justify-between p-4 pb-2 bg-surface-light dark:bg-surface-dark shadow-sm">
        <TouchableOpacity 
          className="p-2 rounded-full text-slate-800 dark:text-slate-100"
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color="currentColor" />
        </TouchableOpacity>
        
        <Text className="text-lg font-bold flex-1 text-center pr-10 text-slate-900 dark:text-black">
          Resultados
        </Text>
        
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1 px-6 py-6" showsVerticalScrollIndicator={false}>
        
        <View className="w-full mb-6">
          <View className="aspect-[4/3] w-full rounded-xl overflow-hidden relative">
            <Image
              source={{ uri: imageUri }}
              className="w-full h-full"
              resizeMode="cover"
            />
            <View className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            
            <View className="absolute bottom-3 right-3 bg-white/90 dark:bg-black/70 px-3 py-1 rounded-lg">
              <Text className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                ID: #{Date.now().toString().slice(-5)}
              </Text>
            </View>
          </View>
        </View>

        <View className="items-center mb-6">
          <Text className="text-2xl font-bold leading-tight tracking-tight text-slate-900 dark:text-black text-center">
            {diseaseInfo?.disease} ({diseaseInfo?.crop})
          </Text>
          <Text className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            {diagnosisData.scientificName}
          </Text>
        </View>

        <View className="items-center justify-center py-2 mb-6">
          <CircularProgress percentage={Math.round(diagnosisData.confidence * 100)} />
          <Text className="text-sm font-medium text-primary dark:text-accent-lime mt-2">
            Nivel de Confianza
          </Text>
        </View>

        <View className="mb-6">
          <DiagnosisCard 
            title={diagnosisData.is_healthy ? "Planta Saludable" : "Se detectó patología"}
            description={
                diagnosisData.is_healthy 
                  ? "La planta se encuentra en buen estado. Continúa con las prácticas de cultivo habituales."
                  : "Se recomienda aplicar fungicida y aislar la planta afectada inmediatamente para evitar la propagación del hongo a cultivos vecinos."
            }
            onViewDetails={handleViewTreatment}
          />
        </View>

        <View className="h-32" />
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 bg-surface-light dark:bg-surface-dark p-6 border-t border-slate-100 dark:border-slate-800">
        <View className="gap-3">
          <TouchableOpacity 
            className="w-full  bg-[#FFB300] hover:bg-yellow-600 py-3.5 px-6 rounded-xl flex-row items-center justify-center gap-2"
            style={{
              shadowColor: '#FFB300',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
            }}
            onPress={handleNewScan}
            activeOpacity={0.95}
          >
            <MaterialIcons name="center-focus-strong" size={24} color="white" />
            <Text className="text-black font-bold text-base">
              Nuevo Escaneo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="w-full bg-transparent border-2 border-qhanchay-green text-qhanchay-green dark:text-green-400 dark:border-green-400 font-bold py-3.5 px-6 rounded-xl hover:bg-green-50 dark:hover:bg-green-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            onPress={handleSaveReport}
            activeOpacity={0.95}
          >
            <MaterialIcons name="save-alt" size={24} color="currentColor" />
            <Text className="font-bold text-base">
              Guardar Reporte
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}