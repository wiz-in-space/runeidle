import { observable } from "mobx";
import { Item, ITEMS } from "models/Item/ItemConfig";

interface InventoryItem {
    item: Item,
    amount: number
}
export class InventoryStore {
    @observable public inventory: InventoryItem[] = []

    public constructor() {
        this.loadData();
    }

    public addItem(item: Item, amount: number) {
        let index= this.inventory.findIndex(inv_item => inv_item.item.id === item.id)
        if(index === -1) {
            this.inventory.push({item: item, amount: amount})
        } else {
            this.inventory[index].amount += amount;
        }
    }

    public removeItem(item: Item, amount: number): boolean {

        let index= this.inventory.findIndex(inv_item => inv_item.item.id === item.id)

        if(index === -1 || this.inventory[index].amount < amount) {
            return false
        } 
        else {
            this.inventory[index].amount -= amount;
        }

        return true;
    }

    public checkIfInventoryHasItemCount(items: {item: Item, amount: number}[]) {

        let hasCount = true;

        for(var i = 0; i < items.length; i++) {
            let index= this.inventory.findIndex(inv_item => inv_item.item.id === items[i].item.id)
            let isValid = !(index === -1 || this.inventory[index].amount < items[i].amount)
            if(isValid == false) {
                hasCount = false;
            }
        }

        return hasCount;
    }

    public saveData() {
        Object.keys(ITEMS).forEach(key => {
            let item = this.inventory.find(x => x.item.id === ITEMS[key].id)
            let amount = item ? item.amount : 0;
            localStorage.setItem("inv_" + ITEMS[key].id, amount + '')
        })
    }

    public loadData() {
        Object.keys(ITEMS).forEach(key => {
            let amount = parseInt(localStorage.getItem("inv_" + ITEMS[key].id) || '0');
            if(isNaN(amount) === false && amount !== 0) {
                this.addItem(ITEMS[key], amount)
            }
        })
    }
}