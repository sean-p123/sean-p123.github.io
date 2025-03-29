import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
//import { Equipment } from 'src/app/types/equipment';
import { Instruments } from 'src/app/types/instruments';
import { InstrumentType } from 'src/app/types/instruments';
import { Instrument, InstrumentsService } from 'src/app/services/instruments.service';
import { EquipmentService, Equipment } from 'src/app/services/equipment.service';
//import { instruments } from '../../db/instruments.json' 
import instruments from "../../db/instruments.json";
import equipment from "../../db/equipment.json";
@Component({
  selector: 'app-stage-plot',
  templateUrl: './stage-plot.component.html',
  styleUrls: ['./stage-plot.component.scss'],
  standalone: false
})
export class StagePlotComponent {
  @ViewChild('focusableDiv') focusableDiv: ElementRef | undefined;

  //'string' | 'percussion' | 'wind' | 'keyboard' | 'electronic';
  // Instrument lists for dropdowns
  drumList = [
    { name: 'Drum-Double-kick', icon: './assets/img/doublekick.png' },
    { name: 'Drum-Three-toms', icon: './assets/img/ThreeToms.png' },
    { name: 'Drum-Four-toms', icon: './assets/img/FourToms.png' },
  ];
  micList = [
    { name: 'Microphone', icon: './assets/img/Boom57.png' },
    { name: 'Microphone-2', icon: './assets/img/Boom57.png' },
  ];
  guitarList = [
    { name: 'Bass Guitar', icon: './assets/img/Beguitarist.png' },
    { name: 'Guitar', icon: './assets/img/Guitarist.png' },
  ];
  singerList = [
    { name: 'Singer', icon: './assets/img/Man1.png' },
    { name: 'Singer2', icon: './assets/img/Man1.png' },
  ];
  keyboardList = [
    { name: 'Double Key', icon: './assets/img/doublekey.png' },
    { name: 'Grand Piano', icon: './assets/img/grandpiano1L.png' },
  ]
  powerList = [
    {name: 'Power Triangle', icon: './assets/img/powertriangle.png'}
  ]
  riserList = [
    {name: 'Riser 6x6', icon: './assets/img/riser6x6.png'},
    {name: 'Riser 8x8', icon: './assets/img/riser8x8.png'}
  ]

  defaultInstrumentDropdownList = ["Singer", "Mics", "Guitars", "Drums", "Keyboards"];
  selectedInstrument: {
    singer: string,
    drummer:string,
    mics:string,
    guitars:string,
    keys:string
  }
  selectedEquipment: {
    power: string,
    riser:string
  }
  displayData: any[] = [];
  displayData2: {
    strings: Instrument[],
    drums: Instrument[],
    mics: Instrument[],
    keyboards: Instrument[],
    singer: Instrument[],
    power: Equipment[],
    riser: Equipment[]
  } = {
    strings: [],
    drums: [],
    mics: [],
    keyboards: [],
    singer: [],
    power: [],
    riser: []
  };

  // Dropped items with position tracking
  droppedItems: { 
    droppedId:number;
    name: string;
    icon: string; 
    description:string; 
    top: number; 
    left: number; 
    isSelected:boolean, 
    rotationStyle: string,
    rotationAngle: number
   }[] = [];
  //add an input box next to the selected item
  descriptionBox: {iconId:number; description:string, top:number, left:number} = {iconId: -1, description:'', top:0, left:0}

  instrumentData: Instrument[] = []
  isSelected:boolean = false;
  itemId:number = 1;
  selectedItem: any = null;


