export default class Cart {
  constructor([items, setItems], [total, setTotal]) {
    this.items = items;
    this.setItems = setItems;
    this.total = total;
    this.setTotal = setTotal;
  }

  updateTotal(updatedItems) {
    const cart = updatedItems || this.items;
    const newTotal = cart.reduce((acc, curr) => (
      curr.price * curr.quantity) + acc, 0);
    this.setTotal(newTotal);
  }

  newItem(product) {
    const updatedCart = [...this.items, product];
    this.updateTotal(updatedCart);
    this.setItems(updatedCart);
  }

  updateItem(product) {
    const updatedCart = this.items.map((item) => {
      if (item.id === product.id) {
        return product;
      }
      return item;
    });
    this.updateTotal(updatedCart);
    this.setItems(updatedCart);
  }

  deleteItem(product) {
    const updatedCart = this.items.filter((item) => item.id !== product.id);
    this.updateTotal(updatedCart);
    this.setItems(updatedCart);
  }

  handleCart(product, inputValue) {
    const obj = {
      ...product,
      quantity: Number(inputValue),
    };
    const exists = this.items.find((item) => item.id === obj.id);
    if (!exists && obj.quantity > 0) {
      this.newItem(obj);
    } else if (!!exists && obj.quantity > 0) {
      this.updateItem(obj);
    } else {
      this.deleteItem(obj);
    }
  }
}
