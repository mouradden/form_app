export type FormDataProps = {
    fullName: string,
    phoneNumber: string,
    email: string,
    website: string,
    portfolio: string,
    coverLetter: string,
    filesUploaded: FileData[],
}
export type StepProps = {
    formData: FormDataProps;
    setFormData: (value: React.SetStateAction<FormDataProps>) => void;
  };


export interface FileData {
    filename: string;
    size: string;
}