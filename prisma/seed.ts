// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Criação de usuário
  const usuario = await prisma.usuario.create({
    data: {
      nome: 'Ana Souza',
      email: 'ana.souza@universidade.edu',
      senha: 'senha123', // lembre-se de usar hash em produção
      departamento: 'Computação',
      curso: 'Engenharia de Software',
      foto_perfil: Buffer.from('foto-de-exemplo', 'utf-8'),
    },
  });

  // Criação de disciplina
  const disciplina = await prisma.disciplina.create({
    data: {
      nome: 'Estruturas de Dados',
    },
  });

  // Criação de professor vinculado à disciplina
  const professor = await prisma.professor.create({
    data: {
      nome: 'Dr. Carlos Henrique',
      departamento: 'Computação',
      disciplinaID: disciplina.id,
    },
  });

  // Criação de avaliação vinculada a professor, disciplina e usuário
  const avaliacao = await prisma.avaliacao.create({
    data: {
      conteudo: 'Excelente professor, explica bem e é muito didático.',
      usuarioID: usuario.id,
      professorID: professor.id,
      disciplinaID: disciplina.id,
    },
  });

  // Criação de comentário na avaliação
  await prisma.comentarios.create({
    data: {
      conteudo: 'Concordo! As aulas são muito boas.',
      usuarioID: usuario.id,
      avaliacaoID: avaliacao.id,
    },
  });

  console.log('✅ Banco populado com dados de exemplo!');
}

main()
  .catch((e) => {
    console.error('Erro ao popular banco:', e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
