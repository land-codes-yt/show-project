document.addEventListener('DOMContentLoaded', function() {
    // خريطة الترجمة من العربية إلى الرموز
    const arabicToSymbols = {
        'ج': '\\', 'ح': '|', 'خ': '>', 'ه': '<', 'ع': '}', 
        'غ': '{', 'ف': ']', 'ق': '[', 'ث': '▪', 'ص': '○', 
        'ض': '●', 'ط': '□', 'ك': '■', 'م': '♤', 'ن': '♡', 
        'ت': '◇', 'ا': '♧', 'ل': '☆', 'ب': '⊙', 'ي': '°', 
        'س': '•', 'ش': '¤', 'د': '》', 'ظ': '《', 'ز': '¡', 
        'و': '¿', 'ة': '+', 'ئ': '×', 'ر': '÷', 'ؤ': '=', 
        'ء': '/', 'ذ': ':', 'ى': '€', 'أ': '£', 'إ': '₩', 
        'آ': '&', ' ': ' ', '\n': '\n'
    };

    // خريطة الترجمة من الرموز إلى العربية
    const symbolsToArabic = Object.fromEntries(
        Object.entries(arabicToSymbols).map(([key, value]) => [value, key])
    );

    // عناصر DOM
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const copyBtn = document.getElementById('copyBtn');

    // وظيفة الكشف التلقائي عن اللغة والترجمة
    function autoDetectAndTranslate() {
        const text = inputText.value;
        let result = '';
        
        if (!text) {
            outputText.value = '';
            return;
        }

        // الكشف عن اللغة (إذا كان النص يحتوي على حروف عربية نترجم للرموز، والعكس)
        const isArabic = /[\u0600-\u06FF]/.test(text);
        
        for (let char of text) {
            if (isArabic) {
                // الترجمة إلى الرموز
                result += arabicToSymbols[char] || char;
            } else {
                // الترجمة إلى العربية
                result += symbolsToArabic[char] || char;
            }
        }
        
        outputText.value = result;
    }

    // وظيفة نسخ النص
    function copyToClipboard() {
        if (!outputText.value) return;
        
        outputText.select();
        document.execCommand('copy');
        
        // تغيير زر النسخ مؤقتاً
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> تم النسخ!';
        copyBtn.style.backgroundColor = '#4caf50';
        copyBtn.style.color = 'white';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.backgroundColor = '';
            copyBtn.style.color = '';
        }, 2000);
    }

    // إضافة مستمعي الأحداث
    inputText.addEventListener('input', autoDetectAndTranslate);
    copyBtn.addEventListener('click', copyToClipboard);

    // التركيز على حقل الإدخال عند تحميل الصفحة
    inputText.focus();
});