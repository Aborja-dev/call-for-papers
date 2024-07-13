export type Submit = (formData: unknown) => void

export interface FormComponent{
    onSubmit: Submit,
}
type Item<T> = {
    id: number
} & T