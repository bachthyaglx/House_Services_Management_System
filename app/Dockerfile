FROM denoland/deno:alpine-1.26.2

EXPOSE 7777

WORKDIR /app

COPY . .

RUN deno cache app.js

CMD [ "run", "--watch", "--allow-net", "--allow-read", "--allow-write", "--allow-env", "--no-check", "run-locally.js" ]


