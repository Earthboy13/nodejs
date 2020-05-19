const uri = 'mongodb+srv://Earthboy13:0E23C784@nodejs-db-orfyf.gcp.mongodb.net/nodejs?retryWrites=true&w=majority',
      express = require('express'), 
      path = require('path'), 
      bodyParser = require('body-parser'), 
      adminRoutes = require('./routes/admin'),
      authRoutes = require('./routes/auth'), 
      mainRoutes = require('./routes/main'),
      shopRoutes = require('./routes/shop'),
      errorControl = require('./controllers/errors'),
      csrf = require('csurf'),
      flash = require('connect-flash'),
      multer = require('multer');
      rootDir = require('./util/path'),
      mongoose = require('mongoose'),
      session = require('express-session'),
      MongoDBStore = require('connect-mongodb-session')(session),
      User = require('./models/user')
     ;


const app = express(),
      store = new MongoDBStore({
        uri: uri,
        collection: 'sessions'
      }),
      csifProtection = csrf()
      fileStorage = multer.diskStorage({
          destination: (req, file , cb) => {
            cb(null, 'images');
          },
          filename: (req, file, cb) => {
              let time = (new Date()).toISOString();
              time = time.split(':')[0] + '-' +time.split(':')[1] ;
              console.log(time);
              console.log(typeof time);
              cb(null, time + '--' + file.originalname);
          }
      });
      fileFilter = 
          (req, file, cb) => {
              if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg')
                cb(null, true);
              else
                cb(null, false);
          };

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('img'));
app.use(express.static(path.join(rootDir, 'public')));
app.use('/images',express.static(path.join(rootDir, 'images')));
app.use(session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: false,
    store: store
}));
//
app.use(csifProtection);
app.use(flash());

app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use((req, res, next) => {
    if (!req.session.user) {
        //req.session.isLoggedIn = false;
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            if (!user) {
                //req.session.isLoggedIn = false;
                return next();
            }
            //req.session.isLoggedIn = true;
            req.user = user;
            next();
        })
        .catch(err => {
            console.log(err);
           // next(new Error(err));
        });
});



app.use(authRoutes.routes);

app.use("/admin", adminRoutes.routes);
app.use(shopRoutes.routes);
app.use(mainRoutes.routes);

app.get('/500', errorControl.somethignWentWrong);

app.use(errorControl.notFound);

app.use((error, req, res, next) => {
    //res.status(error.httpStatusCode).reder
    console.log(error);
    res.status(500).render('500', { docTitle: "Oops", path: '', isLoggedIn: false });
});

mongoose
.connect(
    uri
    , { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
)
.then(() => {
    console.log('Connected');
    console.log('Site up.');
    app.listen(80);
})
.catch(err => { console.log(err); });

/*
Product.belongsTo(User, { constranits: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

let u;

db
.sync()
//.sync({ force: true })
.then(() =>{
        return User.find();
        }).then( users =>{ 
            //console.log(result);
            if (!users)
                return User.create({
                    username: 'user',
                    first_name: 'Max',
                    last_name: 'teach',
                    email: 'fake@email.com',
                    dob: '1982-12-01'
                });
            return Promise.resolve(user);      
        }).then(user =>{
            u = user;
            return user.getCart()
        }).then(cart => {
            //console.log(cart);
            if (cart === null)
                return u.createCart().then(() => app.listen(8080)).catch(err => {console.log(err);});
           
        }).catch(err =>{
            console.log(err);
        });
*/

