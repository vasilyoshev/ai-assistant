import { TextPrompt } from "interfaces";

export interface GenerationRequest {
  text_prompts: Array<TextPrompt>;
  sampler: string;
}
