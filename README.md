# linkdiario web app

## Folder/Route Structure 
```ts
 - app -> Home

  - (app) -> (Auth required)
    - admin -> Admin dashboard
    - dashboard -> Users licensed dashboard

  - (client) -> (visible to client without auth)
    - [company_slug]/[product_name] -> Product page
```
---

### v_alpha_riverwood - 01/02/2024

### TODO 
 - Tratar quando houver um erro ao salvar a imagem
 - Corrigir fluxo de update da campanha quando ainda não publicado (redis)
 - Corrigir numeração em quiz/respostas cadastradas