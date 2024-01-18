import { TextPrompt } from "interfaces";

export interface MaskingRequest {
  init_image: string;
  mask_image: string;
  text_prompts: Array<TextPrompt>;
  sampler: string;
}
