import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  title = "Grocery List";

  items = [
    {
      name: "Milk",
      quantity: 2
    },
    {
      name: "Bread",
      quantity: 1
    },
    {
    name: "Banana",
    quantity: 3
    },
    {
    name: "Sugar",
    quantity: 1
    },
  ];

  AlertController: any;


  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController) {

  }

  async removeItem(item: any, index: any) {
    console.log("Removing Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: "Removing Item - " + index + " ...",
      duration: 3000
    });
    (await toast).present();

    this.items.splice(index, 1);
  }

  addItem() {
    console.log("Adding Item");
    this.showItemPrompt();
  }

  // Code was adjusted to properly output the data, as particular keywords like "any", "await",
  // and "async" appear to be required nowaddays.
  async showItemPrompt() {
    const prompt = await this.alertCtrl.create({
      header: 'Add Item',
      message: 'Enter a name for this item',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name'
        },
        {
          name: 'quantity',
          type: 'number',
          placeholder: 'Quantity'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: (data: any) => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: (data: any) => {
            console.log('Saved clicked', data);
            this.items.push({
              name: data.name,
              quantity: data.quantity
            });
          }
        }
      ]
    });
    await prompt.present();
  }

}