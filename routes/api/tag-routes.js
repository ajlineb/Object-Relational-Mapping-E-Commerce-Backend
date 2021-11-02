const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagsData = await Tag.findAll({
      include: [{ model: Product}]
    });
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagsData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'tagged_Product' }],
    });

    if(!tagsData) {
      res.status(404).json({ message: 'No Tag by that ID!'});
      return;
    }

    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    Tag.create({
      tag_name: req.body.product_name,
    })
    .then((newTag) => {
      res.status(200).json(newTag);
    })
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.category_name,
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
  .catch((err) => res.status(400).json(err));
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((deletedTag) => {
    res.json(deletedTag);
  })
  .catch((err) => res.status(500).json(err));
});

module.exports = router;
