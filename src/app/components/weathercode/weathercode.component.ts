import { Component, OnInit, OnChanges } from '@angular/core';
import { Input } from '@angular/core';
import { weatherCodeMap } from '../../app.constant';
import { Weatherinfo, Tempinfo } from '../../weather.model';

@Component({
  selector: 'app-weathercode',
  templateUrl: './weathercode.component.html',
  styleUrls: ['./weathercode.component.scss']
})
export class WeathercodeComponent implements OnInit, OnChanges {
  @Input()
  tempinfo!: Tempinfo;
  weatherinfo: Weatherinfo = {
    img: '',
    desc: ''
  };

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    const weatherCode = this.tempinfo?.weatherCode;
    if (weatherCode) {
      this.weatherinfo = (weatherCodeMap as any)[weatherCode]
    }
  }

  get imgpath () {
    const imgName = this.weatherinfo?.img ? this.weatherinfo?.img : this.weatherinfo?.dimg;
    return imgName ? `assets/images/color/${imgName}.svg` : null;
  }
}
