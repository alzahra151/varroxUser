import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { UpdatelanguageService } from 'src/app/services/updatelanguage.service';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit{
  projectID:number=0;
  direction: string='';
  project:any={}
  constructor(private ActivatedRoute:ActivatedRoute ,
             private projectSevice:ProjectService,
             private languagSevice:UpdatelanguageService,
             private location:Location){
  }
  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe((param)=>{
         this.projectID=param['id']
         console.log( this.projectID)
    })
    this.getProject()
  }

  getProject(){
    this.languagSevice.languge.subscribe(()=>{
      this.direction=localStorage.getItem('direction') || ''
      this.projectSevice.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'accept-language': this.languagSevice.lang
        })
      }
      this.projectSevice.getprojectById(this.projectID).subscribe(project=>{
           this.project=project
           console.log( this.project)
      })
    })
  
  }

    goToback(){
      this.location.back()
    }
  

}
