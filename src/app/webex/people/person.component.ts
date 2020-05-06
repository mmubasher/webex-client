import { Component, ElementRef, ViewChild } from '@angular/core';
import { WebexService } from '../webex.service';

@Component({
  selector: 'app-dialer',
  templateUrl: './dialer.component.html',
  styleUrls: ['./dialer.component.css']
})
export class DialerComponent {

  @ViewChild('selfVideoElem', {read: ElementRef, static: false}) selfVideoControl: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideoElem', {read: ElementRef, static: false}) remoteVideoControl: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteAudioElem', {read: ElementRef, static: false}) remoteAudioControl: ElementRef<HTMLAudioElement>;
  isCallInProgress = false;

  constructor(private webexService: WebexService) {
  }

  call() {
    this.webexService.selfViewHTMLElem = this.selfVideoControl.nativeElement;
    this.webexService.remoteViewVideoHTMLElem = this.remoteVideoControl.nativeElement;
    this.webexService.remoteViewAudioHTMLElem = this.remoteAudioControl.nativeElement;
    this.webexService.initWebex(this.webexService.env.webex.teamsMemberAccessToken);
    this.isCallInProgress = true;
  }

  hangUp() {
    this.webexService.hangUp();
  }

}
