const express = require('express');

const router = express.Router();

// home render
router.get('/', (req,res) => {
   res.render('home',
      {

      }
   );
});