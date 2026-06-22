import { Note } from '../entities/Note';

type Override = Partial<Note>;

export const makeNote = ({ id, ...override }: Override) => {
  return new Note(
    {
      title: 'Estudar POO',
      userId: '123123',
      description: 'Fazer provas antigas',
      ...override,
    },
    id,
  );
};