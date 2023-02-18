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
REACT_APP_BASE_PATH=http://dermoapp-server.eba-u5i6h72y.us-east-1.elasticbeanstalk.com
REACT_APP_BASE_PATH=http://localhost:8008
```
