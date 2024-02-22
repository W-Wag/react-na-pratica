# React na prática: Listagem de dados e Mutação de dados
![image](https://github.com/W-Wag/react-na-pratica/assets/108705985/b054540f-c2d6-4b56-8712-fd9b5f52fe4f)


## Sobre o Projeto
O projeto é uma listagem de tags de videos aonde as funcionalidades da aplicação vai de criar uma tag, visualizar uma tag, filtrar por um nome de uma tag e **deletar uma tag**(feito após o evento). Nesse projeto você terá um design limpo com paginação
e utilizando da biblioteca **json-server** para simular uma API que armazena os dados utilizados na aplicação.


## O que foi feito no evento
Nesse repositório contém um projeto onde foi abordado os conceitos de listagem de dados e mutação de dados ambos exercendo boas práticas. Na primeira aula envolvendo a listagem de dados foi ensinado como utilizar da biblioteca **React-Query** para fazer
a listagem de dados utilizando do `useQuery()` para fazer o fetch de dados, além de mostrar como funciona o **URL state**, **HTTP state** e de ver a funcionalidade de armazenar o cache do dados no navegador do usuário. Já na segunda aula foi a vez de
utilizar do **React-hook-form** para manejar os formulários da aplicação junto ao **Zod** para fazer a tipagem dos dados do formulário, ademais foi utilizado o **useMutation** do react-query para atualizar a lista de tags do projeto assim finalizando as
duas aulas do evento **react na prática** outro evento feito pela **[Rocketseat](https://app.rocketseat.com.br)**.

## O que foi feito por mim após o evento
Ao concluir o evento eu vi que tinha alguns detalhes faltando no projeto concluido no evento, por isso quis fazer minhas próprias alterações na aplicação como:
- Linkar algumas áreas da aplicação tal como o github do professor Diego Fernandes no canto superior direito, a home ao clicar na logo do site e os tabs;
- Desenvolvi um componente simples de `sobre construção` nas tabs que estavam faltando;
- Desenvolvi o botão de opções das tags que agora contém a opção de deletar uma tag;
- Adicionei a opção de pressionar o enter para filtrar as tags antes so sendo possível clicar no botão para fazer a filtragem.

É alguns poucos detalhes a mais.


## Como testar o projeto em sua máquina
Para testar o projeto temos que primeiro clona-lo com o github com o seguinte comando `git clone https://github.com/W-Wag/react-na-pratica.git`, e quando o repositório ser clonado em sua máquina deve-se usar o **npm install** no terminal contendo a pasta
do **app** dentro do repositório para instalar as depêndencias.
Caso você não tenha esse comando e por que é necessário que se instale o [Node.js](https://nodejs.org/en) em sua máquina na versão LTS. Depois de se instalar as depêndencias e necessário iniciar o servidor JSON-SERVER utilizando o comando `npm run server`
iniciado então inicie o projeto em si utilizando `npm run dev` e utilize o endereço mostrado no terminal para executar o projeto no seu navegador, então utilize a aplicação.


## Imagens do Projeto

![image](https://github.com/W-Wag/react-na-pratica/assets/108705985/3a815428-942f-43af-b94b-df7bbb3914d5)

![image](https://github.com/W-Wag/react-na-pratica/assets/108705985/0a45a19f-f37e-47cc-b9f5-e1b092051dd2)

![image](https://github.com/W-Wag/react-na-pratica/assets/108705985/448b5c70-90df-4f52-8964-d8415db039b5)