  constructor(private instrumentsService: InstrumentsService, 
    private equipmentService: EquipmentService
  ){

    console.log(equipment);
    console.log(instruments);
    
    // fetch('frontend\stage-plot-helper-pro\src\app\db\instruments.json').then(response => response.json())
    // .then(data => console.log(data))  // Use this data in your frontend
    //.catch(error => console.error("Error loading data:", error));
    this.selectedInstrument = {
      singer: '',
      drummer: '',
      guitars: '',
      keys: '',
      mics: ''
    }
    this.selectedEquipment = {
      power: '',
      riser: ''
    }

   this.singerList.forEach(s=> {
    this.displayData.push({
      id: 0,
      name: s.name,
      category: "percussion",
      description: "",
      icon: s.icon
    })
   })
   this.micList.forEach(m=>{
    this.displayData.push({
      id:0,
      name:m.name,
      category: "percussion",
      description: "",
      icon: m.icon
    })
   })
   this.drumList.forEach(d=> {
    this.displayData.push({
      id: 0,
      name: d.name,
      category: "percussion",
      description: "",
      icon: d.icon
    })
   })
   this.guitarList.forEach(g=> {
    this.displayData.push({
      id: 0,
      name: g.name,
      category: "string",
      description: "", 
      icon: g.icon
    })
   })
   this.keyboardList.forEach(k=>{
    this.displayData.push({
      id:0,
      name: k.name,
      category: "keyboard",
      description:"",
      icon: k.icon
    })
   })
   this.riserList.forEach(r=>{
    this.displayData.push({
      id: 0,
      name: r.name,
      category: "riser",
      description: "", 
      icon: r.icon
    })
   })
   this.powerList.forEach(p=>{
    this.displayData.push({
      id: 0,
      name: p.name,
      category: "power",
      description: "", 
      icon: p.icon
    })
   })
  }

  ngOnInit(): void {
    //"percussion" "wind" "string"
    this.instrumentsService.getInstruments().subscribe((data) => {
      console.log(data);
      data.forEach(element => {
        
      /*  this.instrumentData.push({
          id:element.id,
          name:element.name,
          description:element.description,
          category:element.category,
          icon: element.icon
        })
          */
      })
      
      // data.forEach(instrument=>{
      //   console.log(instrument)
      //   switch (instrument.category){
      //     case "keyboard":
      //       this.displayData2.keyboards.push({
      //         instrument_id: instrument.instrument_id,
      //         name: instrument.name,
      //         description: instrument.description,
      //         icon:  './assets/img/' + instrument.icon + '.png',
      //         category: instrument.category
      //       })
      //       break;
      //     case "percussion":
      //       this.displayData2.drums.push({
      //         instrument_id: instrument.instrument_id,
      //         name: instrument.name,
      //         description: instrument.description,
      //         icon:  './assets/img/' + instrument.icon + '.png',
      //         category: instrument.category
      //       })
      //       break;
      //     case "mics":
      //       this.displayData2.mics.push({
      //         instrument_id: instrument.instrument_id,
      //         name: instrument.name,
      //         description: instrument.description,
      //         icon:  './assets/img/' + instrument.icon + '.png',
      //         category: instrument.category
      //       });
      //       break;
      //     case "string":
      //       this.displayData2.strings.push({
      //         instrument_id: instrument.instrument_id,
      //         name: instrument.name,
      //         description: instrument.description,
      //         icon:  './assets/img/' + instrument.icon + '.png',
      //         category: instrument.category
      //       });
      //       break;
      //     case "wind":
      //       this.displayData2.singer.push({
      //         instrument_id: instrument.instrument_id,
      //         name: instrument.name,
      //         description: instrument.description,
      //         icon:  './assets/img/' + instrument.icon + '.png',
      //         category: instrument.category
      //       });
      //       break;
      //   }
      // })
      // this.equipmentService.getEquipment().subscribe((data)=>{
      //   data.forEach(element=>{
      //     console.log(element)
      //     switch(element.category){
      //       case "power":
      //         this.displayData2.power.push({
      //           id: element.id,
      //           description: element.description,
      //           category: element.category,
      //           name: element.name,
      //           icon: element.icon
      //         })
      //         break;
      //       case "riser":
      //         this.displayData2.riser.push(element);
      //       }
      //   })
      // })
      console.log(this.displayData2);
    });


    instruments.forEach(instrument => {
      switch (instrument.category){
        case "keyboard":
          this.displayData2.keyboards.push({
            instrument_id: instrument.instrument_id,
            name: instrument.name,
            description: instrument.description,
            icon:  './assets/img/' + instrument.icon + '.png',
            category: instrument.category
          })
          break;
        case "percussion":
          this.displayData2.drums.push({
            instrument_id: instrument.instrument_id,
            name: instrument.name,
            description: instrument.description,
            icon:  './assets/img/' + instrument.icon + '.png',
            category: instrument.category
          })
          break;
        case "mics":
          this.displayData2.mics.push({
            instrument_id: instrument.instrument_id,
            name: instrument.name,
            description: instrument.description,
            icon:  './assets/img/' + instrument.icon + '.png',
            category: instrument.category
          });
          break;
        case "string":
          this.displayData2.strings.push({
            instrument_id: instrument.instrument_id,
            name: instrument.name,
            description: instrument.description,
            icon:  './assets/img/' + instrument.icon + '.png',
            category: instrument.category
          });
          break;
        case "wind":
          this.displayData2.singer.push({
            instrument_id: instrument.instrument_id,
            name: instrument.name,
            description: instrument.description,
            icon:  './assets/img/' + instrument.icon + '.png',
            category: instrument.category
          });
          break;
      }
    });

      equipment.forEach(element=>{
        console.log(element)
        switch(element.category){
          case "power":
            this.displayData2.power.push({
              id: element.id,
              description: element.description,
              category: element.category,
              name: element.name,
              icon: element.icon
            })
            break;
          case "riser":
            this.displayData2.riser.push({
               id: element.id,
              description: element.description,
              category: element.category,
              name: element.name,
              icon: element.icon
            });
          }
    })
  }
  //displayData: Instruments[];
  
