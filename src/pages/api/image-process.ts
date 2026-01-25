---
import type { APIRoute } from 'astro:api';

// Interface para optimización de imágenes
interface ProcessImageRequest {
  operation: 'process-single' | 'process-batch' | 'analyze' | 'optimize-existing';
  quality?: 'web' | 'balanced' | 'high' | 'maximum';
  formats?: string[];
  sizes?: string[];
  optimization?: 'speed' | 'balance' | 'quality' | 'maximum';
}

interface ImageMetadata {
  width: number;
  height: number;
  format: string;
  size: number;
  dominantColor: string;
  hasTransparency: boolean;
  quality?: number;
}

interface ProcessedImage {
  success: boolean;
  original: {
    name: string;
    size: number;
    dimensions: { width: number; height: number };
  };
  optimized: {
    webp?: string;
    avif?: string;
    jpg?: string;
    png?: string;
    size?: number;
    dimensions?: { width: number; height: number };
    quality?: number;
    compressionRatio?: number;
  };
  timestamp?: string;
  processingTime?: number;
}

// Configuración de optimización por defecto
const DEFAULT_QUALITY = 'balanced';
const DEFAULT_FORMATS = ['webp', 'jpg'];
const DEFAULT_SIZES = ['thumbnail', 'small', 'medium', 'large'];

// Mapeo de calidad a configuración de Sharp
const QUALITY_SETTINGS = {
  web: { quality: 80, progressive: true },
  balanced: { quality: 85, progressive: true },
  high: { quality: 90, progressive: true },
  maximum: { quality: 95, progressive: true }
};

// Tamaños optimizados para diferentes casos de uso
const SIZE_SETTINGS = {
  thumbnail: { width: 150, height: 150 },
  small: { width: 300, height: 300 },
  medium: { width: 800, height: 600 },
  large: { width: 1200, height: 900 },
  'extra-large': { width: 1920, height: 1080 }
};

