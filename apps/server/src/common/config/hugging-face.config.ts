import { registerAs } from '@nestjs/config';

export const HUGGING_FACE_CONFIG = 'hugging-face-config';

export default registerAs(HUGGING_FACE_CONFIG, () => ({
  apiKey: process.env.HUGGING_FACE_API_KEY,
  chatModel: process.env.HUGGING_FACE_CHAT_MODEL,
  embeddingsModel: process.env.HUGGING_FACE_EMBEDDINGS_MODEL,
}));
