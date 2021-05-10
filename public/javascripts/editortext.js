const editor = new EditorJS({
    holderId: 'editorjs',
    tools: {
        header: {
            class: Header,
            inlineToolbar: ['link']
        },
        list: {
            class: List,
            inlineToolbar: [
                'link',
                'bold'
            ]
        },
        embed: {
            class: Embed,
            inlineToolbar: false,
            config: {
                services: {
                    youtube: true,
                    coub: true
                }
            },
        },
        quote: {
            class: Quote,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+O',
            config: {
                quotePlaceholder: 'Enter a quote',
                captionPlaceholder: 'Quote\'s author',
            },
        },
        image: SimpleImage,

    },
})


const saveBtn = document.querySelector('#savebtn');
saveBtn.addEventListener('click', function() {
    editor.save().then((OutputData) => {
        const changer = document.querySelector('#hiddeninput');
        changer.value = JSON.stringify(OutputData);
        console.log(OutputData);
    })
})