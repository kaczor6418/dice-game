import { ISplashService } from '@/services/SplashService/interfaces/ISplashService';

export class SplashService implements ISplashService {
  private readonly rootElement: HTMLElement;
  private readonly splashElement: HTMLDivElement;

  constructor() {
    this.rootElement = document.body;
    this.splashElement = document.createElement('div');
    this.setUpSplash();
  }

  addSplash(): void {
    this.rootElement.appendChild(this.splashElement);
  }

  removeSplash(): void {
    this.rootElement.removeChild(this.splashElement);
  }

  private setUpSplash() {
    this.splashElement.style.position = 'fixed';
    this.splashElement.style.left = '0';
    this.splashElement.style.top = '0';
    this.splashElement.style.backgroundColor = 'black';
    this.splashElement.style.opacity = '0.5';
    this.splashElement.style.zIndex = '10';
    this.splashElement.style.width = '100vw';
    this.splashElement.style.height = '100vh';
  }
}
