// This file demonstrates the Command Pattern in JavaScript.
// Each action (place, track, cancel order) is encapsulated as a Command object with its own execute logic.
// The OrderManager class maintains an orders array and delegates actions to Command instances via its execute method.
// This approach decouples the request for an action from its execution, making the code more flexible and extensible.

class OrderManager {
  constructor() {
    this.orders = [];
  }

  execute(command, ...args){
    return command.execute(this.orders, ...args);
  }
}

 function PlaceOrderCommand(order, id){
    return new Command((orders) => {
      orders.push({id, order});
      return `You have successfully ordered ${order} (${id})`;
    })  
  }
 function CancelOrderCommand(id) {
  return new Command(orders => {
    orders = orders.filter(order => order.id !== id);
    console.log(`You have canceled your order ${id}`);
  });
}

function TrackOrderCommand(id) {
  return new Command(() =>
    console.log(`Your order ${id} will arrive in 20 minutes.`)
  );

}
class Command{
  constructor(execute){
    this.execute = execute;
  }
}
 
 

const manager = new OrderManager();


manager.execute(new PlaceOrderCommand("Pad Thai", "1234"));

manager.execute(new TrackOrderCommand("1234"));

manager.execute(new CancelOrderCommand("1234"));