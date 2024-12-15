import { IRagHistory } from '@notes-rag/shared';

export class RagHistoryDto implements IRagHistory {
  query: string;
  response: string;
}
