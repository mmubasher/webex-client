import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { WebexService } from '../webex.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent {

  @Input() accessToken: string;
  @ViewChild('selfVideoElem', {read: ElementRef, static: false}) selfVideoControl: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideoElem', {read: ElementRef, static: false}) remoteVideoControl: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteAudioElem', {read: ElementRef, static: false}) remoteAudioControl: ElementRef<HTMLAudioElement>;
  webex: any;
  isCallInProgress = false;

  constructor(private webexService: WebexService) {
  }

  async call() {
    this.webexService.selfViewHTMLElem = this.selfVideoControl.nativeElement;
    this.webexService.remoteViewVideoHTMLElem = this.remoteVideoControl.nativeElement;
    this.webexService.remoteViewAudioHTMLElem = this.remoteAudioControl.nativeElement;
    this.webexService.initWebex(this.webexService.env.webex.guestAccessToken);
    this.isCallInProgress = true;
  }

  hangUp() {
    this.webexService.hangUp();
    this.isCallInProgress = false;
  }

}
