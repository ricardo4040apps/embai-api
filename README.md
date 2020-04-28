Configuracion por defecto

    Puerto de escucha
        3000    puede ser sustituido poniendolo en la variable de entorno de npm PORT

    Base de datos
        "mongodb://localhost/store-test" puede ser sustituida poniendola en la variable de entorno de npm DATABASE



--------
# Run enviroment
    pm2 start app.json                          for production
    pm2 start app.json --env local              for local tester




Generador
    https://expressjs.com/es/starter/generator.html

Mongose
    https://mongoosejs.com/




passport-jwt
    https://www.npmjs.com/package/passport-jwt
jsonwebtoken
    https://www.npmjs.com/package/jsonwebtoken

that needs param 
    Authorization: token


paginate
    https://github.com/aravindnc/mongoose-paginate-v2


twillio 
    https://www.twilio.com/docs/usage/tutorials/how-to-use-your-free-trial-account#verify-your-personal-phone-number


on my mac
    mongo
        https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/



Mongo permisos
	https://www.youtube.com/watch?v=SY_9zwb29LA
	https://docs.mongodb.com/manual/tutorial/enable-authentication/
    
    commands
        use admin   show users  show roles   db.getUsers()
        db.auth("root", "TXEA2wd2PEDM")



db.auth("myTester", "Entrar")
Mongo user store-test
	myTester
	Entrar

mongo -u root -p TXEA2wd2PEDM
db.auth("root", "TXEA2wd2PEDM")
Mongo user admin
	root
	TXEA2wd2PEDM











Functionality description
    querys
        http://localhost:3000/users?limit=5&page=1&sort=deleted -createdAt
        http://localhost:3000/users?limit=5&page=1&sort=deleted -createdAt&deleted=false&name=jose11111&q=per
        http://localhost:3000/users?limit=5&page=1&sort=deleted -createdAt&deleted=false&name=jose11111&q=tru







HACIENDO






    borrado logico
        prevent actions on deleted registers

    
    usuario unico
    correo unico
    telefono unico
        https://mongoosejs.com/docs/validation.html
    


    dividir rutas
    crear controllers


    probar pre
    crear log
    proteger
    crear versiones
    deleted log???


    Que pasa si err es null en todos los modelos ???
        User.getByUsername(username, (err, user) => {




    remove returned password on save

    queryHelper.processQ 
        spaces, signs, etc

    paginations and all at same time
        query search dosent search in Boolean DbjectId, date, etc

    validacion de si datos son correctos para modelo update


