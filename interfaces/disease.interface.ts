export interface DiseaseInfo {
    id: string;
    disease: string;
    description: string;
    recommendations: string[];
}
export interface DiseaseRequest {
    image: string;
    disease: string;
    plant: string;
    probability: string;
    description: string;
    recommendations: string[];
}

export interface DiagnosticHistory {
    id: string;
    plant: string;
    date: string;
    disease: string;
    probability: string;
    recommendations: string[];
    description: string;
    image: string;
}