import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import * as path from 'path';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    // Força o caminho absoluto físico apontando direto para a pasta prisma da raiz
    const dbPath = path.resolve(process.cwd(), 'prisma', 'dev.db');

    // Inicializa o adaptador usando o caminho exato gerado pelo sistema operacional
    const adapter = new PrismaBetterSqlite3({ url: dbPath });
    
    super({ adapter });
  }
}