export const POST: APIRoute = async ({ request, url }) => {
  try {
    const formData = await request.formData();
    const operation = formData.get('operation') || 'process-single';
    const file = formData.get('file') as File;
    
    if (!file && operation !== 'analyze') {
      return new Response(JSON.stringify({
        error: 'No file provided for operation: ' + operation,
        supportedOperations: [
          'process-single', 'process-batch', 'analyze', 'optimize-existing'
        ]
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    switch (operation) {
      case 'process-single':
        return await processSingleImage(formData);
      
      case 'process-batch':
        return await processBatchImages(formData);
      
      case 'analyze':
        return await analyzeImage(formData);
      
      case 'optimize-existing':
        return await optimizeExistingImage(formData);
      
      default:
        throw new Error(`Operación no soportada: ${operation}`);
    }
    
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: 'Error processing image', 
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

async function processSingleImage(formData: FormData) {
  const file = formData.get('file') as File;
    const quality = formData.get('quality') || DEFAULT_QUALITY;
    const formats = formData.getAll('formats') || DEFAULT_FORMATS;
    const sizes = formData.getAll('sizes') || DEFAULT_SIZES;
    const optimization = formData.get('optimization') || 'balance';
  
  // Verificar si Sharp está disponible
  try {
    const sharp = (await import('sharp')).default;
    return await processWithSharp(file.buffer, {
      quality,
      formats,
      sizes,
      optimization
    });
  } catch (error) {
    console.error('Sharp no está disponible en este entorno:', error.message);
    throw new Error('Image processing no disponible en este entorno');
  }
}

async function processBatchImages(formData: FormData) {
  const files = formData.getAll('files') as File[];
  const quality = formData.get('quality') || DEFAULT_QUALITY;
  const formats = formData.getAll('formats') || DEFAULT_FORMATS;
    const optimization = formData.get('optimization') || 'balance';
  
  try {
    const sharp = (await import('sharp')).default;
    
    const results = await Promise.all(
      files.map(file => processWithSharp(file.buffer, {
        quality,
        formats,
        sizes: DEFAULT_SIZES,
        optimization
      }))
    );
    
    return new Response(JSON.stringify({
      success: true,
      processed: results,
      totalFiles: files.length,
      timestamp: new Date().toISOString(),
      processingTime: 0 // Se calculará en la implementación con Sharp
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Error processing batch images',
      details: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function analyzeImage(formData: FormData) {
  const file = formData.get('file') as File;
  
  try {
    const sharp = (await import('sharp')).default;
    const image = sharp(file.buffer);
    const metadata = await image.metadata();
    
    const analysis = {
      format: file.type,
      size: file.size,
      dimensions: { width: metadata.width, height: metadata.height },
      hasTransparency: metadata.hasAlpha || metadata.hasProfile,
      dominantColor: await extractDominantColor(image),
      qualityScore: await analyzeImageQuality(image, metadata),
      recommendations: generateOptimizationSuggestions(metadata, analysis)
    };
    
    return new Response(JSON.stringify(analysis), {
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Error analyzing image',
      details: error.message
    }), {
      status: 500,
      headers: { { 'Content-Type': 'application/json' }
    });
  }
}

async function optimizeExistingImage(formData: FormData) {
  const imagePath = formData.get('imagePath') as string;
  
  try {
    const sharp = (await import('sharp')).default;
    const image = sharp(imagePath);
    
    // Analizar imagen existente
    const metadata = await image.metadata();
    const currentSize = await getImageSize(imagePath);
    
    // Recargar y optimizar imagen existente
    const optimized = await image
      .resize(metadata.width, metadata.height, { 
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ 
        quality: 85,
        progressive: true,
        mozjpeg: true,
        trellisQuantisation: true
      })
      .toBuffer();
    
    const compressionRatio = (currentSize - optimized.length) / currentSize;
    
    return new Response(JSON.stringify({
      success: true,
      original: {
        path: imagePath,
        size: currentSize,
        dimensions: { width: metadata.width, height: metadata.height }
      },
      optimized: {
        path: imagePath.replace(/\.[^.]+$/, '_optimized.jpg'),
        size: optimized.length,
        compressionRatio: compressionRatio
        quality: 85
      }
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Error optimizing existing image',
      details: error.message
    }), {
      status: 500,
      headers: { 'Content: 'application/json' }
    });
  }
  }
}

async function processWithSharp(buffer: ArrayBuffer, options: any): Promise<ProcessedImage> {
  const image = sharp(buffer);
  const metadata = await image.metadata();
  
  const qualitySettings = QUALITY_SETTINGS[options.quality || DEFAULT_QUALITY];
  
  return {
    success: true,
    original: {
      name: 'uploaded_image',
      size: buffer.byteLength,
      dimensions: { width: metadata.width, height: metadata.height },
      format: 'uploaded'
    },
    optimized: {
      webp: await createWebP(image, options, qualitySettings.webp),
      avif: await createAVIF(image, options, qualitySettings.avif),
      jpg: await createJPG(image, options, qualitySettings.jpg),
      size: buffer.byteLength
    },
    timestamp: new Date().toISOString(),
    processingTime: 0 // Se calculará en implementación real
  };
}

// Funciones para crear formatos optimizados
async function createWebP(image: any, options: any, qualitySettings: any): Promise<string> {
  const webp = image
    .toFormat('webp', {
      quality: qualitySettings.quality,
      progressive: true
      smartSubsample: true
      dithering: 0.5,
    })
    .toBuffer();
  
  return 'data:image/webp;base64,' + webp.toString('base64');
}

async function createAVIF(image: any, options: any, qualitySettings: any): Promise<string> {
  const avif = image
    .toFormat('avif', {
      quality: qualitySettings.avif,
      chromaQuality: 80, // Calidad AVIF por defecto
      speed: 4
    })
    .toBuffer();
  
  return 'image/avif;base64,' + avif.toString('base64');
}

async function createJPG(image: any, options: any, qualitySettings: any): Promise<string> {
  const jpg = image
    .toFormat('jpg', {
      quality: qualitySettings.jpg,
      progressive: true,
      mozjpeg: true,
      trellisQuantisation: true,
      chromaSubsampling: '4:2:0'
    })
    .toBuffer();
  
  return 'image/jpeg;base64,' + jpg.toString('base64');
}

// Funciones de análisis de calidad
async function extractDominantColor(image: any): Promise<string> {
  try {
    const { data } = await image
      .resize({ width: 32, height: 32 })
      .raw()
      .toBuffer({ resolveWithAlpha: true });
    
    // Extraer color predominante
    const dominant = findDominantColor(data);
    
    return rgbToHex(dominant);
  } catch (error) {
    console.error('Error extracting dominant color:', error);
    return '#667eea';
  }
}

async function analyzeImageQuality(image: any, metadata: any): Promise<number> {
  try {
    // Calcular sharpness
    const { data, info } = image;
    
    // Calcular métricas de calidad
    const sharpness = await calculateSharpness(data);
    const noiseLevel = await calculateNoiseLevel(data);
    const contrast = await calculateContrastRatio(data);
    
    // Score de calidad (0-100)
    const qualityScore = Math.min(100, (sharpness * 0.4) + (100 - noiseLevel) + (contrast / 100) * 60);
    
    return Math.round(qualityScore);
  } catch (error) {
    return 50; // Calidad por defecto
  }
}

function findDominantColor(data: Buffer): [number, number, number] {
  // Implementar algoritmo simple para encontrar color predominante
  const colorCount = {};
  let dominantColor = [0, 0, 0, 0];
  
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    
    const r2 = r * r;
    const g2 = g * g;
    const b2 = b * b;
    const a2 = a * a;
    
    colorCount[r] = (r2 + g2 + b2 + a2) / 6;
    colorCount[g] = colorCount[g] / (colorCount[r] + colorCount[g] + colorCount[b] + colorCount[a]);
    colorCount[b] = colorCount[b] / (colorCount[r] + colorCount[g] + colorCount[b] + colorCount[a]);
    colorCount[a] = colorCount[a] / (colorCount[r] + colorCount[g] + colorCount[b] + colorCount[a]);
  }
  
  let maxCount = 0;
  let dominantColorIndex = 0;
  
  for (let i = 0; i < 3; i++) {
    if (colorCount[i] > maxCount) {
      maxCount = colorCount[i];
      dominantColorIndex = i;
    }
  }
  
  return [dominantColorIndex * 255, maxCount * 255];
}

function rgbToHex(rgb: [number, number, number]): string {
  return '#' + rgb.map(c => c.toString(16).padStart(2, '0').slice(-2);
}

// Funciones auxiliares
async function calculateSharpness(data: Buffer): Promise<number> {
  // Implementar cálculo de sharpness usando bordes detectadas
  try {
    const edges = await data
      .convolve({
        width: 5,
        height: 5,
        kernel: [1, -1, 1, 0],
        scale: 1 / 256,
        channels: 3
      })
      .flatten()
      .map(Math.abs)
      .reduce((sum, val) => sum + val, 0);
    
    const meanSharpness = meanSharpness / edges.length;
    return Math.min(100, meanSharpness / 10);
  } catch (error) {
    console.warn('Error calculating sharpness:', error);
    return 75; // Valor por defecto
  }
}

async function calculateNoiseLevel(data: Buffer): Promise<number> {
  try {
    const { data } = image
      const noise = await data
      .normalize({ channels: [0, 1, 2] })
      .sub(data.normalize({ channels: [0, 1, 2] })
      .abs()
      .reduce((sum, val) => sum + val, 0) / (data.width * data.height * 3);
    
    const maxNoise = Math.max(...noise);
    const avgNoise = noise.reduce((sum, val) => sum + val, 0) / (data.width * data.height * 3);
    
    // Normalizar a escala 0-1 donde 0 = sin ruido, 1 = ruido máximo
    return avgNoise / maxNoise;
  } catch (error) {
    console.warn('Error calculating noise level:', error);
    return 0.05; // Valor por defecto
  }
}

async function calculateContrastRatio(data: Buffer): Promise<number> {
  try {
    const { data } = image;
    
    // Calcular contraste usando desviación estándar
    const mean = await data.mean();
    const rms = Math.sqrt(
      data.reduce((sum, val) => Math.pow(val - mean, 2), 0) / (data.width * data.height)
    );
    
    // Contraste RMS (0-100, donde 0 = sin contraste, 100 = máximo contraste)
    const maxContrast = Math.sqrt(255 * 2 * 3);
    const rmsRatio = (rms / maxContrast) * 100;
    
    return Math.min(100, rmsRatio * 100);
  } catch (error) {
    console.warn('Error calculating contrast ratio:', error);
    return 50; // Contraste medio por defecto
  }
}

function generateOptimizationSuggestions(metadata: any, analysis: any): string[] {
  const suggestions = [];
  
  // Basado en el análisis
  const { dimensions } = metadata;
  
  // Tamaño de imagen
  if (dimensions.width < 300) {
    suggestions.push('La imagen es muy pequeña (mínimo 300x300px recomendado)');
  }
  
  // Proporción del aspecto
  const aspectRatio = dimensions.width / dimensions.height;
  if (aspectRatio > 3) {
    suggestions.push('La imagen es muy vertical, puede no visualizarse bien en galerías horizontales');
  } else if (aspectRatio < 0.3) {
    suggestions.push('La imagen es muy ancha, considere recortar a formato más cuadrado');
  }
  
  // Formato actual
  const extension = metadata.format || 'unknown';
  if (!['jpg', 'jpeg', 'png', 'webp', 'avif'].includes(extension.toLowerCase())) {
    suggestions.push(`Formato ${extension} puede optimizarse con WebP o AVIF para mayor compresión`);
  }
  
  return suggestions;
}