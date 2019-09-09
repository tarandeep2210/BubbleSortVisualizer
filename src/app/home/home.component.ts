import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() {
    
   }

  ngOnInit() {
    this.generateBlocks();
  }

    swap(el1, el2) {
    return new Promise(resolve => {
      const style1 = window.getComputedStyle(el1);
      const style2 = window.getComputedStyle(el2);
      const container = document.querySelector(".data-container");
  
      const transform1 = style1.getPropertyValue("transform");
      const transform2 = style2.getPropertyValue("transform");
  
      el1.style.transform = transform2;
      el2.style.transform = transform1;
  
      // Wait for the transition to end!
      window.requestAnimationFrame(function() {
        setTimeout(() => {
          container.insertBefore(el2, el1);
          resolve();
        }, 100);
      });
    });
  }
  
  async bubbleSort(delay = 100) {
    if (delay && typeof delay !== "number") {
      alert("sort: First argument must be a typeof Number");
      return;
    }
    let blocks:any = document.querySelectorAll(".block");
    for (let i = 0; i < blocks.length - 1; i += 1) {
      for (let j = 0; j < blocks.length - i - 1; j += 1) {
        blocks[j].style.backgroundColor = "#FF4949";
        blocks[j + 1].style.backgroundColor = "#FF4949";
  
        await new Promise(resolve =>
          setTimeout(() => {
            resolve();
          }, delay)
        );
  
        const value1 = Number(blocks[j].childNodes[0].innerHTML);
        const value2 = Number(blocks[j + 1].childNodes[0].innerHTML);
  
        if (value1 > value2) {
          await this.swap(blocks[j], blocks[j + 1]);
          blocks = document.querySelectorAll(".block");
        }
  
        blocks[j].style.backgroundColor = "#58B7FF";
        blocks[j + 1].style.backgroundColor = "#58B7FF";
      }
  
      blocks[blocks.length - i - 1].style.backgroundColor = "#13CE66";
    }
  }
  
   generateBlocks(num = 20) {
    const container = document.querySelector(".data-container");
    for (let i = 0; i < num; i += 1) {
      const value = Math.floor(Math.random() * 100).toString();
  
      const block = document.createElement("div");
      block.classList.add("block");
      block.style.height = `${parseInt(value) * 3}px`;
      block.style.transform = `translateX(${i * 30}px)`;
  
      const blockLabel = document.createElement("label");
      blockLabel.classList.add("block__id");
      blockLabel.innerHTML = value;
  
      block.appendChild(blockLabel);
      container.appendChild(block);
    }
  }

}
