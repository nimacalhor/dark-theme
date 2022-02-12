const btnThemeToggler = document.querySelector("#themeToggler");
const iconThemeToggler = document.querySelector("label")
const rootEl = document.querySelector(":root")

const themeColors = {
    // site color pallet
    LIGHT_MAIN: "rgb(255, 255, 255)",
    LIGHT_SECONDARY: "rgba(248, 249, 250)",
    DARK_MAIN: "rgb(0, 0, 0)",
    DARK_SECONDARY: "rgb(29, 29, 29)"
}

let darkTheme = false;

const changeCssVar = (varName, value) => rootEl.style.setProperty(varName, value)

const applyDarkTheme = () => {
    changeCssVar("--neutral-bg-clr-main", themeColors.DARK_MAIN)
    changeCssVar("--neutral-bg-clr-secondary", themeColors.DARK_SECONDARY)
    changeCssVar("--neutral-txt-clr-main", themeColors.LIGHT_MAIN)
    changeCssVar("--neutral-txt-clr-secondary", themeColors.LIGHT_SECONDARY)
}
const applyLightTheme = () => {
    changeCssVar("--neutral-bg-clr-main", themeColors.LIGHT_MAIN)
    changeCssVar("--neutral-bg-clr-secondary", themeColors.LIGHT_SECONDARY)
    changeCssVar("--neutral-txt-clr-main", themeColors.DARK_MAIN)
    changeCssVar("--neutral-txt-clr-secondary", themeColors.DARK_SECONDARY)
}

const changeThemeIcon = () => iconThemeToggler.innerText = darkTheme ? "🌛" : "🌞";

const toggleTheme = function () {
    if (darkTheme) applyDarkTheme();
    else applyLightTheme();
}

const getCookie = function (key) {
    return document.cookie.split("; ")
        .find(
            item => item.startsWith(`${key}=`)
        )
        .split("=")[1]
}

const init = function () {
    // 1) locale storage
    const savedTheme = getCookie("darkTheme") === "false" ? false : true
    if (savedTheme !== null) darkTheme = savedTheme;
    // 2) UI 
    changeThemeIcon();
    btnThemeToggler.checked = darkTheme;
    toggleTheme();
}

init()

btnThemeToggler.addEventListener("click", function (e) {
    // toggle theme
    darkTheme = !darkTheme;
    // UI
    e.target.checked = darkTheme
    changeThemeIcon();
    toggleTheme();
    // cookie
    // localStorage.setItem("darkTheme", darkTheme)
    document.cookie = `darkTheme=${darkTheme}; expires=120; sameSite=strict; Secure;`
})
