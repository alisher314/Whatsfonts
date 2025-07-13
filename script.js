document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const fontPreviewContainer = document.getElementById('fontPreviewContainer');
    const closeButton = document.getElementById('closeButton');
    const appTitle = document.getElementById('appTitle');
    const langLabel = document.getElementById('langLabel');
    const inputTextLabel = document.getElementById('inputTextLabel');
    const langButtons = document.querySelectorAll('.lang-button');
    const emptyPreviewMessageElement = document.getElementById('emptyPreviewMessage');

    // --- Локализация текста ---
    const translations = {
        'ru': {
            title: 'KorobkaUz Design',
            langLabel: 'Язык интерфейса:',
            langButtonRu: 'Рус',
            langButtonUz: 'Узб',
            inputTextLabel: 'Введите текст для предпросмотра: (не забудьте проверить знак &)',
            inputPlaceholder: 'Например: \'Имя Жениха & Имя Невесты\'',
            emptyPreviewMessage: 'Введите текст, чтобы увидеть, как он выглядит в разных шрифтах.',
            closeButton: 'Закрыть приложение',
            langWarning: 'Telegram WebApp API не доступен. Возможно, вы тестируете не в Telegram.'
        },
        'uz': {
            title: 'KorobkaUz Design',
            langLabel: 'Interfeys tili:',
            langButtonRu: 'Рус',
            langButtonUz: 'O\'zbekcha',
            inputTextLabel: 'Oldindan ko\'rish uchun matnni kiriting: ("&" belgisini tekshirishni unutmang)',
            inputPlaceholder: 'Masalan: \'Kuyovning va Kelin Ismi\'',
            emptyPreviewMessage: 'Matnni kiriting, turli xil shriftlarida qanday ko\'rinishini bilish uchun.',
            closeButton: 'Ilovani yopish',
            langWarning: 'Telegram WebApp API mavjud emas. Ehtimol, siz Telegramda sinab ko\'rmoqchisiz.'
        }
    };

    let currentLang = 'ru'; // Язык по умолчанию

    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    const langFromUrl = getUrlParameter('lang');
    if (langFromUrl && translations[langFromUrl]) {
        currentLang = langFromUrl;
    }

    function updateInterfaceLanguage() {
        const t = translations[currentLang];
        document.title = t.title;
        if (appTitle) appTitle.textContent = t.title;
        if (langLabel) langLabel.textContent = t.langLabel;
        if (inputTextLabel) inputTextLabel.textContent = t.inputTextLabel;
        textInput.placeholder = t.inputPlaceholder;
        closeButton.textContent = t.closeButton;
        if (emptyPreviewMessageElement) {
             emptyPreviewMessageElement.textContent = t.emptyPreviewMessage;
        }

        langButtons.forEach(button => {
            const lang = button.dataset.lang;
            if (lang === 'ru') {
                button.textContent = t.langButtonRu;
            } else if (lang === 'uz') {
                button.textContent = t.langButtonUz;
            }
            if (lang === currentLang) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    const fonts = [
        // --- Рукописные / Каллиграфические ---
        { name: 'Great Vibes', class: 'font-great-vibes', description_ru: 'Элегантный рукописный', description_uz: 'Nafis qo\'lyozma' },
        { name: 'Dancing Script', class: 'font-dancing-script', description_ru: 'Живой рукописный', description_uz: 'Jonli qo\'lyozma' },
        { name: 'Allura', class: 'font-allura', description_ru: 'Изящный каллиграфический', description_uz: 'Nafis kalligrafik' },
        { name: 'Parisienne', class: 'font-parisienne', description_ru: 'Романтичный рукописный', description_uz: 'Romantik qo\'lyozma' },
        { name: 'Sacramento', class: 'font-sacramento', description_ru: 'Легкий, воздушный рукописный', description_uz: 'Yengil, havodor qo\'lyozma' },
        { name: 'Caveat', class: 'font-caveat', description_ru: 'Игривый рукописный', description_uz: 'O\'ynoqi qo\'lyozma' },
        { name: 'Pacifico', class: 'font-pacifico', description_ru: 'Винтажный рукописный', description_uz: 'Vintage qo\'lyozma' },
        { name: 'Pinyon Script', class: 'font-pinyon-script', description_ru: 'Формальный скрипт', description_uz: 'Rasmiy skript' },
        { name: 'Bad Script', class: 'font-bad-script', description_ru: 'Русский рукописный (кириллица)', description_uz: 'Rus qo\'lyozma (Kirill)' }, 
        { name: 'Marck Script', class: 'font-marck-script', description_ru: 'Кириллический курсив', description_uz: 'Kirill kursiv' }, 
        { name: 'Lobster', class: 'font-lobster', description_ru: 'Декоративный, заметный', description_uz: 'Dekorativ, ajralib turuvchi' }, 
        { name: 'Neucha', class: 'font-neucha', description_ru: 'Дружелюбный рукописный (кириллица)', description_uz: 'Do\'stona qo\'lyozma (Kirill)' },

        // --- С засечками (элегантные / классические) ---
        { name: 'Playfair Display', class: 'font-playfair-display', description_ru: 'Современный с засечками', description_uz: 'Zamonaviy serif' },
        { name: 'Cormorant Garamond', class: 'font-cormorant-garamond', description_ru: 'Классический с засечками', description_uz: 'Klassik serif' },
        { name: 'Lora', class: 'font-lora', description_ru: 'Традиционный с засечками', description_uz: 'An\'anaviy serif' },
        { name: 'Prata', class: 'font-prata', description_ru: 'Монументальный, изысканный', description_uz: 'Monumental, nafis' },
        { name: 'EB Garamond', class: 'font-eb-garamond', description_ru: 'Высокая читаемость, классика', description_uz: 'Oson o\'qiladigan, klassik' },

        // --- Без засечек (чистые / современные) ---
        { name: 'Montserrat', class: 'font-montserrat', description_ru: 'Современный без засечек', description_uz: 'Zamonaviy sans-serif' },
        { name: 'Open Sans', class: 'font-open-sans', description_ru: 'Универсальный без засечек', description_uz: 'Universal sans-serif' },
        { name: 'Josefin Sans', class: 'font-josefin-sans', description_ru: 'Тонкий, геометрический', description_uz: 'Yupqa, geometrik' },
        { name: 'Quicksand', class: 'font-quicksand', description_ru: 'Округлый, дружелюбный', description_uz: 'Dumaloq, do\'stona' },
        { name: 'Comfortaa', class: 'font-comfortaa', description_ru: 'Мягкий, округлый (кириллица)', description_uz: 'Yumshoq, dumaloq (Kirill)' },
    ];

    function updateFontPreviews() {
        const inputText = textInput.value;
        fontPreviewContainer.innerHTML = ''; 

        if (inputText.trim() === '') {
            fontPreviewContainer.innerHTML = `<p id="emptyPreviewMessage" style="color: #666; text-align: center;">${translations[currentLang].emptyPreviewMessage}</p>`;
            return;
        }

        fonts.forEach(font => {
            const div = document.createElement('div');
            div.className = `font-example ${font.class}`;
            const fontDescription = currentLang === 'ru' ? font.description_ru : font.description_uz;
            div.innerHTML = `<strong>${font.name} (${fontDescription}):</strong><br>${inputText}`;
            fontPreviewContainer.appendChild(div);
        });
    }

    // --- Обработчики событий ---
    textInput.addEventListener('input', updateFontPreviews);
    
    // НОВАЯ ЛОГИКА: Скрытие клавиатуры при снятии фокуса с текстового поля
    textInput.addEventListener('blur', () => {
        // Программно убираем фокус с поля ввода
        // Это обычно заставляет виртуальную клавиатуру исчезнуть
        textInput.blur(); 
    });


    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedLang = button.dataset.lang;
            if (currentLang !== selectedLang) {
                currentLang = selectedLang;
                updateInterfaceLanguage();
                updateFontPreviews(); 
            }
        });
    });

    // Инициализация интерфейса и превью при загрузке страницы
    updateInterfaceLanguage();
    updateFontPreviews(); 

    // --- Интеграция с Telegram Web Apps API ---
    if (window.Telegram && Telegram.WebApp) {
        Telegram.WebApp.ready();
        closeButton.addEventListener('click', () => {
            Telegram.WebApp.close();
        });
    } else {
        console.warn(translations[currentLang].langWarning);
        closeButton.textContent = translations[currentLang].closeButton + ' (' + translations[currentLang].langWarning.split('.')[0] + ')'; 
        closeButton.disabled = true; 
    }
});
