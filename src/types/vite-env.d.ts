/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="vite/client" />

type PDFFile = string | File | null

interface CVDataType {
  created_at: string
  matching_score?: {
    technical_score: number
    expreience_score: number
    overall_score: number
  }
  cv_content: string
  file_cv_name: string
  matched_status: boolean
  apply_jd_id: string
  file_cv_url: string
  matched_result: any
  id_cv: string
  apply_position: string
}

interface JobDataType {
  created_at: string
  have_question_tests: boolean
  is_generate_question_tests: boolean
  jd_text: string
  is_generate_question_tests: boolean
  jd_summary: string
  id_question_tests: null
  position_applied_for: string
  id_jd: string
}

interface MatchDto {
  id_jd: string
  id_cv: string
  config_score: any
}

type Question = {
  id: string | number
  question: string
  choices?: string[]
  explanation: string
  answer: string
  level: string
  domain: string
}

type QuestionTestsData = {
  created_at: string
  question_tests_url: string
  question_tests_description: string
  question_tests_file_name: string
  id_question_tests: string
}

type QuestionMatch = {
  question_tests_data: QuestionTestsData
  match_score: number
  data_question_tests_json?: {
    data: Question[]
    __count__: number
  }
}

type ConfigScore = {
  education_score_config: {
    W_education_score: number
  }
  language_score_config: {
    W_language_score: number
  }
  technical_score_config: {
    W_technical_score: number
  }
  experience_score_config: {
    W_experience_score: number
    relevance_score_w: number
    difficulty_score_w: number
    duration_score_w: number
  }
}
