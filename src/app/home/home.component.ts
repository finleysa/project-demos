import { Component, OnInit } from '@angular/core';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faFilePdf} from '@fortawesome/free-regular-svg-icons';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    github = faGithub;
    linkedin = faLinkedin;
    pdf = faFilePdf;
    resumeURL: string;

    constructor(private fireStorage: AngularFireStorage, private httpClient: HttpClient) {
    }

    ngOnInit() {
        this.fireStorage.storage.refFromURL('gs://myportfoli-5023b.appspot.com/Steven_Finley_Resume.pdf')
        .getDownloadURL()
        .then(url => this.resumeURL = url)
        .catch(error => console.log(error.code));
    }
}
