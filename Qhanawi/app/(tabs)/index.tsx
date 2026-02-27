import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusCard } from '@/components/features/StatusCard';
import { ScanButton } from '@/components/features/ScanButton';
import { CropCard } from '@/components/features/CropCard';
import { ScanHistoryItem } from '@/components/features/ScanHistoryItem';
import { Header } from '@/components/ui/Header';
import { useRouter } from 'expo-router';

const crops = [
  { id: '1', name: 'Tomate', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBHdU1xn6H-dqc7rBvDWtpdSg2Yd3BTixJqa3Ec4lU2JVtAx1botKJumPOyXQKfmiYCo-cA4eB3EJa8Fum_uZ6BFtRV_vWECE4aHAvvxmzfYrqqHPVtq_0g9QFv76H_6uYwoVvejUeWsJlwTTj8LbB9nKmNrqNeXcyZzq2ECgwCb12_SbBVNlGoja43I2TH-5Nuu-8DYp8a2Gqz4ABHq6WY3RZWFVKfczOF60Jy2sXp1Bv_t2DlIpQ6Mt-KA-JgwMm6jvAEMZ4MVHK' },
  { id: '2', name: 'Uva', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfQHiKbHtXzxCiUPeZCjsxMulb3UflqfWPf_-N07E558bgXoWOAOcMbPMrl-Qah57U08XFkOVYo5Mv4fDAt_W43K9OeeCu4SDrh16EZTbthTiTHF6t50vGZa5yAQwkncHIHI50xlwUxcgj5MHWz17wt_q8W5KTBBFSPd7cr2fA_z35cEvGcpLrFwtVwPetOSPKENBaROnxy6TvM8OHFuaApl9Twg3umohcm1kLDuPL624aLXmZwhFlh7FWFhh9cCKpmE8keWbQl2VK' },
  { id: '3', name: 'Fresa', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJbLnRPj6MfRCYskHccVnfvOfZCEKwbtuPr6HDkO-mw1RJm3nqE5e-Xop462JDnxfSe3lHj1uo54TFulnV2X-iAgJrubdWJXphprl00g47GLIN-7rOHSYra_x8YTb3WhsT4-AD7cimlYHZntNsO5VBv9NMpKbhS363uz52euie0Lr6oRZJ9O6GCG3Vc9l3cm7qsFJFTRMex8dHmYOLS4rFWC6ow1ZZbjC-y2_r_ZHhDpzwRPSuUaupUX6EqP4sssXR48K4MjtxQWT3' },
  { id: '4', name: 'Papa', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGkQ4J-73mNMN7Z-FPIyVskn9NEKmJSJNlWpkPkYeEfuDlb-BYCOewnGiEutk2U4irzOibBucvePuHlbPtel38E_qZKJzU2ssTUH_quxCq552OCD9mXcEk7aa8_H5TbnJACGwkZ2ZGd7v1rOURO2xbGcGMChgaotYZPhk0AwAE9BX25z1zj6vqF8ziOErSsTQZ6MeRuI8FxxYEPM9OVflvaRS7VpGbU8BNxtZLtwMQcE77DgEG7poZrl7bvPEvdcPRaiHwopCW-kz5' },
];

const recentScans = [
  {
    id: '1',
    cropName: 'Hoja de Tomate',
    diagnosis: 'Tizón Tardío Detectado',
    confidence: 98,
    isHealthy: false,
    time: '10:45 AM',
  },
  {
    id: '2',
    cropName: 'Hoja de Papa',
    diagnosis: 'Saludable',
    confidence: 99.9,
    isHealthy: true,
    time: 'Ayer',
  },
];

export default function HomeScreen() {

  const router = useRouter();

  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark">
      <StatusBar style="auto" />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <Header />
        <View className="px-6 pb-6">
          <View className="mb-6">
            <StatusCard/>
          </View>

          <View className="items-center justify-center py-2 mb-6">
            <ScanButton />
          </View>

          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-slate-800 text-black">
                Cultivos Soportados
              </Text>
              <TouchableOpacity>
                <Text className="text-xs font-semibold text-primary">
                  Ver todos
                </Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              className="mb-2"
            >
              <View className="flex-row gap-2">
                {crops.map((crop) => (
                  <CropCard key={crop.id} crop={crop} />
                ))}
              </View>
            </ScrollView>
          </View>

          <View className="mb-6">
            <Text className="text-lg font-bold text-slate-800 text-black mb-4">
              Últimos Diagnósticos
            </Text>
            <View className="gap-3">
              {recentScans.map((scan) => (
                <ScanHistoryItem key={scan.id} scan={scan} />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}