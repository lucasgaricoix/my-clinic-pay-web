export type Patient = {
  id?: string,
  name: string,
  birthDate: string,
  responsible: Responsible
}

type Responsible = {
  name: string
}