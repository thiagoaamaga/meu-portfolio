# Portfólio Website

## Como modificar conteúdo do site?

Dentro da pasta `public` tem um arquivo chamado `manifest.json`, ao abrir esse arquivo você irá encontrar informações
mostradas no website. Ao modificá-las será refletido no site.

## Como adicionar projetos?

1. Primeiramente crie uma pasta dentro da pasta `projetos` e adicione as imagens dentro da pasta.
2. No arquivo `public/manifest.json`, terá uma lista com os projetos, basta adicionar o nome, e a seguir as imagens no
   seguinte formato:

```json
   {
      "nome": "NOME",
      "imagens": [
         "projetos/PASTA/ARQUIVO.png"
      ]
  },
```

**IMPORTANT**: Devido à um bug no GitHub, para atualizar clique aqui: [ATUALIZAR](#https://thiagoaamaga.github.io/meu-portfolio/index.html)