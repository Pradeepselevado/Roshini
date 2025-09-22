const CategoryModel = require('../Models/categoryModels');
const path = require('path');
const multer = require('multer');

const generateUniquecategoryId = async () => {
    let counter = 1;
    let newCategoryId;

    do {
        // Pad the counter with leading zeros and concatenate with 'A'
        newCategoryId = `C${counter.toString().padStart(2, '0')}`;
        counter++;
    } while (await CategoryModel.findOne({ category_id: newCategoryId }));

    return newCategoryId;
};


const getAllCategory = async (req, res) => {
    try {
        const categories = await CategoryModel.find()
    
        res.status(200).json(categories);
    } catch (error) {
        console.error("Error getting categories", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};



// Get a Category by ID
const getCategoryById = async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
      const category = await CategoryModel.find( {category_id :categoryId})
      
      if (!category) {
          return res.status(404).json({ error: "category not found" });
      }

      res.status(200).json(category);
  } catch (error) {
      console.error("Error getting category by ID", error);
      res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};





// Create a new category with a dynamically generated category_id
const createCategory = async (req, res) => {
    const { category_name, category_image } = req.body;

    try {
        // Generate a unique category_id (if needed)
        const newcategoryId = await generateUniquecategoryId();

        // Create a new category with the generated category_id
        const newcategory = new CategoryModel({
            category_id: newcategoryId,
            category_name,
            category_image
        });
        const savedcategory = await newcategory.save();
        
        res.status(201).json(savedcategory);
    } catch (error) {
        console.error("Error creating category", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

//update method

const updateCategory = async (req, res) => {
  const categoryId = req.params.categoryId; // Assuming you have the category ID in the URL parameter
  const { category_name, category_image } = req.body;

  try {
      // Find the existing category by ID
      const existingCategory = await CategoryModel.findOne({ category_id: categoryId });

      if (!existingCategory) {
          return res.status(404).json({ error: "Category not found" });
      }

      // Update the category fields
      existingCategory.category_name = category_name || existingCategory.category_name;
      existingCategory.category_image = category_image || existingCategory.category_image;

      // Save the updated category
      const updatedCategory = await existingCategory.save();

      res.status(200).json(updatedCategory);
  } catch (error) {
      console.error("Error updating category", error);
      res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};



const deleteCategoryById = async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
      // Find and delete the category by ID
      const deletedCategory = await CategoryModel.findOneAndDelete({ category_id: categoryId });

      if (!deletedCategory) {
          return res.status(404).json({ error: "Category not found" });
      }

      res.status(200).json({ message: "Category deleted successfully", deletedCategory });
  } catch (error) {
      console.error("Error deleting category by ID", error);
      res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};





const categoryUploadImage = async (req, res, next) => {
    try {
      let UploadedfileName = '';
      const filePath = path.join(__dirname + '/CategoryImageUpload/Image');
      const Storage = multer.diskStorage({
        destination: filePath,
        filename: (req, file, cb) => {
          const originalname = file.originalname;
          const fileExtension = path.extname(originalname); // Get the file extension
          const uniqueSuffix = Date.now(); // Generate a unique suffix
          const newFilename = path.basename(originalname, fileExtension) + '_' + uniqueSuffix + fileExtension; // Construct the new filename
          UploadedfileName = '/CategoryImageUpload/Image/' + newFilename;
          cb(null, newFilename);
        }
      });
  
      const upload = multer({ storage: Storage }).single('category_image');
      upload(req, res, async function (err) {
        if (err) {
          // Handle upload error
          return res.status(500).send('Error uploading file.' + err);
        }
        res.json({ Category_image: UploadedfileName }); // Send a JSON response
      });
    }
    catch (error) {
      res.status(500).json({ error: "Error sample Image Upload" + error });
    }
  };

module.exports = {createCategory, getAllCategory,getCategoryById, updateCategory,deleteCategoryById, categoryUploadImage}