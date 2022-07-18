<h1 align="center">:musical_note: Labenu Music Awards :musical_note:</h1>

<br>

Projeto final do módulo de BackEnd do Bootcamp da Labenu.
Foi solicitado o desenvolvimento de um sistema interno de um novo festival de música, o LAMA, que ocorrerá em um final de semana na Sexta, Sábado e Domingo. Nele, fomos desafiados a montar uma api com os seguintes endpoints:

- **Cadastro**
- **Login**
- **Registrar Banda**
- **Visualizar detalhes da banda**
- **Adicionar show a um dia**
- **Pegar todos os shows de uma data**

## ⚙️ Funções e regras de negócio desenvolvidas:

- No *Cadastro*, temos 2 tipos de usuários com autorizações diferentes, um usuário NORMAL e um usuário ADMIN. Estes são diferenciados por um token personalizado gerado pela biblioteca JWT (json-web-token), além e um ID aleatório gerado pela biblioteca UUID.
- No *Login* é gerado um novo token, também personalizado de acordo com o papel do usuário (normal ou admin).
- Para *Registrar Banda* é preciso ser um usuário ADMIN. Além disso, não pode existir 2 ou mais bandas com mesmo nome, nem mesmo responsável.
- Qualquer usuário pode *Visualizar detalhes da banda* passando o ID da Banda ou apenas o Nome da banda.
- Para *Adicionar show a um dia* é preciso ser um usuário ADMIN, tendo que ter cuidado para que o horário seja válido (entre 08h e 23h) e para que já não haja show marcado no mesmo horário.
- Qualquer usuário pode *Pegar todos os shows de uma data*, passando os dias de festival: SEXTA, SÁBADO OU DOMINGO.

## :books: Documentação da API:
- [Acesse completa aqui](https://documenter.getpostman.com/view/20352183/UzQvsQfU)

## :desktop_computer: Linguagens e Bibliotecas usadas:
- Typescript;
- Node;
- Express;
- Knex;
- Cors;
- JWT;
- UUID;

## :woman_technologist: :technologist: Desenvolvido por:
- [Laura Amancio](https://github.com/lauraamancio)
- [Lis Ribeiro](https://github.com/lisfribeiro)
- [Sergio Dias](https://github.com/Sergiopdias)
