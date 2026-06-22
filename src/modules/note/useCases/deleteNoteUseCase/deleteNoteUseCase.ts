import { NoteNotFoundException } from '../../exceptions/NoteNotFoundException';
import { NoteWithoutPermissionException } from '../../exceptions/NoteWithoutPermissionException';
import { NoteRepository } from '../../repositories/noteRepository';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

interface DeleteNoteRequest {
  noteId: string;
  userId: string;
}

export class DeleteNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute({ noteId, userId }: DeleteNoteRequest) {
    const note = await this.noteRepository.findById(noteId);

    if (!note) throw new NoteNotFoundException();

    if (note.userId !== userId)
      throw new NoteWithoutPermissionException({
        actionName: 'deletar',
      });

    await this.noteRepository.delete(noteId);
  }
}