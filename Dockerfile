FROM mhart/alpine-node:10.22 as build
WORKDIR /app
COPY package*.json index.js go.sh ./
RUN npm init -y && npm install discord.js@latest
RUN npm prune

FROM mhart/alpine-node:slim-10.22
WORKDIR /app
COPY --from=build /app .
# RUN npm install discord.js@11.6.3
# RUN npm install discord.js@latest

# ENTRYPOINT ["sh"]
ENTRYPOINT ["/bot/go.sh"]
