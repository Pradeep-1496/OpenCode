import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { OllamaService } from './ollama.service';

@Controller('ai/ollama')
export class OllamaController {
  constructor(private readonly ollamaService: OllamaService) {}

  @Post('generate')
  async generate(@Body('prompt') prompt: string): Promise<{ result: string }> {
    if (!prompt) throw new BadRequestException('prompt is required');
    const result = await this.ollamaService.generate(prompt);
    return { result };
  }

  @Post('alita')
  async alita(@Body('message') message: string): Promise<{ result: string }> {
    if (!message) throw new BadRequestException('message is required');
    const result = await this.ollamaService.chat(message);
    return { result };
  }
}
