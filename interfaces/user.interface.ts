export interface LoginFormValues {
    email: string
    password: string
}

export interface ForgotPasswordFormValues {
    email: string
}

export interface RegisterFormValues {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    department: string;
    town: string;
}