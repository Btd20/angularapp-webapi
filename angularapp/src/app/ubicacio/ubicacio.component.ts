import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PaisosService } from '../paisos.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-ubicacio',
  templateUrl: './ubicacio.component.html',
  styleUrls: ['./ubicacio.component.css']
})
export class UbicacioComponent {
  fileToUpload: File | null = null;
  imageSelected: boolean = false;
  message: string | undefined;

  paisos: any[] = [];
  ciutats: any[] = [];
  oficines: any[] = [];

  selectedCountry: string | undefined;
  selectedCity: string | undefined;
  selectedOffice: string | undefined;

  constructor(private paisosService: PaisosService, private http: HttpClient, private apiService: ApiService) { }

  ngOnInit(): void {
    this.getPaisosFromApi();
  }

  onCountrySelected(): void {
    if (this.selectedCountry && this.selectedCountry !== 'No seleccionat') {
      this.getAllCiutatsFromApi();
    } else {
      this.ciutats = [];
      this.selectedCity = undefined;
    }
  }

  onCitySelected(): void {
    if (this.selectedCity && this.selectedCity !== 'No seleccionat') {
      this.getAllOficinesFromApi();
    } else {
      this.oficines = [];
      this.selectedOffice = undefined;
    }
  }

  getPaisosFromApi(): void {
    this.paisosService.getPaisos().subscribe(
      response => {
        this.paisos = response;
      
      },
      error => {
        console.error(error);
      }
    );
  }

  getAllCiutatsFromApi(): void {
    this.apiService.getCiutatsByPais(this.selectedCountry ?? '').subscribe(
      response => {
        this.ciutats = response;
        if (this.ciutats.length > 0) {
          this.selectedCity = this.ciutats[0].nomCiutat;
          this.guardarCiutat();
        } else {
          this.selectedCity = undefined;
        }
      },
      error => {
        console.error(error);
      }
    );
  }

  getAllOficinesFromApi(): void {
    this.apiService.getOficinesByCiutats(this.selectedCountry ?? '', this.selectedCity ?? '').subscribe(
      response => {
        this.oficines = response;
        if (this.oficines.length > 0) {
          this.selectedOffice = this.oficines[0].nomOficina;
          this.guardarOficina();
        } else {
          this.selectedOffice = undefined;
        }
      },
      error => {
        console.error(error);
      }
    );
  }

  guardarPais(): void {
    if (this.selectedCountry) {
      const username = sessionStorage.getItem('username') ?? '';
      this.apiService.guardarPais(username, this.selectedCountry);
      sessionStorage.setItem('pais', this.selectedCountry);

      this.getAllCiutatsFromApi();
    }
  }

  guardarCiutat(): void {
    if (this.selectedCity) {
      const username = sessionStorage.getItem('username') ?? '';
      this.apiService.guardarCiutat(username, this.selectedCity);
      sessionStorage.setItem('ciutat', this.selectedCity);

      this.getAllOficinesFromApi();
    }

  }

  guardarOficina(): void {
    if (this.selectedOffice) {
      const username = sessionStorage.getItem('username') ?? '';
      this.apiService.guardarOficina(username, this.selectedOffice);
      sessionStorage.setItem('oficina', this.selectedOffice);
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileToUpload = file;
      this.imageSelected = true;
    }
  }

  uploadImage() {
    if (!this.fileToUpload) {
      alert("Selecciona una imatge abans de pujarla.");
      return;
    }

    const username = sessionStorage.getItem('username'); // Reemplaza "nombreDeUsuario" por el nombre de usuario actual del usuario.

    const formData = new FormData();
    formData.append("file", this.fileToUpload);

    this.http.post(`https://localhost:7240/api/ApplicationUsers/${username}/UploadProfileImage`, formData)
      .subscribe(
        () => {
          alert("Imatge pujada amb exit.");
          this.fileToUpload = null;
        },
        (error) => {
          console.error(error);
          alert("Error al pujar l'imatge.");
        }
      );
  }
}
