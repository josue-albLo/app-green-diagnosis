import { DiagnosticHistory } from '@/interfaces/disease.interface';
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import React from 'react';
import { Button, Platform, Share, View } from 'react-native';

export default function App({ diagnosticHistoryList }: { diagnosticHistoryList: DiagnosticHistory[] }) {
  const generarPDF = async (diagnosticHistoryList: DiagnosticHistory[]) => {
    // Procesar datos para el resumen y las gráficas
    const totalDiagnosticos = diagnosticHistoryList.length;

    // Contar ocurrencias de enfermedades
    const diseaseCounts: { [key: string]: number } = {};
    diagnosticHistoryList.forEach(item => {
      diseaseCounts[item.disease] = (diseaseCounts[item.disease] || 0) + 1;
    });

    // Crear datos para la gráfica de pastel
    const pieChartData = Object.keys(diseaseCounts).map(disease => ({
      label: disease,
      value: diseaseCounts[disease],
    }));

    // Generar URL para la gráfica de pastel utilizando QuickChart
    const pieChartUrl = `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify({
      type: 'pie',
      data: {
        labels: pieChartData.map(d => d.label),
        datasets: [{
          data: pieChartData.map(d => d.value),
        }],
      },
    }))}`;

    // Generar el contenido HTML del reporte unificado
    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { text-align: center; }
            h2 { color: #2e6c80; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid #dddddd; padding: 8px; text-align: left; vertical-align: top; }
            th { background-color: #f2f2f2; }
            .summary { margin-bottom: 40px; }
            .chart-container { text-align: center; margin-bottom: 40px; }
            .chart-container img { max-width: 100%; height: auto; }
            .recommendations ul { list-style-type: disc; margin: 0; padding-left: 20px; }
            .image-container { text-align: center; margin-bottom: 20px; }
            .image-container img { max-width: 200px; height: auto; }
          </style>
        </head>
        <body>
          <h1>Reporte de Diagnósticos</h1>

          <!-- Sección de resumen -->
          <div class="summary">
            <h2>Resumen</h2>
            <p>Total de diagnósticos: <strong>${totalDiagnosticos}</strong></p>
            <p>Enfermedades detectadas:</p>
            <ul>
              ${Object.keys(diseaseCounts).map(disease => `
                <li>${disease}: ${diseaseCounts[disease]}</li>
              `).join('')}
            </ul>
          </div>

          <!-- Sección de gráfica -->
          <div class="chart-container">
            <h2>Distribución de Enfermedades</h2>
            <img src="${pieChartUrl}" alt="Gráfica de Distribución de Enfermedades" />
          </div>

          <!-- Tabla detallada -->
          <h2>Detalles de Diagnósticos</h2>
          <table>
            <thead>
              <tr>
                <th>Planta</th>
                <th>Fecha</th>
                <th>Enfermedad</th>
                <th>Probabilidad</th>
                <th>Descripción</th>
                <th>Recomendaciones</th>
                <th>Imagen</th>
              </tr>
            </thead>
            <tbody>
              ${diagnosticHistoryList.map(item => `
                <tr>
                  <td>${item.plant}</td>
                  <td>${item.date}</td>
                  <td>${item.disease}</td>
                  <td>${item.probability}</td>
                  <td>${item.description}</td>
                  <td>
                    <ul>
                      ${item.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                    </ul>
                  </td>
                  <td class="image-container">
                    ${item.image ? `<img src="${item.image}" alt="Imagen de ${item.plant}" />` : 'N/A'}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    try {
      // Generar el PDF
      const { uri } = await Print.printToFileAsync({ html: htmlContent });

      if (Platform.OS === 'android') {
        // Solicitar acceso al directorio de descargas
        const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

        if (!permissions.granted) {
          alert('Permiso denegado para acceder al almacenamiento.');
          return;
        }

        const directoryUri = permissions.directoryUri;

        // Leer el archivo PDF generado
        const data = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        // Crear un archivo en el directorio de descargas
        const fileName = 'reporte_diagnosticos_unificado.pdf';
        const mimeType = 'application/pdf';

        try {
          const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(
            directoryUri,
            fileName,
            mimeType
          );

          // Escribir el contenido al nuevo archivo
          await FileSystem.StorageAccessFramework.writeAsStringAsync(fileUri, data, {
            encoding: FileSystem.EncodingType.Base64,
          });

          alert('PDF guardado en el directorio de descargas.');
        } catch (e) {
          console.error(e);
          alert('No se pudo crear el archivo en el directorio seleccionado.');
        }
      } else {
        // En iOS, usar el sistema de compartir
        await Share.share({ url: uri, title: 'Reporte de Diagnósticos' });
      }
    } catch (error) {
      console.error(error);
      alert('Ocurrió un error al guardar el PDF.');
    }
  };

  return (
    <View style={{ marginTop: 50 }}>
      <Button title="Generar Reporte Unificado" onPress={() => generarPDF(diagnosticHistoryList)} />
    </View>
  );
}
