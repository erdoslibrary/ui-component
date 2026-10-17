/**
 * Syntax Highlighter Module
 * HTML, CSS, JavaScript 코드를 안전하게 이스케이프하고 구문 강조 토큰을 생성합니다.
 * 외부 라이브러리(Prism.js 등)가 존재하면 Prism을 활용하고, 없어도 자체 정규식 파서로 화려하게 하이라이트합니다.
 */

const Highlighter = (() => {
  // HTML 엔티티 이스케이프
  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // HTML 구문 강조
  function highlightHtml(code) {
    if (window.Prism && window.Prism.languages.markup) {
      return window.Prism.highlight(code, window.Prism.languages.markup, 'markup');
    }

    let escaped = escapeHtml(code);

    // 주석
    escaped = escaped.replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="token comment">$1</span>');

    // 태그 및 속성
    escaped = escaped.replace(
      /(&lt;\/?)([a-zA-Z0-9\-]+)([\s\S]*?)(\/?&gt;)/g,
      (match, p1, tag, attrs, p4) => {
        // 속성 하이라이트
        let highlightedAttrs = attrs.replace(
          /([a-zA-Z0-9\-:@]+)(?:=(&quot;[\s\S]*?&quot;|&#39;[\s\S]*?&#39;|[^\s&gt;]+))?/g,
          (m, attrName, attrVal) => {
            let res = `<span class="token attr-name">${attrName}</span>`;
            if (attrVal) {
              res += `&#61;<span class="token attr-value">${attrVal}</span>`;
            }
            return res;
          }
        );
        return `${p1}<span class="token tag-name">${tag}</span>${highlightedAttrs}${p4}`;
      }
    );

    return escaped;
  }

  // CSS 구문 강조
  function highlightCss(code) {
    if (window.Prism && window.Prism.languages.css) {
      return window.Prism.highlight(code, window.Prism.languages.css, 'css');
    }

    let escaped = escapeHtml(code);

    // 주석
    escaped = escaped.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="token comment">$1</span>');

    // 선택자 및 규칙 블록
    escaped = escaped.replace(/([^{]+)\{([^}]+)\}/g, (match, selector, rules) => {
      // 속성 및 값
      let highlightedRules = rules.replace(
        /([a-zA-Z\-]+)\s*:\s*([^;]+);/g,
        '<span class="token property">$1</span>: <span class="token value">$2</span>;'
      );
      return `<span class="token selector">${selector}</span>{${highlightedRules}}`;
    });

    return escaped;
  }

  // JavaScript 구문 강조
  function highlightJs(code) {
    if (!code) return '';
    if (window.Prism && window.Prism.languages.javascript) {
      return window.Prism.highlight(code, window.Prism.languages.javascript, 'javascript');
    }

    let escaped = escapeHtml(code);

    // 주석
    escaped = escaped.replace(/(\/\/[^\n]*)/g, '<span class="token comment">$1</span>');
    escaped = escaped.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="token comment">$1</span>');

    // 문자열
    escaped = escaped.replace(/(&quot;[\s\S]*?&quot;|&#39;[\s\S]*?&#39;|`[\s\S]*?`)/g, '<span class="token string">$1</span>');

    // 키워드
    const keywords = [
      'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while',
      'switch', 'case', 'break', 'new', 'try', 'catch', 'finally', 'throw',
      'class', 'import', 'export', 'from', 'default', 'async', 'await', 'this',
      'true', 'false', 'null', 'undefined'
    ];
    const kwRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
    escaped = escaped.replace(kwRegex, '<span class="token keyword">$1</span>');

    // 내장 객체 및 메서드
    escaped = escaped.replace(/\b(document|window|console|Math|Date|Array|Object|String|JSON)\b/g, '<span class="token builtin">$1</span>');

    // 함수 호출
    escaped = escaped.replace(/\b([a-zA-Z0-9_$]+)\s*(?=\()/g, '<span class="token function">$1</span>');

    // 숫자
    escaped = escaped.replace(/\b(\d+)\b/g, '<span class="token number">$1</span>');

    return escaped;
  }

  return {
    escapeHtml,
    highlight(code, language) {
      if (!code) return '';
      switch (language.toLowerCase()) {
        case 'html':
        case 'markup':
          return highlightHtml(code);
        case 'css':
          return highlightCss(code);
        case 'js':
        case 'javascript':
          return highlightJs(code);
        default:
          return escapeHtml(code);
      }
    }
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Highlighter;
} else {
  window.Highlighter = Highlighter;
}
