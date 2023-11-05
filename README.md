# 🐋 Docker for beginners

>Disclaimer: This is more of a practical repository than a tutorial. I will not go into the details of how Docker works, but rather how to use it. If you dont understand something, please refer to the [official documentation](https://docs.docker.com/).

## 📖 Resources

- [cheat-sheet](https://docs.docker.com/get-started/docker_cheatsheet.pdf)
- [docker-in-100seconds](https://www.youtube.com/watch?v=Gjnup-PuquQ)

## 📚 Table of Contents

1. Downloading Docker
2. Running your first container
3. Building your own image
4. Docker Compose
5. Docker Hub

## 📥 Downloading Docker

Docker is available for Windows, Mac and Linux. You can download it [here](https://www.docker.com/products/docker-desktop).

## 🏃‍♂️ Running your first container

After installing Docker, you can run your first container by running the following command:

```bash
docker run hello-world
```

This will download the image `hello-world` from Docker Hub and run it. You should see the following output:

```bash
Hello from Docker!
This message shows that your installation appears to be working correctly.
```

## 🏗 Building your own image

Now that you have run your first container, you can build your own image. To do so, you need to create a `Dockerfile` in the root of your project. This file will contain the instructions to build your image. For example, if you want to create a simple web server with Node.js, you can use the following `Dockerfile`:

```dockerfile
FROM node:alpine3.18
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

This file will tell Docker to use the `node:12-alpine` image as a base, create a directory `/app`, copy the `package.json` and `package-lock.json` files to the `/app` directory, install the dependencies, copy the rest of the files to the `/app` directory, expose the port `3000` and run the command `npm start` when the container starts.

Now that you have created the `Dockerfile`, you can build the image by running the following command:

```bash
docker build -t my-nodejs-app .
```

This will build the image and tag it as `my-nodejs-app`. You can now run the container by running the following command:

```bash
docker run -p 3000:3000 my-nodejs-app
```

This will run the container and map the port `3000` of the container to the port `3000` of your machine. You should now be able to access the web server at `http://localhost:3000`.

## 🐳 Docker Compose

Docker Compose is a tool for defining and running multi-container Docker applications. You can use it to run multiple containers at once. For example, if you want to run a web server and a database, you can use the following `docker-compose.yml` file:

```yaml
version: "3.8"
services:
  web:
    build:
        context: .
        dockerfile: Dockerfile ## We use the Dockerfile we created earlier
    ports:
      - "3000:3000"

  ## To read about the postgres image, go to https://hub.docker.com/_/postgres
  db:
    image: postgres:12-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: mydb
    volumes:
      - db-data:/var/lib/postgresql/data
```

You can now run the containers by running the following command:

```bash
docker compose up -d
```

This will run the containers in the background. You can now access the web server at `http://localhost:3000` and the database at `localhost:5432`.

## 📦 Docker Hub

Docker Hub is a repository for Docker images. You can use it to store your images and share them with others. To push your image to Docker Hub, you need to create an account and login to Docker Hub by running the following command:

```bash
docker login
```

You can now push your image to Docker Hub by running the following command:

```bash
docker push <username>/<image-name>
```

You can now pull your image from Docker Hub by running the following command:

```bash
docker pull <username>/<image-name>
```