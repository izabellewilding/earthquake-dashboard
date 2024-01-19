export interface Earthquake {
  type: string;
  properties: {
    mag: number;
    place: string;
    time: number;
    updated: number;
    tz: null | string;
    url: string;
    detail: string;
    felt: number;
    cdi: number;
    mmi: number;
    alert: string;
    status: string;
    tsunami: number;
    sig: number;
    net: string;
    code: string;
    ids: string;
    sources: string;
    types: string;
    nst: number;
    dmin: number;
    rms: number;
    gap: number;
    magType: string;
    type: string;
    title: string;
  };
  geometry: {
    type: string;
    coordinates: [number, number, number];
  };
  id: string;
}

export interface MonthData {
  label: string;
  value: number;
}

export interface CardData {
  properties: {
    time: string;
    mag: number;
    place: string;
  };
}
