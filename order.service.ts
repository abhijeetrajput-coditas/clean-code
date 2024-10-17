import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  private products: string[] = [];
  private orders: { id: number; product: string }[] = [];
  private orderIdCounter: number = 1;

  addProduct(product: string): void {
    if (!this.products.includes(product)) {
      this.products.push(product);
    }
  }

  removeProduct(product: string): void {
    this.products = this.products.filter((p) => p !== product);
  }

  placeOrder(product: string): { id: number; product: string } | null {
    if (this.products.includes(product)) {
      const order = { id: this.orderIdCounter++, product };
      this.orders.push(order);
      return order;
    }
    return null;
  }

  cancelOrder(orderId: number): void {
    this.orders = this.orders.filter((order) => order.id !== orderId);
  }

  getProducts(): string[] {
    return this.products;
  }

  getOrders(): { id: number; product: string }[] {
    return this.orders;
  }
}
