//left sidebar
document.getElementById('sidebar-close').addEventListener('click', function() {
    var sidebar = document.getElementById('sidebar');
    var content = document.querySelector('.content');
    var gradient = document.getElementById('left-gradients');
    sidebar.classList.toggle('collapsed');
    content.classList.toggle('collapsed');
    gradient.classList.toggle('collapsed');
});


//下拉line
var backColor=[
    '#151515',
    '#FFC125',
    '#FF8C00',
    '#FF6347',
    '#FF1493'
]

document.getElementById('rightLine').addEventListener('click', function() {
  var rLine=document.getElementById('rightLine');
  rLine.classList.toggle('collapsed');
  var bodyBack=document.querySelector('.content');
  bodyBack.style.backgroundColor = backColor[Math.floor(Math.random()*backColor.length)];
});

//type
document.addEventListener("DOMContentLoaded", function() {
    const typedTextElement = document.getElementById("typed-text");
    const text = "#include<random>\n#include<algorithm>\n//A test for Duff's device";
    let index = 0;
    const speed = 80; // 打字速度，毫秒
    const deleteSpeed = 10; // 删除速度，毫秒
    const pause = 1000; // 打完后暂停时间，毫秒
    let isDeleting = false;

    function type() {
        if (isDeleting) {
            if (index > 0) {
                index--;
                let currentText = text.substring(0, index);
                typedTextElement.innerHTML = wrapTextWithColor(currentText);
                setTimeout(type, deleteSpeed);
            } else {
                isDeleting = false;
                setTimeout(type, speed);
            }
        } else {
            if (index < text.length) {
                index++;
                let currentText = text.substring(0, index);
                typedTextElement.innerHTML = wrapTextWithColor(currentText);
                setTimeout(type, speed);
            } else {
                isDeleting = true;
                setTimeout(type, pause);
            }
        }
    }

    function wrapTextWithColor(text) {
        let colorFlag = 0;
        return text.split('').map(char => {
            if (char === '<') {
                colorFlag = 1;
                return `<span style="color: #a75624;">${char}</span>`;
            }
            if (char === '/') {
                colorFlag = 2;
                return `<span style="color: #920000;">${char}</span>`;
            }
            if (char === '#') {
                colorFlag = 0;
                return `<span style="color: #e354fd;">${char}</span>`;
            }
            if (char === '\n') {
                return '<br>';
            }
            if (char === '\t') {
                return '&emsp;&emsp;';
            }
            if (colorFlag == 2) {
                return `<span style="color: #920000;">${char}</span>`;
            }
            if (colorFlag == 1) {
                return `<span style="color: #a75624;">${char}</span>`;
            }
            return `<span style="color: #e354fd;">${char}</span>`;
        }).join('');
    }

    type();
});


document.getElementById('codeButton').addEventListener('click', function(){
    window.location.href="./coding.html";
});

