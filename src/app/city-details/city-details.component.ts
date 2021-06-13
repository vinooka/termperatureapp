import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from '../services/weather.service';
import { weatherCodeMap } from '../app.constant';
import todayStack from '../../mock/today';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { Cityinfo, IntervalModel } from '../weather.model';

const cityObj = {
  "cityinfo": {
      "city": "Port Hueneme",
      "stateCd": "CA",
      "countryCd": "USA",
      "lat": 34.155834,
      "lng": -119.202789
  }
};

@Component({
  selector: 'app-city-details',
  templateUrl: './city-details.component.html',
  styleUrls: ['./city-details.component.scss']
})
export class CityDetailsComponent implements OnInit, OnDestroy {
  cityDetail!: Cityinfo;
  subscribers: Subscription[] = [];
  intervals: any = [];
  day: any = 'Today';
  theme = 'color';
  loader: boolean = true;

  constructor(private router: Router, private weatherService: WeatherService) {
    const routeState = this.router.getCurrentNavigation()?.extras.state;
    this.cityDetail = routeState?.cityinfo || {};
    this.cityDetail = cityObj.cityinfo;
  }

  ngOnInit(): void {
    this.subscribers.push(
      this.weatherService.getTemperatureToday(this.cityDetail.lat, this.cityDetail.lng).subscribe((tempDetail: any) => {
        this.loader = false;
        const timeline = tempDetail?.data?.timelines[0];
        this.day = moment(timeline.startTime).format("dddd, MMMM Do YYYY, h:mm:ss a"); 
        this.intervals = timeline.intervals;
      },
      err => {
        this.loader = false;
        console.log(err);
      })
    );
    // this.setFixtures();
  }
  ngOnDestroy(): void {
    this.subscribers.forEach(s => s.unsubscribe());
  }

  // setFixtures() {
  //   const tempDetail = todayStack;
  //   const timeline = tempDetail?.data?.timelines[0];
  //   this.day = moment(timeline.startTime).format("dddd, MMMM Do YYYY, h:mm:ss a");
  //   this.intervals = timeline.intervals;
  // }

  getImgPath (interval: IntervalModel) {
    const weatherObj = (weatherCodeMap as any)[interval.values.weatherCode];
    const imgName  = weatherObj?.img || weatherObj?.dimg;
    return imgName ? `assets/images/${this.theme}/${imgName}.svg` : null;
  }

  getWeatherDesc(interval: IntervalModel) {
    const weatherObj = (weatherCodeMap as any)[interval.values.weatherCode];
    return weatherObj?.desc || '';
  }

  getDate(interval: IntervalModel) {
    return moment(interval.startTime).format('DD/MM');
  }

  getPM(interval: IntervalModel) {
    return moment(interval.startTime).format('hA');
  }

  backToHome() {
    this.router.navigate(['']);
  }
}
