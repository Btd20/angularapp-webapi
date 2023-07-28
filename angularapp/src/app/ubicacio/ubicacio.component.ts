import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-ubicacio',
  templateUrl: './ubicacio.component.html',
  styleUrls: ['./ubicacio.component.css']
})
export class UbicacioComponent {
  fileToUpload: File | null = null;
  imageSelected: boolean = false;

  paisos: any[] = [];
  ciutats: any[] = [];
  oficines: any[] = [];

  selectedCountry: string | undefined;
  selectedCity: string | undefined;
  selectedOffice: string | undefined;

  constructor(private apiService: ApiService, private http: HttpClient) { }

  ngOnInit(): void {
    this.getPaisosFromApi();
  }

  onCountrySelected(): void {
    if (this.selectedCountry && this.selectedCountry !== 'No seleccionat') {
      this.getAllCiutatsFromApi();
    } else {
      // Reset the cities dropdown when 'No seleccionat' is selected
      this.ciutats = [];
      this.selectedCity = undefined;
    }
  }

  onCitySelected(): void {
    if (this.selectedCity && this.selectedCity !== 'No seleccionat') {
      this.getAllOficinesFromApi();
    } else {
      // Reset the offices dropdown when 'No seleccionat' is selected
      this.oficines = [];
      this.selectedOffice = undefined;
    }
  }

  getPaisosFromApi(): void {
    this.apiService.getPaisos().subscribe(
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
        // Automatically select the first city in the list, if available
        if (this.ciutats.length > 0) {
          this.selectedCity = this.ciutats[0].nomCiutat;
          this.guardarCiutat(); // Save the city automatically
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
        // Automatically select the first office in the list, if available
        if (this.oficines.length > 0) {
          this.selectedOffice = this.oficines[0].nomOficina;
          this.guardarOficina(); // Save the office automatically
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
