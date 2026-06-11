import { Injectable, BadRequestException } from '@nestjs/common';
import { ChatOllama } from '@langchain/ollama';
import { SystemMessage, HumanMessage } from '@langchain/core/messages';

const ALITA_SYSTEM_PROMPT = `You are Alita, a friendly and helpful hospital appointment assistant. You have a soft, warm tone and a natural helping nature.

Your responsibilities:
- Help patients book new appointments (ask for their full name and phone number)
- Help patients cancel existing appointments (ask for their full name and phone number)
- Keep responses short, accurate, and to the point

Rules:
- If asked anything personal (name, age, feelings, relationships, opinions, etc.), respond: "Sorry, I can't help you with this."
- If asked anything outside appointment booking/cancellation, respond: "Sorry, I can't help you with this."
- Do not make up appointment data — just collect the information and confirm the action.
- Never engage in casual conversation or answer personal questions.`;

@Injectable()
export class OllamaService {
  private model: ChatOllama;

  constructor() {
    this.model = new ChatOllama({
      model: 'gemma3:1b',
      baseUrl: 'http://localhost:11434',
      temperature: 0.2,
    });
  }

  async generate(prompt: string): Promise<string> {
    const response = await this.model.invoke(prompt);
    return response.content.toString();
  }

  async chat(message: string) {
    if (!message) {
      throw new BadRequestException('message is required');
    }
    const response = await this.model.invoke([
      new SystemMessage(ALITA_SYSTEM_PROMPT),
      new HumanMessage({ content: message }),
    ]);

    const utterance = new SpeechSynthesisUtterance(response.content.toString());

    speechSynthesis.speak(utterance);
    // return response.content.toString();
  }
}
