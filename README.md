# hiring-Coders-desafio02
Desafio 02 do programa Hiring Coders de 2021, desenvolvimento de um ecommerce com cadastro de usuários e carrinho de produtos

## Deploy no Netlify
* https://paddockgamer.netlify.app/

## Funcionalidades
* O site é responsivo, reduzindo de 3 itens por fileira para 2 ou 1 dependendo do tamanho de tela do dispositivo
* A navbar colapsa no mobile com itens podendo ser acessados pelo "botão sanduíche", dispondo dos itens agora na vertical
* Os produtos são lidos a partir de um `data.json`
* Objeto que representa um usuário: `id, email, senha, nome, endereço, array com itens no carrinho`
  * Ao adicionar ou remover item do carrinho, ele já é automaticamente atualizado no localstorage, assim os dados perseveram mesmo após fechar uma sessão
  * A chave de cada string que representa o objeto de usuário no localstorage é identificada por `user+<email_do_usuario>`
* Ao tentar cadastrar um usuário já cadastrado, o site informa isto
* Ao tentar logar, se o usuário não existir no localstorage, informa que email/senha está errado e pede para tentar novamente, caso exista o login é efetuado com sucesso
* Estando logado, o sistema identifica o usuário com um "Olá, <email_do_usuario>", alterando botões de cadastro e login para um que mostra o carrinho e outro que faz logout
* Ao visualizar o carrinho, o usuário pode remover itens dele e ver o valor total adicionado até então
* Trata-se de um esboço, portanto a "autenticação" é feita de maneira direta, salvando a senha em plain-text no localstorage. Isto é obviamente inseguro, apenas para efeitos demonstrativos
