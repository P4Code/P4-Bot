# P4-Bot

## Configuração Node.JS
* Verifique a versão do seu node
* **Dica**: Para administrar mais de 1 versão do node na sua máquina. Use o [NVM](https://www.youtube.com/watch?v=gDJcEt7pPv8) (node version manager)!
```
Versão do NodeJS: 18.20.2
```

## Instale o pacote do ffmpeg
* Este pacote é nescessário para a execução do bot
```
npm i ffmpeg
```

## Configuração .env
```
DISCORD_TOKEN = "YOUR_DISCORD_TOKEN"  
APP_ID = "YOUR_APP_ID"  
PUBLIC_KEY = "YOUR_PUBLIC_KEY"  
YTB_OAUTH = "YOUR_YTB_OAUTH"
```

### DISCORD_TOKEN e APP_ID

`DISCORD_TOKEN (Client Secret)` e o `APP_ID (Application ID)` são encontrado na aba **OAuth2** da sua aplicação no [Discord Developer](https://discord.com/developers/applications "Discord Developer").


### PUBLIC_KEY
`PUBLIC_KEY (Public Key)` **não** é nescessário para o bot funcionar, mas é encotrado na aba **General Information** da sua aplicação no [Discord Developer](https://discord.com/developers/applications "Discord Developer").

### YTB_OAUTH
Para conseguir esta chave de autenticação é nescessario seguir os seguintes passos:

1.  Execute o comando a seguir no terminal do seu projeto:

   ```
   npx --no discord-player-youtubei
   ```

2.  Após isso, você receberá uma mensagem no console como esta, você deverá acessar o link e colar o código recebido no espaço indicado na página do google!

   ```
   Follow this URL: https://www.google.com/device and enter this code: AAA-AAA-AAA
   ```

3. Após realizar estas etapas, você recebera um texto gigante no console, mas relaxa, é apenas o seu `YOUR_YTB_OAUTH`, você deverá copiar **TODA** a string, desde o `access_token` até o `expiry_date` e colar no espaço designado no seu  **.env**.




