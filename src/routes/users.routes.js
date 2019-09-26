const { Router } = require('express');
const router = Router();

router.get('/users/signin', (req, res, next) => {
    res.render('users/signin')
});

router.get('/users/signup', (req, res, next) => {
    res.render('users/signup')
});

// router.post('/users/signin', (req, res, next) => {
//     res.send('about')
// }); 

// router.post('/users/signup', (req, res, next) => {
//     res.send('about')
// });


module.exports = router;