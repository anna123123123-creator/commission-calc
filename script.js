(function () {
  'use strict';

  var priceInput = document.getElementById('priceInput');
  var costInput = document.getElementById('costInput');
  var level1RateInput = document.getElementById('level1RateInput');
  var hasLevel2Check = document.getElementById('hasLevel2Check');
  var level2RateInput = document.getElementById('level2RateInput');

  var profitOut = document.getElementById('profitOut');
  var breakdown = document.getElementById('breakdown');
  var errorShown = document.getElementById('errorHint');

  function num(input) {
    var v = parseFloat(input.value);
    return isNaN(v) ? 0 : v;
  }

  function calc() {
    var price = num(priceInput);
    var cost = num(costInput);
    var level1Rate = num(level1RateInput) / 100;
    var level2Rate = hasLevel2Check.checked ? num(level2RateInput) / 100 : 0;

    var level1Commission = price * level1Rate;
    var level2Commission = price * level2Rate;
    var profit = price - cost - level1Commission - level2Commission;

    profitOut.textContent = '¥' + profit.toFixed(2);
    profitOut.style.color = profit < 0 ? '#F87171' : '';

    var rows = [
      { label: '商品成本', value: cost },
      { label: '一级分销佣金（' + (level1Rate * 100).toFixed(0) + '%）', value: level1Commission },
    ];
    if (hasLevel2Check.checked) {
      rows.push({ label: '二级分销佣金（' + (level2Rate * 100).toFixed(0) + '%）', value: level2Commission });
    }
    rows.push({ label: '平台净利润', value: profit });

    breakdown.innerHTML = rows.map(function (r) {
      var pct = price > 0 ? Math.max(0, Math.min(100, (r.value / price) * 100)) : 0;
      return '<div class="detail-row"><span>' + r.label + '</span>' +
        '<span class="bd-bar-wrap"><span class="bd-bar" style="width:' + pct.toFixed(1) + '%"></span></span>' +
        '<span class="val">¥' + r.value.toFixed(2) + '</span></div>';
    }).join('');
  }

  [priceInput, costInput, level1RateInput, hasLevel2Check, level2RateInput].forEach(function (el) {
    el.addEventListener('input', calc);
    el.addEventListener('change', calc);
  });

  calc();
})();
