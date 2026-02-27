const API_URL = 'http://192.168.100.43:8000';

export interface PredictionResult {
  success: boolean;
  data: {
    predicted_class: string;
    confidence: number;
    is_healthy: boolean;
    top_3: Array<{ class: string; probability: number }>;
    model_version: string;
  };
}

export async function predictImage(uri: string): Promise<PredictionResult> {
  const response = await fetch(uri);
  const blob = await response.blob();
  
  const formData = new FormData();
  formData.append('file', blob, `scan_${Date.now()}.jpg`);
  
  try {
    const res = await fetch(`${API_URL}/api/predict`, { 
      method: 'POST',
      body: formData,
    });
    
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || 'Error en la predicción');
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error en API:', error);
    throw error;
  }
}