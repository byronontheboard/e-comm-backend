const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: { model: Product, through: ProductTag },
    });
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const tagId = req.params.id;
  try {
    const tag = await Tag.findByPk(tagId, {
      include: { model: Product, through: ProductTag },
    });
    if (!tag) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const tagId = req.params.id;
  try {
    const [updatedRowCount, updatedTags] = await Tag.update(
      { tag_name: req.body.tag_name },
      {
        where: { id: tagId },
        returning: true,
      }
    );
    if (updatedRowCount === 0) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }
    res.status(200).json(updatedTags[0]);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const tagId = req.params.id;
  try {
    const deletedRowCount = await Tag.destroy({
      where: { id: tagId },
    });
    if (deletedRowCount === 0) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;