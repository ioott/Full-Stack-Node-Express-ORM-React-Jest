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
      curr.price * curr.quantidade) + acc, 0);
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
      quantidade: inputValue,
    };
    const exists = this.items.find((item) => item.id === obj.id);
    if (!exists) {
      this.newItem(obj);
    } else if (!!exists && obj.quantidade > 0) {
      this.updateItem(obj);
    } else {
      this.deleteItem(obj);
    }
  }

  addItem(price) {
    const sum = Number(this.total) + Number(price);
    const value = Number(sum.toFixed(2));
    this.setTotal(value);
  }

  rmItem(price) {
    const sub = Number(this.total) - Number(price);
    const value = Number(sub.toFixed(2));
    this.setTotal(value);
  }
}
