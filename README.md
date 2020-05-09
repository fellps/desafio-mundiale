# Desafio Mundiale
Desafio proposto pela Mundiale. Trata-se de um Crawler capaz de buscar uma lista de produtos no Mercado Livre.

## Endereço para testes
  - https://cryptic-tundra-10398.herokuapp.com/v1/search
  - Documentação: https://cryptic-tundra-10398.herokuapp.com/docs

## Instalação e configuração
  1. O projeto utiliza variáveis de ambiente, renomeie o arquivo **.env.example** para **.env**
  2. Rode o comando: **docker-compose up**
  3. [**OPCIONAL**] O projeto utiliza a técnica de **Memoization** juntamente com o **Redis** para criar caches de consultas. Caso queira ativar essa função, siga os seguintes passos:
  - No arquivo **.env** habilite a variável **REDIS_ENABLED=1**
  - Será necessário configurar a URL de conexão com o Redis. Para isso, rode o comando **docker network inspect crawler_backend**
      e verifique o IP em que o Redis está executando. No arquivo **.env** altere a variável **REDIS_URI** para o seu endereço de IP. Se necessário, rode novamente o comando **docker-compose up**

  Para realizar testes, envie requisições ao endpoint:
  ```
  POST 
  http://localhost:3000/v1/search
  
  BODY 
  {
    "search": "copo",
    "limit": 2000
  }
  ```

## Documentação
  O projeto está utilizando o **Swagger** para definição e documentação das rotas, validação dos campos de entrada e versionamento da API. O Swagger disponibiliza uma documentação que pode ser acessada via browser no endereço: 
  ```
  http://localhost:3000/docs
  ```

  ![doc](https://user-images.githubusercontent.com/2119725/81439389-b04f1d80-9144-11ea-88db-99ae26c83f09.png)

## Logs
  O projeto utiliza o **Winston** para logar erros, warnings, infos etc. O mesmo disponibiliza um canal de transporte que pode ser facilmente alterado para gravar em arquivos ou banco de dados. 
  A API está utilizando o Winston para gravar os logs em arquivo e console.
  
  ![logs](https://user-images.githubusercontent.com/2119725/81441399-14271580-9148-11ea-9b9d-188e6a8a3e8b.png)


## Testes automatizados
  Para executar os testes automatizados, rode o comando:
```javascript
  yarn test
```
![testes](https://user-images.githubusercontent.com/2119725/81439039-1f784200-9144-11ea-80b1-4a5d4ed6c277.png)

## Testes de performance
  Em testes realizados localmente, os resultados obtidos estão descritos abaixo:

```javascript
  Para 100 produtos -> 1.9 segundos
  Para 200 produtos -> 2.2 segundos
  Para 500 produtos -> 3.1 segundos
  Para 1000 produtos -> 4.2 segundos
  Para 2000 produtos -> 7.6 segundos
  
  Com cache ativado para 2000 produtos: 47 ms
```
  
Termos utilizados nos testes: { seach: "copo", limit: x }

## Técnicas para ganho de performance
  - Como mencionado anteriormente, o projeto utiliza a técnica de Memoize para criar um cache em memória das requisições por um períodos de 60 segundos.
  - Outra técnica aplicada é o de processamento de requisições em paralelo com o auxílio do **Promise.all()**. Como sabemos o limite de produtos para retornar na busca,
  basta dividir o limite por 50 e aplicar o **Math.ceil()**, com isso saberemos o total de páginas que devemos pesquisar em paralelo para montar a nossa resposta. Como pode ser 
  visto nos testes de performance, o resultado se mostrou satisfatório.
  - Foram realizados testes de performance entre o **Axios**, **Request** e o **Req-Fast**. O Req-Fast demonstrou-se consideravelmente mais rápido que os demais.
  - Foram realizados testes entre o **Puppeteer** e o **Cheerio**. Para o desafio proposto, sem dúvidas o Cheerio foi a melhor escolha.

## Mais informações sobre o código
- Versão utilizada do Node.js: 12.16.3 LTS
- Versão utilizada do Redis: 6.0.1
- A aplicação faz uso do **eslint** para padronização do código.
- A aplicação utiliza padronização de mensagens de retorno de erro, sucesso etc.

## Curiosidades
  O Mercado Livre possui um limite de 40 páginas e um total de 2000 produtos para busca. Com isso temos 2000/40 = 50. Número utilizado anteriormente para o calculo de paginação.
