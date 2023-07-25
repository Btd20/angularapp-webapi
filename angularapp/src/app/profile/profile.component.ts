import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username: string | null = sessionStorage.getItem('username');
  role: string | null = sessionStorage.getItem('role');
  email: string | null = sessionStorage.getItem('email');
  pais: string | null = sessionStorage.getItem('pais');
  oficina: string | null = sessionStorage.getItem('oficina');

  profileImageUrl: string | undefined;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    if (this.username) {
      this.loadProfileImage();
    }
  }

  loadProfileImage() {
    this.http.get(`https://localhost:7240/api/ApplicationUsers/GetProfileImage/${this.username}`, { responseType: 'arraybuffer' })
      .subscribe(
        (imageData: ArrayBuffer) => {
          // Convierte los datos binarios (ArrayBuffer) en una URL de imagen válida
          const base64String = this.arrayBufferToBase64(imageData);
          this.profileImageUrl = 'data:image/jpeg;base64,' + base64String;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  // Método para convertir ArrayBuffer a base64
  arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
}
