export interface DiseaseInfo {
    id: string;
    disease: string;
    description: string;
    recommendations: string[];
}
export interface DiseaseResponse {
    id: string;
    image: string;
    email: string;
    disease: string;
    plant: string;
    probability: string;
    description: string;
    recommendations: string[];
}

export interface DiagnosticHistory {
    id: string;
    user_id: string;
    plant: string;
    date: string;
    disease: string;
    probability: string;
    recommendations: string[];
    description: string;
    image: string;
}

