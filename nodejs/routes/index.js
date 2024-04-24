var express = require('express');
var router = express.Router();
const Custromer = require('../Models/Customer')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/create', async function (req, res) {
  try {
    console.log(req);
    const { email, name } = req.body;

    const checkEmail = await Custromer.countDocuments({ '$or': [{ email: email }, { name: name }] })

    if (checkEmail == 0) {
      await Custromer.create(req.body).then((result) => {
        return res.json({ status: true, message: "New Customer added successfully" })
      }).catch((err) => {
        return res.json({ status: false, message: "Some error occured" })
      });

    } else {
      return res.json({ status: false, message: "name or email is already exists" })
    }

  } catch (error) {
    console.log(error);
    return res.json({ status: false, message: "Some error occured" })
  }
})

router.post('/update', async function (req, res) {
  try {
    console.log(req.body);
    const { email, name, id } = req.body;

    const checkEmail = await Custromer.countDocuments({ id: { '$ne': id },deleteStatus : 0 ,'$or': [{ email: email }, { name: name }] })

    console.log(checkEmail,"checkEmail");

    if (checkEmail == 0) {
      await Custromer.updateOne({ 'id': id }, { '$set': req.body }).then((result) => {
        return res.json({ status: true, message: "New Customer update successfully" })
      }).catch((err) => {
        return res.json({ status: false, message: "Some error occured" })
      });

    } else {
      return res.json({ status: false, message: "name or email is already exists" })
    }


  } catch (error) {
    return res.json({ status: false, message: "Some error occured" })
  }
})


router.post('/delete', async function (req, res) {
  try {
    const { unqiueid, status } = req.body;

    const validCheck = await Custromer.countDocuments({ id: unqiueid })

    if (validCheck == 1) {
      await Custromer.updateOne({ 'id': unqiueid }, { '$set': { deleteStatus: status } }).then((result) => {
        return res.json({ status: true, message: "New Customer Delete Successfully" })
      }).catch((err) => {
        return res.json({ status: false, message: "Some error occured" })
      });

    } else {
      return res.json({ status: false, message: "Invaild Customer" })
    }


  } catch (error) {
    return res.json({ status: false, message: "Some error occured" })
  }
})

router.post('/view', async function (req, res) {
  console.log('check view')
  try {
    const { page, per_page } = req.body;
    const skip = (page - 1) * per_page;
    const limit = +per_page;
    const sortData = { createdAt: -1 };

    await Promise.all([
      Custromer.find({deleteStatus :{$ne : 1}}).sort(sortData).skip(skip).limit(limit).exec(),
      Custromer.countDocuments().exec(),
    ]).then(([customerDeatils, customerCount]) => {
      return res.json({ status: true, message: "", details: {data:customerDeatils, count: customerCount}, })
    }).catch((err) => {
      return res.json({ status: false, message: "Some error occured" })
    });

  } catch (error) {
    return res.json({ status: false, message: "Some error occured" })
  }
})
module.exports = router;
