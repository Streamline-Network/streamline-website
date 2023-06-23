export type Question = {
  question: string
  description?: string
  required: boolean
} & (
  | { type: 'checkboxes'; options: string[] }
  | { type: 'short-answer' | 'paragraph' | 'minecraft-skin' | 'number'; placeholderText?: string }
  | {
      type: 'button'
      buttonText: string
      link: string
    }
)

export type Section = {
  sectionTitle: string
  description?: string

  questions: Question[]
}

export type FormInfo = {
  submissionTime: number

  answers: {
    [key: string]: string | { [key: string]: boolean }
  }
}

export type Block = {
  title: string
  paragraphs: React.ReactNode[]
}

export type BlockToggle = {
  title: string
  description?: string
} & (
  | { controlType: 'button'; buttonText: string; click: () => void }
  | { controlType: 'switch'; toggleOn: () => void; toggleOff: () => void }
  | { controlType: 'message'; message: string }
)

export type Checks = ((answers: {
  [key: string]: string
}) => string | undefined | Promise<string | undefined>)[]

export type SaveData = {
  minecraftUuid: string
  userUuid: string
}
