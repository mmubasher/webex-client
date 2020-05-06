import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

declare var Webex: any;

@Injectable()
export class WebexService {

  selfViewHTMLElem: HTMLVideoElement;
  remoteViewVideoHTMLElem: HTMLVideoElement;
  remoteViewAudioHTMLElem: HTMLAudioElement;
  private webex: any;
  private meeting: any;
  env = environment;

  constructor() {

  }

  async hangUp() {
    if (this.meeting) {
      try {
        await this.meeting.leave();
      } catch (error) {
        console.error(error);
      }
    }
  }

  initWebex(token): void {
    this.webex = Webex.init({
      config: {
        meetings: {
          deviceType: 'WEB'
        }
      },
      credentials: {
        access_token: token
      }
    });
    this.webex.config.logger.level = 'debug';
    this.webex.meetings.register()
      .then(
        (isRegistered) => {
          return this.webex.meetings.create(this.env.webex.roomId).then(
            (meeting) => {
              this.meeting = meeting;
              // Call our helper function for binding events to meetings
              this.bindMeetingEvents(meeting);
              return this.joinMeeting(meeting);
            })
            .catch((error) => {
              // Report the error
              console.error(error);
            });
        });
  }

  private bindMeetingEvents(meeting) {
    meeting.on('error', (err) => {
      console.error(err);
    });

    // Handle media streams changes to ready state
    meeting.on('media:ready', (media) => {
      if (!media) {
        return;
      }
      if (media.type === 'local') {
        this.selfViewHTMLElem.srcObject = media.stream;
      }
      if (media.type === 'remoteVideo') {
        this.remoteViewVideoHTMLElem.srcObject = media.stream;
      }
      if (media.type === 'remoteAudio') {
        this.remoteViewAudioHTMLElem.srcObject = media.stream;
      }
    });
    // Handle media streams stopping
    meeting.on('media:stopped', (media) => {
      // Remove media streams
      if (media.type === 'local') {
        this.selfViewHTMLElem.srcObject = null;
      }
      if (media.type === 'remoteVideo') {
        this.remoteViewVideoHTMLElem.srcObject = null;
      }
      if (media.type === 'remoteAudio') {
        this.remoteViewAudioHTMLElem.srcObject = null;
      }
    });

  }

  private joinMeeting(meeting) {
    return meeting.join().then(() => {
      const mediaSettings = {
        receiveVideo: true,
        receiveAudio: true,
        receiveShare: false,
        sendVideo: true,
        sendAudio: true,
        sendShare: false
      };
      // Get our local media stream and add it to the meeting
      return meeting.getMediaStreams(mediaSettings).then((mediaStreams) => {
        const [localStream] = mediaStreams;

        meeting.addMedia({
          localStream,
          mediaSettings
        });
      });
    });
  }
}
