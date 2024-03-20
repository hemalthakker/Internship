const foodItems = require("../models/FoodItems");
class ItemController {
  //addItem
  async addItem(req, res) {
    const categoryname = req.body.categoryname;
    const name = req.body.name;
    const img = req.body.img;
    const options = req.body.options;
    const description = req.body.description;
    try {
      await foodItems.create({
        categoryname: categoryname,
        name: name,
        img: img,
        options: options,
        description: description,
      });
      res.json({ sucess: true });
    } catch (error) {
      console.log(error);
      res.json({ sucess: false });
    }
  }
}

module.exports = new ItemController();
