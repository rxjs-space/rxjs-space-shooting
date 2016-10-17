const style = document.createElement('style');
document.head.appendChild(style);
const styleSheet = <CSSStyleSheet>style.sheet;
styleSheet.insertRule('section {margin: 10px}', styleSheet.cssRules.length);
styleSheet.insertRule('.button {margin-bottom: 15px}', styleSheet.cssRules.length);
