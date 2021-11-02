const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categroiesData = await Category.findAll({
      include: [{ model: Product}]
    });
    res.status(200).json(categroiesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoriesData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoriesData) {
      res.status(404).json({ message: 'No categories with that ID!'});
      return;
    };

    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body)
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(400).json(err)
  }

});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
    category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      }
    }
  )
  //sends the updated category as a json response
  .then((updatedCategory) => {
    res.status(200).json(updatedCategory);
  })
  .catch((err) => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((deletedCategory) => {
    res.status(200).json(deletedCategory);
  })
  .catch((err) => res.status(500).json(err));
});

module.exports = router;