  //selectedItem: any = null;
  // Add selected item to the drop zone
  onInstrumentSelected2($event: Event, instrumentType:string) {
    console.log($event.target);
    const selectedOption = ($event.target as HTMLSelectElement).value;
    console.log(selectedOption);
    const tempItem = this.displayData.find(i => i.name === selectedOption)
    //selectedItem = this.selectedItem.
    if (tempItem) {
      this.droppedItems.push({
        droppedId: this.itemId,
        ...tempItem,
        description:'',
        top: 0, // Default initial position
        left: 0,
        isSelected: false,
        rotationStyle: '`rotate(0deg)`',
        rotationAngle: 0
      });
      //selectedItem = null;
      //this.selectedItem = null;
      //console.log(this.selectedItem);
      this.itemId++;
      //(event.target as HTMLSelectElement).value = tempItem.category;
    //  (event.target as HTMLSelectElement).value = "Singers"
    }
    console.log(tempItem);
    console.log(this.displayData2)
    this.resetInstrument(instrumentType);
  }

  onInstrumentSelected3(event: Event){
    console.log(event.target)
  }
  resetDropdown(){
      if (this.selectedItem === null) {
        // Force change detection
        this.selectedItem = null;
      }
  }
  resetInstrument(selectedItem: string){
    const timeout = 500;
    setTimeout(()=>{
      switch (selectedItem) {
        case 'singer':
          this.selectedInstrument.singer = '';
          break;
        case 'mics':
          this.selectedInstrument.mics = '';
          break;
        case 'guitars':
          this.selectedInstrument.guitars= '';
          break;
        case 'drums':
          this.selectedInstrument.drummer = '';
          break;
        case 'keys':
          this.selectedInstrument.keys = '';
          break;
        default:
          break;
      }
    }, timeout);
  }
  onInstrumentSelected(event: Event) {

    const selectedValue1 = (event.target as HTMLSelectElement).value;
    console.log(selectedValue1)
    if (selectedValue1) {
      //const selectedSinger = this.singerList.find(singer => singer.name === selectedValue1);
      const selectedItem = this.displayData.find(e=> e.name === selectedValue1);
      if (selectedItem) {
        selectedItem.id = selectedItem.id++;
        this.droppedItems.push({
          droppedId: this.itemId,
          ...selectedItem,
          top: 0, // Default position
          left: 0,
          isSelected: false,
          rotationStyle: '`rotate(0deg)`',
          rotationAngle: 0
        });
      }
  
      // Reset the selection
      this.selectedItem = null;
      (event.target as HTMLSelectElement).value = "Singers"; // Reset visually
    }

/*
    const selectElement = event.target as HTMLSelectElement;
  const selectedValue = selectElement.value; // Access the selected value
  console.log('Selected Value:', selectedValue);
  */
 }
  // Update position when dragging ends
  onDragEnd(event: any, index: number, element:any) {
    console.log(event);
    const position = event.source.getFreeDragPosition();
    this.droppedItems[index].top = position.y;
    this.droppedItems[index].left = position.x;
    this.droppedItems[index].rotationStyle = element.rotationStyle;
  }


removeItem(index: number): void {
  this.droppedItems.splice(index, 1); // Remove item from the list and drop zone
}

selectIcon(event: MouseEvent, selectedItem:any) {
  this.isSelected = !this.isSelected;
  console.log(selectedItem);
  console.log(this.selectedItem);
  this.selectedItem = selectedItem;
  selectedItem.isSelected = true;
  this.selectedItem = {...selectedItem};
  this.descriptionBox.left = selectedItem.left //+ 150;
  this.descriptionBox.top = selectedItem.top - 50;
  this.descriptionBox.iconId = selectedItem.droppedId;
  //this.descriptionBox.description == selectedItem.description;
  if (this.isSelected && this.focusableDiv) {
    this.focusableDiv.nativeElement.focus(); // Programmatically focus on the div
  }

  // console.log("Icon selected:", this.isSelected);
  // console.log(event);
  // console.log("Selected Item: ", selectedItem);
  // console.log(this.descriptionBox)
}

saveDescription(description:string){
  this.isSelected = false;
  // console.log(description);
  // console.log(this.selectedItem)
  const index = this.droppedItems.findIndex(e=>e.droppedId === this.selectedItem.droppedId)
  if(index > -1){
    console.log("inadd")
    this.droppedItems[index].description = description;
    this.droppedItems[index].isSelected = false;
    console.log(this.droppedItems)
  }
  
}

warnNoSave(){
  // const confirmDiscardSave = confirm("All changes will be lost");
  // if(confirmDiscardSave){
  //   this.isSelected = false;
  //   //this.descriptionBox.description = '';
  //   this.selectedItem.description = '';
  //   this.selectedItem.isSelected = false;
  // }
  // else{
  //   this.selectedItem.isSelected = false;
  // }
}
@HostListener('document:click', ['$event'])
onDocumentClick(event: MouseEvent): void {
  if (this.focusableDiv && !this.focusableDiv.nativeElement.contains(event.target)) {
    this.warnNoSave();
  }
}

rotateItem(direction:string){
  console.log("Rotate ", direction);
  const index = this.droppedItems.findIndex(d => d.droppedId == this.selectedItem.droppedId);
  console.log(index);
  if(index == -1) return;
  switch(direction){
    case 'left':
      this.droppedItems[index].rotationAngle -= 45;
      this.droppedItems[index].rotationStyle = `rotate(${this.droppedItems[index].rotationAngle}deg)`;
      // currentElement.rotationAngle += 45;
      //translate(${this.droppedItems[index].left}px,${this.droppedItems[index].top}px) 
      // currentElement.rotationStyle = `rotate(${currentElement.rotationAngle}deg)`;
      break;
    case 'right':
      this.droppedItems[index].rotationAngle += 45;
      this.droppedItems[index].rotationStyle = `rotate(${this.droppedItems[index].rotationAngle}deg)`;
      // currentElement.rotationAngle -= 45;
      // currentElement.rotationStyle = `rotate(${currentElement.rotationAngle}deg)`
      break;
  }
}

}
