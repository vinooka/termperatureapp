import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
const apikey1 = 'JEpTKb9pnc3NNrQVtoMZtdo8BzZjcDfV';
const apikey = '8oTCD4SvD45MbnuvMzDroav7uqXNYedl';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private http: HttpClient
  ) { }

  getTemperatureNow(lat: number, lng: number) {
    return this.http.get(`https://api.tomorrow.io/v4/timelines?location=${lat},${lng}&fields=temperature,weatherCode&timesteps=current&units=metric&apikey=${apikey}`);
  }

  getTemperatureToday(lat: number, lng: number) {
    const endTime = moment().endOf("day").toISOString();
    return this.http.get(`https://api.tomorrow.io/v4/timelines?location=${lat},${lng}&fields=temperature,weatherCode&timesteps=1h&endTime=${endTime}&units=metric&apikey=${apikey}`);
  }
}
