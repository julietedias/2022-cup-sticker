const generatePreview = document.querySelector("#generate-preview-button")
const downloadButton = document.querySelector("#download-button")
const clearUsername = document.querySelector("#clear-username")
const username = document.querySelector("#username")
const canvasImage = document.querySelector("#canvas-image")
const getContext = canvasImage.getContext("2d")

const sticker = new Image()
sticker.src = "assets/sticker.svg"
;[generatePreview, clearUsername].forEach((element) => {
    element.addEventListener("click", () => {
        const dataURI = canvasImage.toDataURL()
        const newImage = dataURI + getContext.drawImage(sticker, 0, 0, 390, 560)
        canvasImage.src = newImage
    })
})

downloadButton.addEventListener("click", () => {
    // IE/Edge
    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(
            canvasImage.msToBlob(),
            "figurinha-personalizada-copa/png"
        )
    } else {
        const a = document.createElement("a")
        document.body.appendChild(a)
        a.href = canvasImage.toDataURL()
        a.download = "figurinha-personalizada-copa.png"
        a.click()
        document.body.removeChild(a)
    }
})

const photo = document.querySelector("#photo")
const photoInput = document.querySelector("#photo-input")
const photoCanvas = document.querySelector(".photo-canvas")

photoInput.addEventListener("change", function (e) {
    const targetInput = e.target
    const file = targetInput.files[0]
    if (file) {
        const reader = new FileReader()
        reader.addEventListener("load", function (e) {
            const readerTarget = e.target
            const img = document.createElement("img")
            img.src = readerTarget.result
            img.classList.add("photo-img")
            img.onload = () => {
                let imgWidth = img.naturalWidth
                let screenWidth = photo.width
                let scaleX = 1
                if (imgWidth > screenWidth) {
                    scaleX = screenWidth / imgWidth
                }
                let imgHeight = img.naturalHeight
                let screenHeight = photo.height
                let scaleY = 1
                if (imgHeight > screenHeight) {
                    scaleY = screenHeight / imgHeight
                }
                let scale = scaleY
                if (scaleX < scaleY) {
                    scale = scaleX
                }
                if (scale < 1) {
                    imgHeight = imgHeight * scale
                    imgWidth = imgWidth * scale
                }
                photo.height = imgHeight
                photo.width = imgWidth
                getContext.drawImage(
                    img,
                    0,
                    0,
                    img.naturalWidth,
                    img.naturalHeight,
                    0,
                    50,
                    imgWidth,
                    imgHeight
                )
            }
            photoCanvas.appendChild(img)
        })
        reader.readAsDataURL(file)
    }
})

const restartPhoto = document.querySelector("#restart-photo")
const startOver = document.querySelector("#start-over")
;[startOver, restartPhoto].forEach((element) => {
    element.addEventListener("click", () => {
        window.location.href = "/2022-cup-sticker"
    })
})

let canvasNovo = document.getElementById("canvas-image")
let context = canvasNovo.getContext("2d")
let startingX = 0
let startingY = 0
let recentKeyboardCharacters = []
let keyboardCharactersList = []
const saveState = () => {
    keyboardCharactersList.push(canvasNovo.toDataURL())
}

saveState()

const undoKeyboardCharactersList = () => {
    keyboardCharactersList.pop()
    let imageNova = new Image()
    let imgData = keyboardCharactersList[keyboardCharactersList.length - 1]
    imageNova.src = imgData
    imageNova.onload = () => {
        context.clearRect(0, 0, canvasNovo.width, canvasNovo.height)
        context.drawImage(
            imageNova,
            0,
            0,
            canvasNovo.width,
            canvasNovo.height,
            0,
            0,
            canvasNovo.width,
            canvasNovo.height
        )
    }
}

username.addEventListener(
    "click",
    (e) => {
        startingX = 80
        startingY = 500
        recentKeyboardCharacters = []
        return false
    },
    false
)

username.addEventListener(
    "keydown",
    (e) => {
        console.log(e)
        context.font = "800 36px Montserrat"
        context.fillStyle = "#B20018"
        if (e.keyCode === 9) {
            startingX = 130
        } else if (e.keyCode === 39) {
            startingX += 20
        } else if (e.keyCode === 37) {
            startingX -= 20
        } else if (e.keyCode === 8) {
            undoKeyboardCharactersList()
            startingX += context.measureText(e.key).width - 230
        } else if (
            e.keyCode === 13 ||
            e.keyCode === 16 ||
            e.keyCode === 17 ||
            e.keyCode === 18 ||
            e.keyCode === 19 ||
            e.keyCode === 20 ||
            e.keyCode === 27 ||
            e.keyCode === 35 ||
            e.keyCode === 36 ||
            e.keyCode === 45 ||
            e.keyCode === 46 ||
            e.keyCode === 54 ||
            e.keyCode === 91 ||
            e.keyCode === 93 ||
            e.keyCode === 112 ||
            e.keyCode === 113 ||
            e.keyCode === 114 ||
            e.keyCode === 115 ||
            e.keyCode === 116 ||
            e.keyCode === 117 ||
            e.keyCode === 118 ||
            e.keyCode === 119 ||
            e.keyCode === 120 ||
            e.keyCode === 121 ||
            e.keyCode === 122 ||
            e.keyCode === 123 ||
            e.keyCode === 145 ||
            e.keyCode === 219 ||
            e.keyCode === 222
        ) {
            recentKeyboardCharacters.pop()
        } else {
            context.fillText(e.key, startingX, startingY)
            startingX += context.measureText(e.key).width
            saveState()
            recentKeyboardCharacters.push(e.key)
        }
    },
    false
)
