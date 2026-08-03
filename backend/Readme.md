### PROJETO: WEDDING PASS

tecnlogias usadas:
Prisma ORM, express, typescript

SGBD utilizado: mySQL com MariaDb adapter

inctuçoes:

npm i

configurar .env com padrão

DATABASE_URL=""
DATABASE_USER=""
DATABASE_NAME=""
DATABASE_HOST=""
DATABASE_PORT=

JWT_SECRET=""

npx prisma db seed (para rodar a seed)

npm run dev (para rodar o projeto)

ROTAS DO PROJETO:

//USUARIO 

-LOGIN USUARIO
http://localhost:3000/usuario/login POST

ADMIN:
{
  "email":"admin@wedding.com",
  "senha":"admin123"
}

CERIMONIALISTA:
{
  "email":"admin@wedding.com",
  "senha":"admin123"
}

-LISTAR USUARIOS
http://localhost:3000/usuario/listar GET

//CONVIDADO

-LISTAR CONVIDADOS
http://localhost:3000/convidado/listar GET

-lISTAR ESTATISTICAS DASHBOARD GET
http://localhost:3000/convidado/dashboard

-CRIAR CONVIDADOS
http://localhost:3000/convidado/criar POST

{
  "nome_completo":"",
  "email":"",
  "telefone":"",
  "mesaId":
}

-ATUALIZAR CONVIDADOS
http://localhost:3000/convidado/atualizar/ID PUT

{
  "nome_completo":"Renata Wotter",
  "email":"renatEE.wotter@gmail.com",
  "telefone":"(53)99999-9929"
}

-CHECKIN CONVIDADOS
http://localhost:3000/convidado/checkin/9 PATCH

-DESFAZERCHECKIN CONVIDADOS
http://localhost:3000/convidado/desfazercheckin/ID PATCH

-DELETAR CONVIDADOS
http://localhost:3000/convidado/deletar/ID

//MESA

http://localhost:3000/mesa/listar -GET

