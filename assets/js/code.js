document.addEventListener('DOMContentLoaded', (event) => {
    const textInput = document.querySelector('.textInput');
    const codeOutput = document.querySelector('.codeOutput');

    if (textInput && codeOutput) {
        textInput.addEventListener('input', () => {
            codeOutput.textContent = textInput.value;
            if (codeOutput.dataset.highlighted) {
                delete codeOutput.dataset.highlighted;
            }
            hljs.highlightElement(codeOutput);

            // 同步光标位置
            updateCursor();
        });

        textInput.addEventListener('keydown', updateCursor);
        textInput.addEventListener('keyup', updateCursor);

        // 同步滚动
        textInput.addEventListener('scroll', () => {
            codeOutput.scrollTop = textInput.scrollTop;
            codeOutput.scrollLeft = textInput.scrollLeft;
        });

        // 同步光标位置的函数
        function updateCursor() {
            const cursorPosition = textInput.selectionStart;
            const text = textInput.value;
            const beforeCursor = escapeHtml(text.slice(0, cursorPosition));
            const afterCursor = escapeHtml(text.slice(cursorPosition));
            if (codeOutput.dataset.highlighted) {
                delete codeOutput.dataset.highlighted;
            }
            codeOutput.innerHTML = `${beforeCursor}<span class="cursor">|</span>${afterCursor}`;
            hljs.highlightElement(codeOutput); // 重新高亮
        }

        // HTML 转义函数
        function escapeHtml(text) {
            return text.replace(/&/g, '&amp;')
                       .replace(/</g, '&lt;')
                       .replace(/>/g, '&gt;')
                       .replace(/"/g, '&quot;')
                       .replace(/'/g, '&#039;');
        }

        // 初始同步光标位置
        updateCursor();
    } else {
        console.error('textInput 或 codeOutput 元素未找到');
    }
});




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


document.getElementById('closeResult').addEventListener('click', function() {
    var result=document.getElementById('result');
    result.style.display = 'none';
    
});

document.addEventListener('DOMContentLoaded', (event) => {
    const runButton = document.getElementById('run');
    const codeLanguageSelect = document.getElementById('codeLanguage');
    
    
    if (runButton) {
        runButton.addEventListener('click', () => {
            var result=document.getElementById('result');
            result.style.display = 'block';
            console.log('Run button clicked');
            var codeType = codeLanguageSelect.value;
            var code = document.getElementById('textInput').value;
            compileCode(codeType,code);
        });
    } else {
        console.error('Run button not found');
    }


  
});

function compileCode(T, code) {
    document.getElementById('resultText').innerHTML = ''
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.scustu.cn/compile/' + T, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
      if (xhr.status === 200) {//
        try {
            var jsonResponse = JSON.parse(xhr.responseText);
            document.getElementById('resultText').innerHTML = "out:"+jsonResponse.stdout+"<br>"+"error:"+jsonResponse.stderr;
          } catch (error) {
            // 如果解析失败，可以在这里处理错误
            document.getElementById('resultText').innerHTML = "Error parsing JSON: " + error.message;
          }
      }
    };
    xhr.send('code=' +encodeURIComponent(code));
  }
