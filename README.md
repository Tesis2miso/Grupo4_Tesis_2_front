# Proyecto de Grado 2: Web frontend dermoapp

## Desplegar a heroku

### Login a Heroku

```bash
heroku login
```

### Agregar remote

```bash
heroku git:remote -a grupo4-tesis-front
```

### Desplegar

```bash
git push heroku main
```

## Links de interes
- SonarCloud: https://sonarcloud.io/project/overview?id=abaron10_Grupo4_Tesis_2_front

## ENV File

Create env file with the following contents

```
REACT_APP_BASE_PATH=https://dermoapp-proxy.herokuapp.com
REACT_APP_BASE_PATH=http://localhost:8008
```

## Run tests with coverage

```bash
npm test -- -u --watchAll=false --coverage
```