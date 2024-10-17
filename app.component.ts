import { Component, OnInit } from "@angular/core";
import { OrderService } from "./order.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  productName: string = "";
  products: string[] = [];
  orders: { id: number; product: string }[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.loadProducts();
    this.loadOrders();
  }
  // Loads products from the OrderService
  loadProducts() {
    this.products = this.orderService.getProducts();
  }

  // Loads orders from the OrderService
  loadOrders() {
    this.orders = this.orderService.getOrders();
  }

  // Adds a new product to the product list
  addProduct() {
    if (this.productName.trim()) {
      this.orderService.addProduct(this.productName.trim());
      this.productName = "";
      this.loadProducts();
    }
  }
  // Removes a product from the product list
  removeProduct(product: string) {
    this.orderService.removeProduct(product);
    this.loadProducts();
  }

  placeOrder() {
    const order = this.orderService.placeOrder(this.productName.trim());
    if (order) {
      this.orders.push(order);
      this.productName = "";
    } else {
      alert("Product not found");
    }
  }
  // Cancels an existing order based on the order ID
  cancelOrder(orderId: number) {
    this.orders = this.orders.filter((order) => order.id !== orderId);
    this.orderService.cancelOrder(orderId);
  }
}
