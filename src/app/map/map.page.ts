import { Component, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  latitud: any;
  long: any;

  coord = [{
    latitud: '-0.7118302382407791',
    longitud: '-80.36016966335634',
    mensaje: 'Ubicacion 1'
  },
  {
    latitud: '-0.25791082915715435',
    longitud: '-78.97958010810052',
    mensaje: 'Ubicacion 2'
  },
  {
    latitud: '-0.7293134850640968',
    longitud: '-78.1951731110577',
    mensaje: 'Ubicacion 3'
  },
  {
    latitud: '-2.0028874247081916',
    longitud: '-78.34331537017648',
    mensaje: 'Ubicacion 4'
  }

  ];
  constructor(private geolocation: Geolocation) { }

  ngOnInit() {
    this.getCoordenadas()


    console.log(this.coord)
  }

  getCoordenadas() {
    this.geolocation.getCurrentPosition().then((resp) => {

      this.latitud = resp.coords.latitude
      this.long = resp.coords.longitude
      debugger
      this.cargarmapa()

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }




  cargarmapa() {

    debugger

    mapboxgl.accessToken = 'pk.eyJ1IjoidGhvbWFza2x6MjUiLCJhIjoiY2trNW5heHQ1MDZ3dzJ2bnh3Y2F5am1ueiJ9.MpZvq6-LXOP-o1acNV-hEA';
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [this.long, this.latitud], // starting position [lng, lat]
      zoom: 9 // starting zoom
    });



    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.FullscreenControl());

    map.addControl(new mapboxgl.GeolocateControl({

      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    }));

    map.on('mousemove', function (e) {

      document.getElementById('coordenadas').innerHTML =
        JSON.stringify(e.lngLat);

    });

    var el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = 'url(../../assets/location.png)';
    el.style.width = '32px';
    el.style.height = '32px';

    const popup = new mapboxgl.Popup({ offset: 25 }).setText(

      'Posicion actual'
    )

    const marker = new mapboxgl.Marker(el)
      .setLngLat([this.long, this.latitud])
      .setPopup(popup)
      .addTo(map);

    this.coord.forEach(element => {
      var el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundImage = 'url(../../assets/location.png)';
      el.style.width = '32px';
      el.style.height = '32px';

      const popup = new mapboxgl.Popup({ offset: 25 }).setText(

        element.mensaje
      )

      const marker = new mapboxgl.Marker(el)
        .setLngLat([element.longitud, element.latitud])
        .setPopup(popup)
        .addTo(map);

    });



    map.on('load', function () {
      map.resize();
    })


  }
}
