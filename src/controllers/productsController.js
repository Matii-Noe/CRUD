const fs = require('fs');
const path = require('path');
const { receiveMessageOnPort } = require('worker_threads');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products');
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let id = req.params.id
		let product = products.find(product => product.id == id)
		res.render('detail', {
			product
		})

	},


	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
		res.redirect('/')
	},

	// Update - Form to edit
	edit: (req, res) => {
		res.render('product-edit-form');
	},
	// Update - Method to update
	update: (req, res) => {
		let id = req.params.id
		let product = products.find(product => product.id == id)
		let image

		if (req.files[0] != undefined){
			images = req.files[0].filename;
		}else {
			image = product.image;
		}

		product = {
			id: product.id,
			...req.body,
			image: image
		}

		let newProduct = products.map(product => {
			if(prod.id == product.id) {
				return prod = {...product}
			}
			return prod
		})

	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;