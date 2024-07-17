import Button from "../../elements/button";

export default function Settings() {

    function clearGameData() {
        localStorage.clear();
        window.location.reload();
    }

    return(
        <Button onClick={clearGameData}>Start Over (Clear Game Data)</Button>
    )

}