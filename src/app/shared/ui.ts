declare const $: any;

export class Ui {
  static blockUI(component?: string, opacity = 0.6,
                 marginTop = 5,
                 marginTBottom = 0,
                 reduce = 0,
                 message = '',
                 bgcolor = '#fff',
                 pos = {
                   left: '36%', top: '40%', right: '50%'
                 }
  ) {
    const block = $(component);
    const msg = '<div><label>' + message +
      '</label>&nbsp;&nbsp;</div>';
    $(block).block({
      message: msg,
      centerY: 0,
      centerX: false,
      overlayCSS: {
        backgroundColor: bgcolor,
        opacity: opacity,
        cursor: 'normal',
        marginTop: marginTop,
        marginBottom: marginTBottom,
        height: 'calc(100% - ' + reduce + 'px)'
      },
      css: {
        cursor: 'normal',
        top: pos.top,
        left: pos.left,
        right: pos.right,
        border: 0,
        padding: 0,
        backgroundColor: 'transparent'
      }
    });
  }


  static unblockUI(component: string) {
    $(component).unblock();
  }

}
