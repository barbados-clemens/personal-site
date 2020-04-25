import {AfterViewChecked, Directive, ElementRef, OnDestroy, Renderer2} from '@angular/core';

@Directive({
  selector: '[appBlurUp]'
})
export class BlurUpDirective implements AfterViewChecked, OnDestroy {

  constructor(
    private render: Renderer2,
    private el: ElementRef
  ) {
  }

  ngAfterViewChecked(): void {
    console.log(this.el.nativeElement.querySelectorAll('img'));

  }

  ngOnDestroy(): void {
    console.log('clean up listeners');
  }

}

const BLUR_UP_SCRIPT = `
<script data-blurup>
  const imageWrappers = document.querySelectorAll('.img-wrapper')

  for (let i = 0; i < imageWrappers.length; i++) {
    const imgWrap = imageWrappers[i];

    const imgEl = imgWrap.querySelector('img');

    const onImageComplete = () => {
      imgEl.style.opacity = 1;
      imgEl.style.filter = null;
      imgEl.style.color = 'inherit';
      imgEl.style.boxShadow = 'inset 0 0 0 400px white'
      imgEl.removeEventListener('load', onImageLoad)
      imgEl.removeEventListener('error', onImageComplete)
    }

    const onImageLoad = () => {
      imgEl.style.transition = 'opacity .4s cubic-bezier(0.4, 0.0, 0.2, 1)';

      onImageComplete()
    }

    imgEl.style.opacity = 0;
    imgEl.style.filter = 'blur(10px)';
    imgEl.style.transform = 'scale(1)';
    imgEl.addEventListener('load', onImageLoad)
    imgEl.addEventListener('error', onImageComplete)

    if (imgEl.complete) {
      onImageComplete()
    }
  }
</script>
`;
