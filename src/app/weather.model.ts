export interface Cityinfo {
    city: string;
    stateCd: string;
    countryCd: string;
    lat: number;
    lng: number;
}

export interface Tempinfo {
    temperature: number;
    weatherCode: number;
}

export interface Weatherinfo {
    dimg?: string;
    nimg?: string;
    img?: string;
    desc: string;
}

export interface IntervalModel {
    "startTime": string;
    "values": Tempinfo
}