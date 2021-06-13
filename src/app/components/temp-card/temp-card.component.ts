import { Component, OnInit, OnDestroy } from '@angular/core';
import { Input } from '@angular/core';
import { Router } from "@angular/router";
import { Cityinfo, Tempinfo } from '../../weather.model';
import { WeatherService } from '../../services/weather.service';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-temp-card',
  templateUrl: './temp-card.component.html',
  styleUrls: ['./temp-card.component.scss']
})
export class TempCardComponent implements OnInit, OnDestroy {
  @Input()
  cityinfo!: Cityinfo;
  timedisp = moment().format("ddd MMM DD YYYY");
  tempinfo!: Tempinfo;
  subscribers: Subscription[] = [];

  constructor(
    private weatherService: WeatherService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscribers.push(
      this.weatherService.getTemperatureNow(this.cityinfo.lat, this.cityinfo.lng).subscribe((tempDetail: any) => {
        this.tempinfo = tempDetail?.data.timelines[0]?.intervals[0]?.values;
      },
      err => {
        console.log(err);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscribers.forEach(s => s.unsubscribe());
  }

  navToDetailView() {
    this.router.navigate(['/city'], {
      state: {
        cityinfo: this.cityinfo
      }
    });
  }
}
