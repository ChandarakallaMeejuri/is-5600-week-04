const autoCatch = require('./lib/auto-catch')
const path = require('path')
const Products = require('./products')
 

function handleRoot (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
  }

async function listProducts (req, res) {
 
    const { offset = 0, limit = 25, tag } = req.query

    try {
        res.json(await Products.list({
          offset: Number(offset),
          limit: Number(limit),
          tag
        }))
      } catch (err) {
        res.status(500).json({ error: err.message })
      }
    }
  


async function getProduct (req, res, next) {

  const { id } = req.params

  try {
    const product = await Products.get(id)
    if (!product) {
      return next()
    }

    return res.json(product)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

async function createProduct (req, res) {
  console.log('request body:', req.body)
  res.json(req.body)
}

async function deleteProduct(req, res) {
  const { id } = req.params;
  console.log(`Product with ID ${id} deleted`);
  res.status(202).json({ message: `Product with ID ${id} deleted` });
}


async function updateProduct(req, res) {
  const { id } = req.params;
  console.log(`Product with ID ${id} updated:`, req.body);
  res.status(200).json({ message: `Product with ID ${id} updated`, updatedData: req.body });
}

module.exports = autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  deleteProduct, 
  updateProduct
});
