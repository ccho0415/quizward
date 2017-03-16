# Quizward
> a public quizing application

This node.js app allows users to take quizzess, and make quizzess.

## Quick start

### In order to run a local copy / development version, please make a config/config.json file in the root directory:

*Make sure to also create a database called 'quizward_db' as well.
```json
{
  "development": {
    "username": YOUR_USERNAME,
    "password": YOUR_PASSWORD,
    "database": "quizward_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

### If you have nodemon installed globablly, you can run the app with:
``` shell
$ npm start
```

### To enter test data in the db:
```shell
$ npm run test-db
```

## ERD
![link](.notes/ERD_2.0.png)

## Contributors
* **Alex Rosenkranz** [github](https://github.com/alexrosenkranz)
* **Alan Chu** [github](https://github.com/thechutrain)
* **Alisa Schick** [github](https://github.com/alisaschink)
* **Christine Chong** [github](https://github.com/ccho0415)
