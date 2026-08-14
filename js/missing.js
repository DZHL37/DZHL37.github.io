const MISSING_CHILDREN = [
  { name: '王子涵', gender: '男', age: '5岁', place: '北京市朝阳区', time: '2023年6月', feature: '右眼角有颗痣', icon: '👶' },
  { name: '李梦瑶', gender: '女', age: '8岁', place: '上海市浦东新区', time: '2024年3月', feature: '扎马尾，穿粉色外套', icon: '👧' },
  { name: '张浩然', gender: '男', age: '3岁', place: '广州市天河区', time: '2025年1月', feature: '左手臂有胎记', icon: '👦' },
  { name: '刘雨桐', gender: '女', age: '6岁', place: '深圳市南山区', time: '2024年8月', feature: '戴红色发卡', icon: '👧' },
  { name: '陈子轩', gender: '男', age: '7岁', place: '杭州市西湖区', time: '2025年4月', feature: '穿蓝色运动鞋', icon: '👶' },
  { name: '杨欣怡', gender: '女', age: '4岁', place: '成都市锦江区', time: '2024年11月', feature: '短发，爱笑', icon: '👧' },
  { name: '赵明宇', gender: '男', age: '9岁', place: '武汉市武昌区', time: '2023年12月', feature: '戴眼镜', icon: '👦' },
  { name: '周若曦', gender: '女', age: '6岁', place: '南京市鼓楼区', time: '2025年2月', feature: '背粉色书包', icon: '👧' },
];

function showRandomChild() {
  const child = MISSING_CHILDREN[Math.floor(Math.random() * MISSING_CHILDREN.length)];
  const el = document.getElementById('missing-banner');
  if (!el) return;
  el.innerHTML = [
    '<div style="font-size:36px">' + child.icon + '</div>',
    '<div style="font-size:18px;font-weight:bold;margin:6px 0">🤝 让爱回家 · 公益寻人</div>',
    '<div style="font-size:14px;opacity:0.95;line-height:1.6">',
    '<strong>' + child.name + '</strong>（' + child.gender + '，失踪时' + child.age + '）<br>',
    '失踪地：' + child.place + ' | 失踪时间：' + child.time + '<br>',
    '特征：' + child.feature,
    '</div>',
    '<div style="display:inline-block;background:rgba(255,255,255,0.2);padding:2px 12px;border-radius:10px;font-size:12px;margin-top:8px">⏳ 寻找中 · 如有线索请联系110</div>',
    '<div style="font-size:12px;opacity:0.7;margin-top:8px">🔄 刷新页面查看下一位</div>',
  ].join('');
}

document.addEventListener('DOMContentLoaded', function() {
  var target = document.querySelector('#page-header') || document.querySelector('#site-info') || document.querySelector('#content') || document.querySelector('.layout');
  if (target) {
    var div = document.createElement('div');
    div.id = 'missing-banner';
    div.style.cssText = 'background:linear-gradient(135deg,#c0392b,#e74c3c);color:white;padding:20px;text-align:center;border-radius:0 0 12px 12px;margin-bottom:20px;cursor:pointer';
    target.parentNode.insertBefore(div, target);
    showRandomChild();
  }
});
