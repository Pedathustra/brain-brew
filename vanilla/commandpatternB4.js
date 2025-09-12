class OrderManager {
  constructor() {
    this.orders = []
  }

  placeOrder(order, id) {
    this.orders.push({id, order})
    return `You have successfully ordered ${order} (${id})`;
  }

  trackOrder(id) {
    return `Your order ${id} will arrive in 20 minutes.`
  }

  cancelOrder(id) {
    this.orders = this.orders.filter(order => order.id !== id);
    return `You have canceled your order ${id}`
  }
}

const manager = new OrderManager();

const resultPlaceOrder = manager.placeOrder("Pad Thai", "1234");
const resultTrackOrder = manager.trackOrder("1234");
const resultCancelOrder =  manager.cancelOrder("1234");

console.log(resultPlaceOrder);
console.log(resultTrackOrder);
console.log(resultCancelOrder);