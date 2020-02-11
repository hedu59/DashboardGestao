import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-avalista',
  templateUrl: './avalista.component.html',
  styleUrls: ['./avalista.component.scss']
})
export class AvalistaComponent implements OnInit {

  step2Form: FormGroup;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.step2Form = this.fb.group({
      experience: [2]
    });

  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
  }

}
