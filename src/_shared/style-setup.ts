const style = document.createElement('style');
document.head.appendChild(style);
export const styleSheet = <CSSStyleSheet>style.sheet;
styleSheet.insertRule('section {margin: 10px}', styleSheet.cssRules.length);
styleSheet.insertRule('.button {margin: 15px 15px 15px 0; width: 100px;}', styleSheet.cssRules.length);

