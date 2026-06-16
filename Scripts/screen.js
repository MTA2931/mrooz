

navigator.wakeLock.request("screen")
let lang = navigator.language
console.log(lang);
navigator.getBattery().then(battery => {
    console.log(battery.level*100)
})

